#include "stdafx.h"
#include "PublicFun.h"
#include "curl/curl.h"
#include "jsoncpp/json.h"
#include <stdio.h>
#include <list>

CNonLeaf g_Locations;
std::vector<CCityL1> g_Citys;
CInfoGroup g_InfoGroup;
int		   g_InfoGroupIndex = 0;

#include<iostream>
using namespace std;

void MouseClick(HWND hwnd, DWORD x, DWORD y)
{
	LPARAM lparam = MAKELPARAM(x, y);
	::PostMessage(hwnd, WM_LBUTTONDOWN, MK_LBUTTON, lparam);
	::PostMessage(hwnd, WM_LBUTTONUP, 0, lparam);
}

void KeyReturn(HWND hwnd)
{
	// ģ��س���
	::PostMessage(hwnd, WM_KEYDOWN, VK_RETURN, 0x001C0001);
	Sleep(50);
	::PostMessage(hwnd, WM_KEYUP, VK_RETURN, 0xC01C0001);
	Sleep(50);
}

void KeyTab(HWND hwnd)
{
	// ģ��TAB��
	::PostMessage(hwnd, WM_KEYDOWN, VK_TAB, 0x000F0001);
	Sleep(50);
	::PostMessage(hwnd, WM_KEYUP, VK_TAB, 0xC00F0001);
	Sleep(50);
}

void KeyCtrlA(HWND hwnd)
{
	// ģ��CTRL+A��ϼ�
	keybd_event(VK_CONTROL, 0x1D, 0, 0);
	Sleep(50);
	::PostMessage(hwnd, WM_KEYDOWN, 'A', 0x001E0001);
	Sleep(50);
	::PostMessage(hwnd, WM_KEYUP, 'A', 0xC01E0001);
	Sleep(50);
	keybd_event(VK_CONTROL, 0x1D, KEYEVENTF_KEYUP, 0);
	Sleep(50);
}

void KeyCtrlC(const std::string& src)
{
	if (::OpenClipboard(NULL))											// �򿪼�����
	{
		::EmptyClipboard();												// ��ռ�����
		HANDLE hGlobal = ::GlobalAlloc(GHND, src.length() + 1);			// ����ȫ���ڴ沢��ȡ���
		LPBYTE lpGlobal = (LPBYTE)GlobalLock(hGlobal);					// ����ȫ���ڴ�
		memcpy(lpGlobal, src.c_str(), src.length());
		lpGlobal[src.length()] = '\0';
		::GlobalUnlock(hGlobal);										// ����ȫ���ڴ�
		::SetClipboardData(CF_TEXT, hGlobal);							// �����ڴ����ݵ�������
		::CloseClipboard();												// �رռ�����
	}
}

void KeyCtrlV(HWND hwnd)
{
	// ģ��CTRL+V��ϼ�
	keybd_event(VK_CONTROL, 0x1D, 0, 0);
	Sleep(50);
	//::PostMessage(hwnd, WM_KEYDOWN, VK_CONTROL, 0x001D0001);		// �޷�ʵ��Ч��
	::PostMessage(hwnd, WM_KEYDOWN, 'V', 0x002F0001);
	Sleep(50);
	//::PostMessage(hwnd, WM_CHAR, 0x16, 0x002F0001);
	::PostMessage(hwnd, WM_KEYUP, 'V', 0xC02F0001);
	Sleep(50);
	//::PostMessage(hwnd, WM_KEYUP, VK_CONTROL, 0xC01D0001);
	keybd_event(VK_CONTROL, 0x1D, KEYEVENTF_KEYUP, 0);
	Sleep(50);
}

HWND SearchHwndUnderThread(int thread_id, const wchar_t* title,	bool fuzzy)
{
	std::list<HWND> listThreadWnd;
	EnumThreadWindows(thread_id, EnumThreadWndProc, (LPARAM)&listThreadWnd);						// ��ȡ���߳������д���
	for (std::list<HWND>::iterator iter = listThreadWnd.begin(); iter != listThreadWnd.end(); ++iter)
	{
		CString cstrWindowText;
		::GetWindowText(*iter, cstrWindowText.GetBuffer(256), 256);
		std::wstring::size_type npos = std::wstring::npos;
		std::wstring wstrWindowText = cstrWindowText.GetBuffer();

		if (fuzzy)
		{
			if (std::wstring::npos != (npos = wstrWindowText.find(title)))
			{
				return *iter;
			}
		}
		else
		{
			if (wstrWindowText == title)
			{
				return *iter;
			}
		}
	}
	return NULL;
}

HWND SearchHwndUnderDesktop(const wchar_t* title, bool fuzzy)
{
	CWnd* pDesktopWnd = CWnd::GetDesktopWindow();
	CWnd* pWnd = pDesktopWnd->GetWindow(GW_CHILD);
	while (NULL != pWnd)
	{
		CString cstrWindowText;
		::GetWindowText(pWnd->GetSafeHwnd(), cstrWindowText.GetBuffer(256), 256);															// ��ȡQQ���㴰��
		std::wstring::size_type npos = std::wstring::npos;
		std::wstring wstrWindowText = cstrWindowText.GetBuffer();

		if (fuzzy)
		{
			if (std::wstring::npos != (npos = wstrWindowText.find(title)))
			{
				return pWnd->GetSafeHwnd();
			}
		}
		else
		{
			if (title == wstrWindowText)
			{
				return pWnd->GetSafeHwnd();
			}
		}

		pWnd = pWnd->GetWindow(GW_HWNDNEXT);
	}
}

bool IfHaveHwndUnderThread(int thread_id, const HWND const hwnd)
{
	std::list<HWND> listThreadWnd;
	EnumThreadWindows(thread_id, EnumThreadWndProc, (LPARAM)&listThreadWnd);						// ��ȡ���߳������д���
	for (std::list<HWND>::iterator iter = listThreadWnd.begin(); iter != listThreadWnd.end(); ++iter)
	{
		if (hwnd == *iter)
		{
			return true;
		}
	}
	return false;
}

BOOL CALLBACK EnumThreadWndProc(HWND hwnd, LPARAM lParam)
{
	std::list<HWND>* pList = (std::list<HWND>*)lParam;
	pList->push_back(hwnd);
	return true;
}

char dec2hexChar(short int n) {
 if ( 0 <= n && n <= 9 ) {
  return char( short('0') + n );
 } else if ( 10 <= n && n <= 15 ) {
  return char( short('A') + n - 10 );
 } else {
  return char(0);
 }
}

short int hexChar2dec(char c) {
 if ( '0'<=c && c<='9' ) {
  return short(c-'0');
 } else if ( 'a'<=c && c<='f' ) {
  return ( short(c-'a') + 10 );
 } else if ( 'A'<=c && c<='F' ) {
  return ( short(c-'A') + 10 );
 } else {
  return -1;
 }
}

std::string escapeURL(const std::string &URL)
{
 std::string result = "";
 for ( unsigned int i=0; i<URL.size(); i++ ) {
  char c = URL[i];
  if (
   ( '0'<=c && c<='9' ) ||
   ( 'a'<=c && c<='z' ) ||
   ( 'A'<=c && c<='Z' ) ||
   c=='/' || c=='.'
   ) {
   result += c;
  } else {
   int j = (short int)c;
   if ( j < 0 ) {
    j += 256;
   }
   int i1, i0;
   i1 = j / 16;
   i0 = j - i1*16;
   result += '%';
   result += dec2hexChar(i1);
   result += dec2hexChar(i0);
  }
 }
 return result;
}

std::string deescapeURL(const std::string &URL) {
 std::string result = "";
 for ( unsigned int i=0; i<URL.size(); i++ ) {
  char c = URL[i];
  if ( c != '%' ) {
   result += c;
  } else {
   char c1 = URL[++i];
   char c0 = URL[++i];
   int num = 0;
   num += hexChar2dec(c1) * 16 + hexChar2dec(c0);
   result += char(num);
  }
 }
 return result;
}

std::string DoubleToString(double src)
{
	char str[256] = {0};
    sprintf(str, "%.0llf", src);
    return str;
}

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
		std::wstring strMsg = L"���ڵ������ \"ȷ��\" ��ť�󣬴򿪵� ";
		strMsg += s2ws(TransToString(g_InfoGroupIndex + 1)) + L" ��QQ��(" + g_InfoGroup[g_InfoGroupIndex].number + L") \"���Ѳ���\" ���棬Ȼ���� \"����\" ��ť";
		UINT nRet = ::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), strMsg.c_str(), L"��ʾ", MB_OK);
		//if (IDCANCEL == nRet)
		//{
		//	break;
		//}
		//else if (IDTRYAGAIN == nRet)
		//{
		//	g_InfoGroupIndex -= 1;
		//}

		// ��ȡ������
		pcap_if_t* pAllDev;
		pcap_if_t* pOneDev;
		char szErrBuf[PCAP_ERRBUF_SIZE] = {0};

		/* ����豸�б� */
		if (-1 == pcap_findalldevs_ex(PCAP_SRC_IF_STRING, NULL, &pAllDev, szErrBuf))
		{
			fprintf(stderr, "Error in pcap_findalldevs: %s\n", szErrBuf);
			exit(1);
		}
		int nNetDevSize = NetDevSize(pAllDev);			// ������

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
			bWait = WaitForMultipleObjects(nNetDevSize, pThreadHandle, FALSE, 1000);			// ��ʱ�ȴ���һ�߳̽���
		} while (WAIT_TIMEOUT == bWait);

		if (WAIT_FAILED == bWait)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), (std::wstring(L"QQ��(")+ g_InfoGroup[g_InfoGroupIndex].number + L") ���ʧ��").c_str(), L"��ʾ", MB_OK);
		}
		
		int nRtnThread = bWait - WAIT_OBJECT_0;
		for (int j = 0; j < nNetDevSize; ++j)
		{
			if (WAIT_TIMEOUT == WaitForSingleObject(pThreadHandle[j], 1000))
			{
				TerminateThread(pThreadHandle[j], 0);				// ǿ����ֹδ�����߳�
			}
			CloseHandle(pThreadHandle[j]);
		}
		
        pcap_freealldevs(pAllDev);		// �ͷ��豸�б�
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
						else
						{
							npos_skey_right = http_txt.find("\r\n", npos_skey_left);
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
}

int CollectBuddy(std::vector<CBuddyInfo>& buddy_all, const PARAM_BUDDY& param)
{
	CollectBuddyEvery(buddy_all, param);

	return 0;
}

int CollectGroup(std::vector<CGroupInfo>& group_all, int city_l1, int city_l2, const std::string& keyword)
{
	if (0 == city_l1)				// ȫ��
	{
		for (int i = 1; i < g_Citys.size(); ++i)
		{
			for (int j = 1; j < g_Citys[i].CityL2.size(); ++j)
			{
				if (0 != CollectGroupEvery(group_all, atoi(g_Citys[i].CityL2[j].id.c_str()), keyword))
				{
					return -1;
				}
				Sleep(3000);
			}
		}
	}
	else if (0 == city_l2)			// ȫʡ
	{
		for (int i = 1; i < g_Citys[city_l1].CityL2.size(); ++i)
		{
			if (0 != CollectGroupEvery(group_all, atoi(g_Citys[city_l1].CityL2[i].id.c_str()), keyword))
			{
				return -1;
			}
			Sleep(3000);
		}
	}
	else							// ����
	{
		if (0 != CollectGroupEvery(group_all, atoi(g_Citys[city_l1].CityL2[city_l2].id.c_str()), keyword))
		{
			return -1;
		}
	}

	return 0;
}

int CollectBuddyEvery(std::vector<CBuddyInfo>& buddy_all, const PARAM_BUDDY& param)
{
	std::string qq_num;
	std::string qq_skey;

	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		if (!g_InfoGroup[i].number.empty() && !g_InfoGroup[i].skey.empty())
		{
			qq_num = ws2s(g_InfoGroup[i].number);
			qq_skey = ws2s(g_InfoGroup[i].skey);
			break;
		}
	}
	if (qq_num.empty() || qq_skey.empty())
	{
		return -1;
	}

	int token = GetCSRFToken(qq_skey);
	const static std::string strMen = Unicode2Utf8(L"��");
	const static std::string strWomen = Unicode2Utf8(L"Ů");
	const static std::string strUnknow = Unicode2Utf8(L"δ֪");
	const static std::string strOnline = Unicode2Utf8(L"����");
	const static std::string strOffline = Unicode2Utf8(L"����");

	for (int page = 0, exit = false; !exit && page < 3; ++page)
	{

	// post����
	curl_global_init(CURL_GLOBAL_ALL);

	CURL* curl_handle = NULL;
	curl_handle = curl_easy_init();
	if (curl_handle)
	{
		int res = 0;
		char szbuff[256] = {0};
		std::string body;
		std::string url = "http://cgi.find.qq.com//qqfind//buddy//search_v3";

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Accept:application/json, text/javascript, */*; q=0.01");
        headers = curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded; charset=UTF-8");
        headers = curl_slist_append(headers, "Origin: http://find.qq.com");
        headers = curl_slist_append(headers, "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.59 QQ/8.4.18357.201 Safari/537.36");
        headers = curl_slist_append(headers, "Referer: http://find.qq.com/index.html?version=1&im_version=5485&width=910&height=610&search_target=0");
        headers = curl_slist_append(headers, "Accept-Encoding: gzip,deflate");
        headers = curl_slist_append(headers, "Accept-Language: en-us,en");
		res = curl_easy_setopt(curl_handle, CURLOPT_HTTPHEADER, headers);

		memset(szbuff, 0, sizeof(szbuff));
		_snprintf(szbuff, sizeof(szbuff), "uin=o0%s; skey=%s", qq_num.c_str(), qq_skey.c_str());
		res = curl_easy_setopt(curl_handle, CURLOPT_COOKIE, szbuff);
		curl_easy_setopt(curl_handle, CURLOPT_ACCEPT_ENCODING, "gzip");

		res = curl_easy_setopt(curl_handle, CURLOPT_URL, url.c_str());   // ָ��url
		res = curl_easy_setopt(curl_handle, CURLOPT_POST, 1);
		
		memset(szbuff, 0, sizeof(szbuff));
		_snprintf(szbuff, sizeof(szbuff), 
					"num=20&page=%d&sessionid=0&keyword=%s&agerg=%s&sex=%s&firston=%s&video=%s&country=%s&province=%s&city=%s&district=%s&hcountry=%s&hprovince=%s&hcity=%s&hdistrict=%s&online=%s&ldw=%d", 
					page, param.keyword.c_str(), param.age.c_str(), param.sex.c_str(), param.firston.c_str(), param.video.c_str(), param.country.c_str(), param.province.c_str(), param.city.c_str(), param.district.c_str(),
					param.hcountry.c_str(), param.hprovince.c_str(), param.hcity.c_str(), param.hdistrict.c_str(), param.online.c_str(), token);
        res = curl_easy_setopt(curl_handle, CURLOPT_POSTFIELDS, szbuff);    // ָ��post����
		res = curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, write_fun_string);
		res = curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, &body);
		res = curl_easy_perform(curl_handle);
		if (res != CURLE_OK)
		{
			//::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), s2ws(curl_easy_strerror((CURLcode)res)).c_str(), L"��ʾ", MB_OK);
			curl_slist_free_all(headers);
			curl_easy_cleanup(curl_handle);
			curl_global_cleanup();
			continue;
		}

		curl_slist_free_all(headers);
		curl_easy_cleanup(curl_handle);

		int n = body.size();
		std::wstring l = Utf82Unicode(body);

		Json::Reader reader;
		Json::Value root;
		if (reader.parse(body, root))
		{
			Json::Value buddy_list = root["result"]["buddy"]["info_list"];
			if (Json::Value() == buddy_list || 0 == buddy_list.size())
			{
				exit = true;
				continue;
			}

			bool exact = JV_STRING(root["result"]["buddy"]["exact"], "") == "1" ? true : false;	// ��ȷ����

			for (int i = 0; i < buddy_list.size(); ++i)
			{
				CBuddyInfo buddy_one;

				buddy_one.Code = JV_INT(buddy_list[i]["uin"], "");
				buddy_one.Nickname = JV_STRING(buddy_list[i]["nick"], "");
				std::string Sex = JV_INT(buddy_list[i]["gender"], "255");
				buddy_one.Sex = (Sex == "1" ? strMen : (Sex == "2" ? strWomen : strUnknow));
				if (exact)
				{
					std::string year = JV_INT(buddy_list[i]["birthday"]["year"], "");
					std::string month = JV_INT(buddy_list[i]["birthday"]["month"], "");
					std::string day = JV_INT(buddy_list[i]["birthday"]["day"], "");
					if (!year.empty() && !month.empty() && !day.empty())
					{
						buddy_one.Age = TransToString(Ymd2Age(atoi(year.c_str()), atoi(month.c_str()), atoi(day.c_str())));
					}
				}
				else
				{
					buddy_one.Age = JV_INT(buddy_list[i]["age"], "");
				}
				buddy_one.Location = JV_STRING(buddy_list[i]["country"], "") + " " + JV_STRING(buddy_list[i]["province"], "") + " " + JV_STRING(buddy_list[i]["city"], "");
				buddy_one.Stat = (JV_INT(buddy_list[i]["stat"], "20") == "1" ? strOnline : strOffline);
				buddy_all.push_back(buddy_one);
			}

			if (exact)
			{
				exit = true;
				continue;
			}
		}
		Sleep(3000);
	}

	curl_global_cleanup();

	}

	return 0;
}

int CollectGroupEvery(std::vector<CGroupInfo>& group_all, int cityid, const std::string& keyword)
{
	std::string qq_num = "2287738680";
	std::string qq_skey = "ZufU06llRy";
	int token = GetCSRFToken(qq_skey);
	std::string k = escapeURL(Unicode2Utf8(L"����"));

	// ɸѡQQ
	//for (int i = 0; i < g_InfoGroup.size(); ++i)
	//{
	//	if (!g_InfoGroup[i].number.empty() && !g_InfoGroup[i].skey.empty())
	//	{
	//		qq_num = ws2s(g_InfoGroup[i].number);
	//		qq_skey = ws2s(g_InfoGroup[i].skey);
	//		break;
	//	}
	//}
	//if (qq_num.empty() || qq_skey.empty())
	//{
	//	return -1;
	//}
	
	for (int page = 0, exit = false; !exit; ++page)
	{

	// post����
	curl_global_init(CURL_GLOBAL_ALL);

	CURL* curl_handle = NULL;
	curl_handle = curl_easy_init();
	if (curl_handle)
	{

		int res = 0;
		char szbuff[256] = {0};
		std::string body;
		std::string url = "http://qun.qq.com/cgi-bin/group_search/pc_group_search";

		//curl_easy_setopt(curl_handle, CURLOPT_COOKIEFILE, "");

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Accept:application/json, text/javascript, */*; q=0.01");
        headers = curl_slist_append(headers, "Accept-Encoding:gzip, deflate");
        headers = curl_slist_append(headers, "Accept-Language:zh-CN,zh;q=0.8");
        //headers = curl_slist_append(headers, "Connection:keep-alive");
        //headers = curl_slist_append(headers, "Content-Length:148");	// ������
        headers = curl_slist_append(headers, "Content-Type:application/x-www-form-urlencoded; charset=UTF-8");
        headers = curl_slist_append(headers, "Host:qun.qq.com");
        headers = curl_slist_append(headers, "Origin:http://find.qq.com");
        headers = curl_slist_append(headers, "Referer:http://find.qq.com/index.html?version=1&im_version=5485&width=910&height=610&search_target=0");
        headers = curl_slist_append(headers, "User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36");
        res = curl_easy_setopt(curl_handle, CURLOPT_HTTPHEADER, headers);
		
		memset(szbuff, 0, sizeof(szbuff));
		_snprintf(szbuff, sizeof(szbuff), "uin=o0%s; skey=%s", qq_num.c_str(), qq_skey.c_str());
		res = curl_easy_setopt(curl_handle, CURLOPT_COOKIE, szbuff);
		curl_easy_setopt(curl_handle, CURLOPT_ACCEPT_ENCODING, "gzip");

        res = curl_easy_setopt(curl_handle, CURLOPT_URL, url.c_str());   // ָ��url
		//res = curl_easy_setopt(curl_handle, CURLOPT_FOLLOWLOCATION, 1);
		//res = curl_easy_setopt(curl_handle, CURLOPT_NOPROGRESS, 1L);
		res = curl_easy_setopt(curl_handle, CURLOPT_POST, 1);
		
		memset(szbuff, 0, sizeof(szbuff));
		_snprintf(szbuff, sizeof(szbuff), "k=%s&n=8&st=1&iso=1&src=1&v=5539&bkn=%d&isRecommend=false&city_id=%d&from=1&newSearch=false&keyword=%s&sort=0&wantnum=24&page=%d&ldw=%d", k.c_str(), token, cityid, keyword.c_str(), page, token);
        res = curl_easy_setopt(curl_handle, CURLOPT_POSTFIELDS, szbuff);    // ָ��post����
		//res = curl_easy_setopt(curl_handle, CURLOPT_POSTFIELDSIZE, strlen("&n=8&st=1&iso=1&src=1&v=4903&bkn=1825472041&isRecommend=false&city_id=0&from=1&keyword=rthrth&sort=0&wantnum=1&page=0&ldw=1825472041"));
		//res = curl_easy_setopt(curl_handle, CURLOPT_COOKIEFILE, "/Users/zhu/cookie");
		res = curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, write_fun_string);
		res = curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, &body);
		//res = curl_easy_setopt(curl_handle, CURLOPT_COOKIEJAR, "cookies");
		res = curl_easy_perform(curl_handle);
		if (res != CURLE_OK)
		{
			//::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), s2ws(curl_easy_strerror((CURLcode)res)).c_str(), L"��ʾ", MB_OK);
			curl_slist_free_all(headers);
			curl_easy_cleanup(curl_handle);
			curl_global_cleanup();
			continue;
		}

		curl_slist_free_all(headers);
		curl_easy_cleanup(curl_handle);

		int n = body.size();
		std::wstring l = Utf82Unicode(body);
		//::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), Utf82Unicode(body).c_str(), L"��ʾ", MB_OK);

		Json::Reader reader;
		Json::Value root;
		if (reader.parse(body, root))
		{
			Json::Value group_list = root["group_list"];
			if (Json::Value() == group_list)
			{
				exit = true;
				continue;
			}

			for (int i = 0; i < group_list.size(); ++i)
			{
				if (/*Json::Value() == group_list[i]["certificate_type"] || */2 == group_list[i]["certificate_type"].asInt())		// ������֤Ⱥ
				{
					continue;
				}

				CGroupInfo group_one;
				group_one.CertificateName = JV_STRING(group_list[i]["certificate_name"], "");
				group_one.CertificateType = JV_INT(group_list[i]["certificate_type"], "");
				group_one.CityID = JV_INT(group_list[i]["cityid"], "");
				group_one.Code = JV_INT(group_list[i]["code"], "");
				int j = 0;
				for (j = 0; j < group_list[i]["gcate"].size(); ++j)
				{
					group_one.Gcate += JV_STRING(group_list[i]["gcate"][j], "") + " | ";
				}
				if (j > 0)
				{
					group_one.Gcate = group_one.Gcate.substr(0, group_one.Gcate.size() - 3);
				}
				group_one.Gid = JV_INT(group_list[i]["gid"], "");
				group_one.GroupLabel = JV_STRING(group_list[i]["group_label"], "");
				group_one.Latitude = JV_STRING(group_list[i]["latitude"], "");
				group_one.Level = JV_INT(group_list[i]["level"], "");
				group_one.Longitude = JV_STRING(group_list[i]["longitude"], "");
				group_one.MaxMemberNum = JV_INT(group_list[i]["max_member_num"], "");;
				group_one.MemberNum = JV_INT(group_list[i]["member_num"], "");
				group_one.Name = JV_STRING(group_list[i]["name"], "");
				group_one.OwnerUin = JV_INT(group_list[i]["owner_uin"], "");;
				for (int j = 0; j < group_list[i]["qaddr"].size(); ++j)
				{
					group_one.Gaddr += JV_STRING(group_list[i]["qaddr"][j], "");
				}
				group_one.RichFingerMemo = JV_STRING(group_list[i]["richfingermemo"], "");
				group_one.Url = JV_STRING(group_list[i]["url"], "");
				group_all.push_back(group_one);
			}
		}
		
		Sleep(3000);
	}
	
	curl_global_cleanup();
	}
	return 0;
}

int GetCSRFToken(const std::string& e)
{
	int n = 5381;
	for (int i= 0; i < e.length(); ++i)
	{
		n += (n << 5) + e[i];
	}
	return n & 2147483647;
}

std::wstring GetRunPathW()
{
	wchar_t path[1024]       = {0x00};
    GetModuleFileNameW(NULL, path, 256);
    PathRemoveFileSpecW(path);
    std::wstring str = path;
    WCHAR Dest[MAX_PATH] = { 0 };    
    PathCombineW(Dest, NULL, str.c_str()); 
    std::wstring progPath = Dest;
    progPath += L"\\";
    return progPath;
}

std::string CaptureNickname(const std::string& qq_number)
{
	curl_global_init(CURL_GLOBAL_ALL);

	std::string rst = "";
	CURL* curl_handle = NULL;
	curl_handle = curl_easy_init();
	if (curl_handle)
	{
		std::string body;
		std::string url = "http://r.pengyou.com/fcg-bin/cgi_get_portrait.fcg?uins=" + qq_number;
		curl_easy_setopt(curl_handle, CURLOPT_URL, url.c_str());	// char*���ͣ�����string
		curl_easy_setopt(curl_handle, CURLOPT_NOPROGRESS, 1L);
		curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, write_fun_string);
		curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, &body);
		printf("%s", body.c_str());
		int res = curl_easy_perform(curl_handle);
		if (res != CURLE_OK)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), s2ws(curl_easy_strerror((CURLcode)res)).c_str(), L"��ʾ", MB_OK);
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
					rst = arr[6].asString();	// portraitCallBack({"505519763":["http://qlogo4.store.qq.com/qzone/505519763/505519763/100",1648,-1,0,0,0,"����",0]})
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
		return L"����";
	case E_STATUS_EXCEPTION:
		return L"�쳣";
	default:
		return L"����";
	}
}

std::wstring Utf82Unicode(const std::string& utf8string)  
{  
    int widesize = ::MultiByteToWideChar(CP_UTF8, 0, utf8string.c_str(), -1, NULL, 0);  
    if (widesize == ERROR_NO_UNICODE_TRANSLATION)  
    {  
        throw std::exception("Invalid UTF-8 sequence.");  
    }  
    if (widesize == 0)  
    {  
        throw std::exception("Error in conversion.");  
    }  
   
    std::vector<wchar_t> resultstring(widesize);  
   
    int convresult = ::MultiByteToWideChar(CP_UTF8, 0, utf8string.c_str(), -1, &resultstring[0], widesize);  
   
    if (convresult != widesize)  
    {  
        throw std::exception("La falla!");  
    }  
   
    return std::wstring(&resultstring[0]);  
}

std::string Unicode2Utf8(const std::wstring& widestring)  
{  
    int utf8size = ::WideCharToMultiByte(CP_UTF8, 0, widestring.c_str(), -1, NULL, 0, NULL, NULL);  
    if (utf8size == 0)  
    {  
        throw std::exception("Error in conversion.");  
    }  
   
    std::vector<char> resultstring(utf8size);  
   
    int convresult = ::WideCharToMultiByte(CP_UTF8, 0, widestring.c_str(), -1, &resultstring[0], utf8size, NULL, NULL);  
   
    if (convresult != utf8size)  
    {  
        throw std::exception("La falla!");  
    }  
   
    return std::string(&resultstring[0]);  
}  

void UnicodeToUTF_8(char* pOut,wchar_t* pText)  
{  
   // ע�� WCHAR�ߵ��ֵ�˳��,���ֽ���ǰ�����ֽ��ں�  
   char* pchar = (char *)pText;  
   pOut[0] = (0xE0 | ((pchar[1] & 0xF0) >> 4));  
   pOut[1] = (0x80 | ((pchar[1] & 0x0F) << 2)) + ((pchar[0] & 0xC0) >> 6);  
   pOut[2] = (0x80 | (pchar[0] & 0x3F));
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

int ReadFile(const std::wstring& strPath, std::string& strCont)
{
	FILE* file = NULL;
	file = _tfopen(strPath.c_str(), _T("rb"));
	if (!file)
	{
		return -1;
	}

	fseek(file, 0, SEEK_END);
	UINT64 size = ftell(file);
	rewind(file);

	char* buffer = (char*)malloc(sizeof(char) * size);
	if (!buffer)
	{
		fclose(file);
		return -1;
	}
	memset(buffer, 0, size);

	UINT64 result = fread(buffer, 1, size, file);
	if (result != size)
	{
		fclose(file);
		free(buffer);
		buffer = NULL;
		return -1;
	}
	strCont = std::string(buffer, size);

	fclose(file);
	free(buffer);
	buffer = NULL;
	return 0;
}

void Split(const std::string& src, const char* sep, std::vector<std::string>& res)
{
	if (src.empty() || NULL == sep)
	{
		return;
	}

	int sep_len = strlen(sep);
	std::size_t beg_pos = 0;
	std::size_t sep_pos = src.find(sep);

	while (std::string::npos != sep_pos)
	{
		res.push_back(std::string(src, beg_pos, sep_pos - beg_pos));
		beg_pos = sep_pos + sep_len;
		sep_pos = src.find(sep, beg_pos);
	}

	if (beg_pos <= src.size())
	{
		res.push_back(std::string(src, beg_pos));
	}
}

int Ymd2Age(int year, int month, int day)
{
	time_t tt_now;
	struct tm* tm_now = NULL;

	time(&tt_now);
	tm_now = localtime(&tt_now);

	int year_now = tm_now->tm_year + 1900;
	int month_now = tm_now->tm_mon + 1;
	int day_now = tm_now->tm_mday;

	if (month_now < month || (month_now == month && day_now < day))
	{
		return year_now - year - 1;
	}
	else
	{
		return year_now - year;
	}
}

std::string UTF8ToGBK(const std::string& strUTF8)  
{  
    int len = MultiByteToWideChar(CP_UTF8, 0, strUTF8.c_str(), -1, NULL, 0);  
    WCHAR* wszGBK = new WCHAR[len+1];
    memset(wszGBK, 0, len * 2 + 2);  
    MultiByteToWideChar(CP_UTF8, 0, (LPCCH)strUTF8.c_str(), -1, wszGBK, len);  
  
    len = WideCharToMultiByte(CP_ACP, 0, wszGBK, -1, NULL, 0, NULL, NULL);  
    char *szGBK = new char[len + 1];  
    memset(szGBK, 0, len + 1);  
    WideCharToMultiByte(CP_ACP,0, wszGBK, -1, szGBK, len, NULL, NULL);   
    std::string strTemp(szGBK);  
    delete[]szGBK;  
    delete[]wszGBK;  
    return strTemp;  
}
#else
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
		ShowWindow(g_InfoGroup[g_InfoGroupIndex].windows, SW_SHOW);	// ��ʾ����
		do
		{
			// �������ѣ��������б���
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

			// ��ʱ�ȴ���һ�߳̽���
			bWait = WaitForMultipleObjects(nNetDevSize, pThreadHandle, FALSE, 1000);
		} while (WAIT_TIMEOUT == bWait && ++nWaitTimes <= 10);

		if (WAIT_FAILED == bWait)
		{
			::MessageBox(AfxGetApp()->GetMainWnd()->GetSafeHwnd(), (std::wstring(L"QQ: ")+ g_InfoGroup[g_InfoGroupIndex].number + L" ���ʧ��").c_str(), L"��ʾ", MB_OK);
		}
		
		int nRtnThread = bWait - WAIT_OBJECT_0;
		for (int j = 0; j < nNetDevSize; ++j)
		{
			if (WAIT_TIMEOUT == WaitForSingleObject(pThreadHandle[j], 1000))
			{
				TerminateThread(pThreadHandle[j], 0);				// ǿ����ֹδ�����߳�
			}
			CloseHandle(pThreadHandle[j]);
		}
		
        pcap_freealldevs(pAllDev);		// �ͷ��豸�б�
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
#endif