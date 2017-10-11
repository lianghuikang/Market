#include "stdafx.h"
#include "PublicFun.h"

CInfoGroup g_InfoGroup;
int		   g_InfoGroupIndex = 0;

std::string ws2s(const std::wstring& ws)
{
    _bstr_t  t = ws.c_str();
    char *pChar = (char*)t;
	return pChar;
}

std::wstring s2ws(const std::string& s)
{
    _bstr_t  t = s.c_str();
    wchar_t *pWchar = (wchar_t*)t;
	return pWchar;
}

int NetDevSize(pcap_if_t* pAllDev)
{
	int n = 0;
	for (pcap_if_t* pOneDev = pAllDev; pOneDev; pOneDev = pOneDev->next)
	{
		++n;
	}
	return n;
}

int CaptureCookies()
{
	// ��ȡ������
	pcap_if_t* pAllDev;
	pcap_if_t* pOneDev;
	char szErrBuf[PCAP_ERRBUF_SIZE] = {0};

	for (g_InfoGroupIndex = 0; g_InfoGroupIndex < g_InfoGroup.size(); ++g_InfoGroupIndex)
	{
		/* ����豸�б� */
		if (-1 == pcap_findalldevs_ex(PCAP_SRC_IF_STRING, NULL, &pAllDev, szErrBuf))
		{
			fprintf(stderr, "Error in pcap_findalldevs: %s\n", szErrBuf);
			exit(1);
		}
		int nNetDevSize = NetDevSize(pAllDev);			// ������

		DWORD bWait = WAIT_TIMEOUT;
		DWORD* pThreadID = new DWORD[nNetDevSize]();
		HANDLE* pThreadHandle = new HANDLE[nNetDevSize]();
		for (int j = 0; j < nNetDevSize; ++j)
		{
			int k = 0;
			for(pOneDev = pAllDev; k < j ; pOneDev = pOneDev->next, k++);
			pThreadHandle[j] = CreateThread(NULL, 0, ThreadProc_CaptureCookies, pOneDev, 0, &pThreadID[j]); 
		}

		int nWaitTimes = 0;
		do
		{
			// �������ѣ��������б���
			HWND handle = ::FindWindowEx(GetDesktopWindow(), 0, NULL, L"QQ");
			::PostMessage(handle, WM_KEYDOWN, '1', 0);

			// ��ʱ�ȴ���һ�߳̽���
			bWait = WaitForMultipleObjects(nNetDevSize, pThreadHandle, FALSE, 1000);
		} while (WAIT_TIMEOUT == bWait && ++nWaitTimes <= 10);

		if (WAIT_FAILED == bWait)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), (std::wstring(L"QQ: ")+ g_InfoGroup[g_InfoGroupIndex].number + L" ���ʧ��").c_str(), L"��ʾ", MB_OK);
		}
		
        pcap_freealldevs(pAllDev);		// �ͷ��豸�б�
		int nRtnThread = bWait - WAIT_OBJECT_0;
		for (int j = 0; j < nNetDevSize; ++j)
		{
			if (WAIT_TIMEOUT == WaitForSingleObject(pThreadHandle[j], 1000))
			{
				TerminateThread(pThreadHandle[j], 0);				// ǿ����ֹδ�����߳�
			}
			CloseHandle(pThreadHandle[j]);
		}

		delete [] pThreadID;
		delete [] pThreadHandle;
	}
}

DWORD WINAPI ThreadProc_CaptureCookies(LPVOID lpParam)
{
	pcap_if_t* pDev = (pcap_if_t*)lpParam;
	char szErrBuf[PCAP_ERRBUF_SIZE] = {0};
	pcap_t *adhandle = NULL;
	u_int netmask = 0;
	char packet_filter[] = "ip and tcp";
	struct bpf_program fcode;

	/* �������� */
    if ( (adhandle= pcap_open(pDev->name,						// �豸��
                             65536,								// Ҫ��׽�����ݰ��Ĳ��֣�65535��֤�ܲ��񵽲�ͬ������·���ϵ�ÿ�����ݰ���ȫ������
                             PCAP_OPENFLAG_PROMISCUOUS,         // ����ģʽ
                             1000,								// ��ȡ��ʱʱ��
                             NULL,								// Զ�̻�����֤
                             szErrBuf							// ���󻺳��
                             ) ) == NULL)
    {
        fprintf(stderr,"\nUnable to open the adapter. %s is not supported by WinPcap\n");
        return -1;
    }

	/* ���������·�㣬Ϊ�˼򵥣�����ֻ������̫�� */
    if(pcap_datalink(adhandle) != DLT_EN10MB)
    {
        fprintf(stderr,"\nThis program works only on Ethernet networks.\n");
        return -1;
    }

	if(pDev->addresses != NULL)
        /* ��ýӿڵ�һ����ַ������ */
        netmask=((struct sockaddr_in *)(pDev->addresses->netmask))->sin_addr.S_un.S_addr;
    else
        /* ����ӿ�û�е�ַ����ô���Ǽ���һ��C������� */
        netmask=0xffffff; 

	//���������
    if (pcap_compile(adhandle, &fcode, packet_filter, 1, netmask) <0 )
    {
        fprintf(stderr,"\nUnable to compile the packet filter. Check the syntax.\n");
        return -1;
    }

	 //���ù�����
    if (pcap_setfilter(adhandle, &fcode)<0)
    {
        fprintf(stderr,"\nError setting the filter.\n");
        return -1;
    }
	
	/* ��ʼ��׽ */
    pcap_loop(adhandle, 0, packet_handler, (u_char*)adhandle);

	return 0;
}

/* �ص����������յ�ÿһ�����ݰ�ʱ�ᱻlibpcap������ */
void packet_handler(u_char *param, const struct pcap_pkthdr *header, const u_char *pkt_data)
{
	pcap_t *adhandle = (pcap_t *)param;
    struct tm *ltime;
    char timestr[16];
    ip_header *ih;
    udp_header *uh;
    u_int ip_len;
    u_short sport,dport;
    time_t local_tv_sec;

	ether_header* eh = (ether_header*)pkt_data;
	if (0x0800 == ntohs(eh->ether_type))
	{
		ip_header* ih = (ip_header*)(pkt_data + 14);
		if (0x0600 == ntohs(ih->proto))
		{
			int ip_len = ntohs(ih->tlen);
			bool find_http = false;
			std::string http_txt = "";

			char* ip_pkt_data = (char*)ih;
			for (int i = 0; i < ip_len; ++i)
			{
				if (!find_http && 
					((i + 3 < ip_len && 0 == strncmp(ip_pkt_data + i, "GET", 3)) ||
					(i + 4 < ip_len && 0 == strncmp(ip_pkt_data + i, "POST", 4))))
				{
					find_http = true;
				}

				if (find_http)
				{
					http_txt += ip_pkt_data[i];
				}
			}

			if (find_http && std::string::npos != http_txt.find("photo_wall_cgi_list"))
			{
				int npos_uin = http_txt.find(std::string("?uin=") + ws2s(g_InfoGroup[g_InfoGroupIndex].number));
				if (std::string::npos != npos_uin)
				{
					int npos_skey_left = http_txt.find(" skey=", npos_uin);
					if (std::string::npos != npos_skey_left)
					{
						int npos_skey_right = http_txt.find(";", npos_skey_left);
						if (std::string::npos != npos_skey_right)
						{
							std::string skey = http_txt.substr(npos_skey_left + 6, npos_skey_right - npos_skey_left - 6);
							g_InfoGroup[g_InfoGroupIndex].skey = s2ws(skey);
							pcap_breakloop(adhandle);
						}
					}
				}
			}
		}
	}
}