#include "stdafx.h"
#include "PublicFun.h"

CInfoGroup g_InfoGroup;

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
	// 获取网卡数
	pcap_if_t* pAllDev;
	pcap_if_t* pOneDev;
	char szErrBuf[PCAP_ERRBUF_SIZE] = {0};
	int inum;
	int i=0;
	pcap_t *adhandle;
	u_int netmask;
	char packet_filter[] = "ip and tcp";
	struct bpf_program fcode;

    /* 获得设备列表 */
    if (-1 == pcap_findalldevs_ex(PCAP_SRC_IF_STRING, NULL, &pAllDev, szErrBuf))
    {
        fprintf(stderr, "Error in pcap_findalldevs: %s\n", szErrBuf);
        exit(1);
    }

	int nNetDevSize = NetDevSize(pAllDev);			// 网卡数
	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		DWORD bWait = WAIT_TIMEOUT;
		DWORD* pThreadID = new DWORD[nNetDevSize]();
		HANDLE* pThreadHandle = new HANDLE[nNetDevSize]();
		for (int j = 0; j < nNetDevSize; ++j)
		{
			pThreadHandle[j] = CreateThread(NULL,0, ThreadProc_CaptureCookies, &pAllDev[j], 0, &pThreadID[j]); 
		}

		do
		{
			// 搜索好友，触发命中报文

			// 超时等待任一线程结束
			bWait = WaitForMultipleObjects(nNetDevSize, pThreadHandle, FALSE, 1000);
		} while (WAIT_TIMEOUT == bWait);

		if (WAIT_FAILED == bWait)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), (std::wstring(L"QQ: ")+ g_InfoGroup[i].number + L" 检测失败").c_str(), L"提示", MB_OK);
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

		delete [] pThreadID;
		delete [] pThreadHandle;
	}
}

DWORD WINAPI ThreadProc_CaptureCookies(LPVOID lpParam)
{


	return 0;
}