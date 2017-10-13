#include "stdafx.h"
#include "PublicFun.h"
#include "curl/curl.h"
#include "jsoncpp/json.h"

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

#if 1
int CaptureCookies()
{
	for (g_InfoGroupIndex = 0; g_InfoGroupIndex < g_InfoGroup.size(); ++g_InfoGroupIndex)
	{
		std::wstring strMsg = L"请在点击以下 \"确定\" 按钮后，打开第 ";
		strMsg += s2ws(TransToString(g_InfoGroupIndex + 1)) + L" 个QQ号(" + g_InfoGroup[g_InfoGroupIndex].number + L") \"好友查找\" 界面，然后点击 \"查找\" 按钮";
		UINT nRet = ::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), strMsg.c_str(), L"提示", MB_OK);
		//if (IDCANCEL == nRet)
		//{
		//	break;
		//}
		//else if (IDTRYAGAIN == nRet)
		//{
		//	g_InfoGroupIndex -= 1;
		//}

		// 获取网卡数
		pcap_if_t* pAllDev;
		pcap_if_t* pOneDev;
		char szErrBuf[PCAP_ERRBUF_SIZE] = {0};

		/* 获得设备列表 */
		if (-1 == pcap_findalldevs_ex(PCAP_SRC_IF_STRING, NULL, &pAllDev, szErrBuf))
		{
			fprintf(stderr, "Error in pcap_findalldevs: %s\n", szErrBuf);
			exit(1);
		}
		int nNetDevSize = NetDevSize(pAllDev);			// 网卡数

		DWORD* pThreadID = new DWORD[nNetDevSize]();
		HANDLE* pThreadHandle = new HANDLE[nNetDevSize]();
		for (int j = 0; j < nNetDevSize; ++j)
		{
			int k = 0;
			for(pOneDev = pAllDev; k < j ; pOneDev = pOneDev->next, k++);
			pThreadHandle[j] = CreateThread(NULL, 0, ThreadProc_CaptureCookies, pOneDev, 0, &pThreadID[j]); 
		}

		DWORD bWait = WAIT_TIMEOUT;
		do
		{
			bWait = WaitForMultipleObjects(nNetDevSize, pThreadHandle, FALSE, 1000);			// 超时等待任一线程结束
		} while (WAIT_TIMEOUT == bWait);

		if (WAIT_FAILED == bWait)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), (std::wstring(L"QQ号(")+ g_InfoGroup[g_InfoGroupIndex].number + L") 检测失败").c_str(), L"提示", MB_OK);
		}
		
		int nRtnThread = bWait - WAIT_OBJECT_0;
		for (int j = 0; j < nNetDevSize; ++j)
		{
			if (WAIT_TIMEOUT == WaitForSingleObject(pThreadHandle[j], 1000))
			{
				TerminateThread(pThreadHandle[j], 0);				// 强制终止未结束线程
			}
			CloseHandle(pThreadHandle[j]);
		}
		
        pcap_freealldevs(pAllDev);		// 释放设备列表
		delete [] pThreadID;
		delete [] pThreadHandle;
	}

	return 0;
}

DWORD WINAPI ThreadProc_CaptureCookies(LPVOID lpParam)
{
	pcap_if_t* pDev = (pcap_if_t*)lpParam;
	char szErrBuf[PCAP_ERRBUF_SIZE] = {0};
	pcap_t *adhandle = NULL;
	u_int netmask = 0;
	char packet_filter[] = "ip and tcp";
	struct bpf_program fcode;

	/* 打开适配器 */
    if ( (adhandle= pcap_open(pDev->name,						// 设备名
                             65536,								// 要捕捉的数据包的部分，65535保证能捕获到不同数据链路层上的每个数据包的全部内容
                             PCAP_OPENFLAG_PROMISCUOUS,         // 混杂模式
                             1000,								// 读取超时时间
                             NULL,								// 远程机器验证
                             szErrBuf							// 错误缓冲池
                             ) ) == NULL)
    {
        fprintf(stderr,"\nUnable to open the adapter. %s is not supported by WinPcap\n");
        return -1;
    }

	/* 检查数据链路层，为了简单，我们只考虑以太网 */
    if(pcap_datalink(adhandle) != DLT_EN10MB)
    {
        fprintf(stderr,"\nThis program works only on Ethernet networks.\n");
        return -1;
    }

	if(pDev->addresses != NULL)
        /* 获得接口第一个地址的掩码 */
        netmask=((struct sockaddr_in *)(pDev->addresses->netmask))->sin_addr.S_un.S_addr;
    else
        /* 如果接口没有地址，那么我们假设一个C类的掩码 */
        netmask=0xffffff; 

	//编译过滤器
    if (pcap_compile(adhandle, &fcode, packet_filter, 1, netmask) <0 )
    {
        fprintf(stderr,"\nUnable to compile the packet filter. Check the syntax.\n");
        return -1;
    }

	 //设置过滤器
    if (pcap_setfilter(adhandle, &fcode)<0)
    {
        fprintf(stderr,"\nError setting the filter.\n");
        return -1;
    }
	
	/* 开始捕捉 */
    pcap_loop(adhandle, 0, packet_handler, (u_char*)adhandle);

	return 0;
}

/* 回调函数，当收到每一个数据包时会被libpcap所调用 */
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

			if (find_http && std::string::npos != http_txt.find("search_v3"))
			{
				int npos_uin = http_txt.find(std::string(" uin=o") + ws2s(g_InfoGroup[g_InfoGroupIndex].number));
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

std::string CaptureNickname(const std::string& qq_number)
{
	curl_global_init(CURL_GLOBAL_ALL);

	std::string rst = "";
	CURL* curl_handle = NULL;
	curl_handle = curl_easy_init();
	if (curl_handle)
	{
		std::string url = "http://r.pengyou.com/fcg-bin/cgi_get_portrait.fcg?uins=" + qq_number;
		std::string body;
		curl_easy_setopt(curl_handle, CURLOPT_URL, url.c_str());	// char*类型，不是string
		curl_easy_setopt(curl_handle, CURLOPT_NOPROGRESS, 1L);
		curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, write_fun_string);
		curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, &body);
		printf("%s", body.c_str());
		int res = curl_easy_perform(curl_handle);
		if (res != CURLE_OK)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), s2ws(curl_easy_strerror((CURLcode)res)).c_str(), L"提示", MB_OK);
		}

		std::string::size_type head = body.find("portraitCallBack(");
		if (std::string::npos != head)
		{
			std::string::size_type tail = body.rfind(")");
			if (std::string::npos != tail)
			{
				std::string msg = body.substr(head + 17, tail - head - 17);
				
				Json::Reader reader;
				Json::Value root;
				if (reader.parse(msg, root))
				{
					Json::Value arr = root[qq_number];
					rst = arr[6].asString();	// portraitCallBack({"505519763":["http://qlogo4.store.qq.com/qzone/505519763/505519763/100",1648,-1,0,0,0,"康仔",0]})
				}
			}
		}

		curl_easy_cleanup(curl_handle);
	}

	curl_global_cleanup();
	return rst;
}

int CheckStatus(CInfoNode& node)
{
	if (node.skey.empty())
	{
		node.status = E_STATUS_EXCEPTION;
	}

	return 0;
}

std::wstring StatusAsWString(E_STATUS_TYPE status)
{

	switch (status)
	{
	case E_STATUS_NORMAL:
		return L"正常";
	case E_STATUS_EXCEPTION:
		return L"异常";
	default:
		return L"正常";
	}
}

size_t write_fun_file(void *data, size_t size, size_t nmember, FILE* save)
{
	int written = fwrite(data, size, nmember, save);
	return written;
}

size_t write_fun_string(void *data, size_t size, size_t nmember, std::string* save)
{
	size_t sizes = size * nmember;
    save->append((char*)data, sizes);
    return sizes;
}
#else
int CaptureCookies()
{
	// 获取网卡数
	pcap_if_t* pAllDev;
	pcap_if_t* pOneDev;
	char szErrBuf[PCAP_ERRBUF_SIZE] = {0};

	for (g_InfoGroupIndex = 0; g_InfoGroupIndex < g_InfoGroup.size(); ++g_InfoGroupIndex)
	{
		/* 获得设备列表 */
		if (-1 == pcap_findalldevs_ex(PCAP_SRC_IF_STRING, NULL, &pAllDev, szErrBuf))
		{
			fprintf(stderr, "Error in pcap_findalldevs: %s\n", szErrBuf);
			exit(1);
		}
		int nNetDevSize = NetDevSize(pAllDev);			// 网卡数

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
		ShowWindow(g_InfoGroup[g_InfoGroupIndex].windows, SW_SHOW);	// 显示窗口
		do
		{
			// 搜索好友，触发命中报文
			keybd_event(VK_CONTROL, 0x1D, 0, 0);
			::PostMessage(g_InfoGroup[g_InfoGroupIndex].windows, WM_KEYDOWN, 'A', 0x401E0001);
			Sleep(50);
			::PostMessage(g_InfoGroup[g_InfoGroupIndex].windows, WM_KEYUP, 'A', 0xC01E0001);
			keybd_event(VK_CONTROL, 0x1D, KEYEVENTF_KEYUP, 0);
			
			::PostMessage(g_InfoGroup[g_InfoGroupIndex].windows, WM_KEYDOWN, '1', 0x00310001);
			Sleep(50);
			::PostMessage(g_InfoGroup[g_InfoGroupIndex].windows, WM_KEYUP, '1', 0xC0310001);
			::PostMessage(g_InfoGroup[g_InfoGroupIndex].windows, WM_KEYDOWN, '1', 0x00310001);
			Sleep(50);
			::PostMessage(g_InfoGroup[g_InfoGroupIndex].windows, WM_KEYUP, '1', 0xC0310001);

			// 超时等待任一线程结束
			bWait = WaitForMultipleObjects(nNetDevSize, pThreadHandle, FALSE, 1000);
		} while (WAIT_TIMEOUT == bWait && ++nWaitTimes <= 10);

		if (WAIT_FAILED == bWait)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), (std::wstring(L"QQ: ")+ g_InfoGroup[g_InfoGroupIndex].number + L" 检测失败").c_str(), L"提示", MB_OK);
		}
		
		int nRtnThread = bWait - WAIT_OBJECT_0;
		for (int j = 0; j < nNetDevSize; ++j)
		{
			if (WAIT_TIMEOUT == WaitForSingleObject(pThreadHandle[j], 1000))
			{
				TerminateThread(pThreadHandle[j], 0);				// 强制终止未结束线程
			}
			CloseHandle(pThreadHandle[j]);
		}
		
        pcap_freealldevs(pAllDev);		// 释放设备列表
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

	/* 打开适配器 */
    if ( (adhandle= pcap_open(pDev->name,						// 设备名
                             65536,								// 要捕捉的数据包的部分，65535保证能捕获到不同数据链路层上的每个数据包的全部内容
                             PCAP_OPENFLAG_PROMISCUOUS,         // 混杂模式
                             1000,								// 读取超时时间
                             NULL,								// 远程机器验证
                             szErrBuf							// 错误缓冲池
                             ) ) == NULL)
    {
        fprintf(stderr,"\nUnable to open the adapter. %s is not supported by WinPcap\n");
        return -1;
    }

	/* 检查数据链路层，为了简单，我们只考虑以太网 */
    if(pcap_datalink(adhandle) != DLT_EN10MB)
    {
        fprintf(stderr,"\nThis program works only on Ethernet networks.\n");
        return -1;
    }

	if(pDev->addresses != NULL)
        /* 获得接口第一个地址的掩码 */
        netmask=((struct sockaddr_in *)(pDev->addresses->netmask))->sin_addr.S_un.S_addr;
    else
        /* 如果接口没有地址，那么我们假设一个C类的掩码 */
        netmask=0xffffff; 

	//编译过滤器
    if (pcap_compile(adhandle, &fcode, packet_filter, 1, netmask) <0 )
    {
        fprintf(stderr,"\nUnable to compile the packet filter. Check the syntax.\n");
        return -1;
    }

	 //设置过滤器
    if (pcap_setfilter(adhandle, &fcode)<0)
    {
        fprintf(stderr,"\nError setting the filter.\n");
        return -1;
    }
	
	/* 开始捕捉 */
    pcap_loop(adhandle, 0, packet_handler, (u_char*)adhandle);

	return 0;
}

/* 回调函数，当收到每一个数据包时会被libpcap所调用 */
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
#endif