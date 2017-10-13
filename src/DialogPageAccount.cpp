// CDialogPageAccount.cpp : ʵ���ļ�
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAccount.h"
//#include "InfoManager.h"
#include "PublicFun.h"
#include "afxdialogex.h"
#include <string>
#include <list>
#include <vector>

extern CInfoGroup g_InfoGroup;

#define WM_REFRESH WM_USER + 1

// CDialogPageAccount �Ի���

IMPLEMENT_DYNAMIC(CDialogPageAccount, CDialogEx)

CDialogPageAccount::CDialogPageAccount(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageAccount::IDD, pParent)
{

}

CDialogPageAccount::~CDialogPageAccount()
{
}

BOOL CDialogPageAccount::OnInitDialog()
{
	CDialogEx::OnInitDialog();
	
	CRect rc;
	m_listctlAccount.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listctlAccount.SetExtendedStyle(m_listctlAccount.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listctlAccount.InsertColumn(0, _T("���"), LVCFMT_LEFT, 40);
	m_listctlAccount.InsertColumn(1, _T("�˺�"), LVCFMT_LEFT, 80);
	m_listctlAccount.InsertColumn(2, _T("�ǳ�"), LVCFMT_LEFT, nWidth - 200);
	m_listctlAccount.InsertColumn(3, _T("״̬"), LVCFMT_LEFT, 80);

	SetDlgItemText(IDC_MFCEDITBROWSE_QQDIR, L"C:\\Program Files (x86)\\Tencent\\QQ");
	//m_mfceditbrowserQqDir.EnableFolderBrowseButton();

	return TRUE;
}

void CDialogPageAccount::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_LIST_ACCOUNT, m_listctlAccount);
	DDX_Control(pDX, IDC_MFCEDITBROWSE_QQDIR, m_mfceditbrowserQqDir);
}

void CDialogPageAccount::OnTimer(UINT nIDEvent)
{
	HWND handle = NULL;
	int n = 0;
	switch (nIDEvent)
	{
	case 1:
		handle = ::FindWindowEx(GetDesktopWindow()->GetSafeHwnd(), 0, NULL, L"QQ");
		if (handle)
		{
			keybd_event(VK_CONTROL, 0x1D, 0, 0);
			//::PostMessage(handle, WM_KEYDOWN, VK_CONTROL, 0x001D0001);
			::PostMessage(handle, WM_KEYDOWN, 'A', 0x401E0001);
			Sleep(50);
			::PostMessage(handle, WM_KEYUP, 'A', 0xC01E0001);
			////::PostMessage(handle, WM_KEYDOWN, VK_CONTROL, 0);
			//::PostMessage(handle, WM_KEYDOWN, 'A', 0x001E0001);
			//::PostMessage(handle, WM_KEYUP, 'A', 0xC01E0001);
			////::PostMessage(handle, WM_KEYUP, VK_CONTROL, 0);
			keybd_event(VK_CONTROL, 0x1D, KEYEVENTF_KEYUP, 0);
			//::PostMessage(handle, WM_KEYUP, VK_CONTROL, 0x801D0001);
			
			::PostMessage(handle, WM_KEYDOWN, '1', 0x00310001);
			Sleep(50);
			::PostMessage(handle, WM_KEYUP, '1', 0xC0310001);
			//::PostMessage(handle, WM_KEYDOWN, VK_BACK, 0);
			//::PostMessage(handle, WM_KEYUP, VK_BACK, 0);

			//::PostMessage(handle, WM_KEYDOWN, '1', 0);
			//::PostMessage(handle, WM_KEYUP, '1', 0);
			//
			//keybd_event(VK_CONTROL, 0x2A, 0, 0);
			////::PostMessage(handle, WM_KEYDOWN, VK_CONTROL, 0);
			//::PostMessage(handle, WM_KEYDOWN, 'V', 0x002F0001);
			//::PostMessage(handle, WM_KEYUP, 'V', 0xC02F0001);
			////::PostMessage(handle, WM_KEYUP, VK_CONTROL, 0);
			//keybd_event(VK_CONTROL, 0x2A, KEYEVENTF_KEYUP, 0);
			
			//keybd_event(VK_CONTROL, 0x2A, 0, 0);
			//::PostMessage(handle, WM_KEYDOWN, VK_CONTROL, 0);
			//::PostMessage(handle, WM_KEYDOWN, VK_CONTROL, 0);
			//::PostMessage(handle, WM_KEYDOWN, VK_RETURN, 0);
			//::PostMessage(handle, WM_KEYUP, VK_RETURN, 0);
			//::PostMessage(handle, WM_KEYUP, VK_CONTROL, 0);
			//::PostMessage(handle, WM_KEYUP, VK_CONTROL, 0);
			//keybd_event(VK_CONTROL, 0x2A, KEYEVENTF_KEYUP, 0);
			
			//n = MapVirtualKey(VK_RETURN, 0);
			//n = MapVirtualKey('A', 0);
			//n = MapVirtualKey('V', 0);
			//::SetForegroundWindow(handle);
			//keybd_event(VK_CONTROL, 0, 0, 0);
			//keybd_event('A', 0, 0, 0);
			//keybd_event('A', 0, KEYEVENTF_KEYUP, 0);
			//keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0);
			//
			//keybd_event('K', 0, 0, 0);
			//keybd_event('K', 0, KEYEVENTF_KEYUP, 0);
			//		
			//keybd_event(VK_CONTROL, 0, 0, 0);
			//keybd_event(VK_RETURN, 0, 0, 0);												
			//keybd_event(VK_RETURN, 0, KEYEVENTF_KEYUP, 0);
			//keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0);
		}
		break;
	default:
		break;
	}
	CDialog::OnTimer(nIDEvent);
}

HBRUSH CDialogPageAccount::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BOOL CALLBACK CDialogPageAccount::EnumThreadWndProc(HWND hwnd, LPARAM lParam)
{
	std::list<HWND>* pList = (std::list<HWND>*)lParam;
	pList->push_back(hwnd);
	return true;
}

BEGIN_MESSAGE_MAP(CDialogPageAccount, CDialogEx)
	ON_WM_TIMER()
	ON_WM_CTLCOLOR()
	ON_BN_CLICKED(IDC_BUTTON_STARTUP, &CDialogPageAccount::OnBnClickedButtonStartup)
	ON_BN_CLICKED(IDC_BUTTON_DETECT, &CDialogPageAccount::OnBnClickedButtonDetect)
	ON_BN_CLICKED(IDC_BUTTON1, &CDialogPageAccount::OnBnClickedButton1)
	ON_MESSAGE(WM_REFRESH, OnRefresh)
END_MESSAGE_MAP()


// CDialogPageAccount ��Ϣ�������

void CDialogPageAccount::OnBnClickedButtonStartup()
{
	CString cstrText;
	GetDlgItemText(IDC_MFCEDITBROWSE_QQDIR, cstrText);
	std::wstring wstrExe = cstrText + L"\\Bin\\QQ.exe";	
	
	PROCESS_INFORMATION pi;
	STARTUPINFO			si;
	ZeroMemory(&pi, sizeof(PROCESS_INFORMATION));
	ZeroMemory(&si, sizeof(STARTUPINFO));
	si.cb			= sizeof(STARTUPINFO);
	si.dwFlags		= STARTF_USESHOWWINDOW | STARTF_USESTDHANDLES;
	si.wShowWindow	= SW_HIDE;
	BOOL bRst = CreateProcess(NULL, (LPWSTR)wstrExe.c_str(), NULL, NULL, true, NULL, NULL, NULL, &si, &pi);
	if (!bRst)
	{
		MessageBox(L"����QQʧ�ܣ��������·���Ƿ���ȷ", L"��ʾ", MB_OK);
		return;
	}

	//WaitForSingleObject(pi.hProcess, INFINITE);
	//DWORD dwExit = 0;
	//GetExitCodeProcess(pi.hProcess, &dwExit);
	//if (0 != dwExit)
	//{
	//	MessageBox(L"����QQ����", L"��ʾ", MB_OK);
	//	return;
	//}
	CloseHandle(pi.hProcess);
	CloseHandle(pi.hThread);

	//DetectQqData();
	//MessageBox(L"����QQ�ɹ���", L"��ʾ", MB_OK);
}

void CDialogPageAccount::OnBnClickedButtonDetect()
{
	g_InfoGroup.clear();

	// ��ȡQQ�š������ڡ����̺š����̺߳�
	CWnd* pDesktopWnd = CWnd::GetDesktopWindow();
	CWnd* pWnd = pDesktopWnd->GetWindow(GW_CHILD);
	while (NULL != pWnd)
	{
		CString cstrWindowText;
		::GetWindowText(pWnd->GetSafeHwnd(), cstrWindowText.GetBuffer(256), 256);

		if (L"QQ" == cstrWindowText)																							// ��ȡQQ���㴰��
		{
			DWORD dwProcessId = 0;
			DWORD dwThreadId = GetWindowThreadProcessId(pWnd->GetSafeHwnd(), &dwProcessId);										// ����QQ���㴰�ڻ�ȡ���̺߳�

			std::list<HWND> listThreadWnd;
			EnumThreadWindows(dwThreadId, CDialogPageAccount::EnumThreadWndProc, (LPARAM)&listThreadWnd);						// ��ȡ���߳������д���
			for (std::list<HWND>::iterator iter = listThreadWnd.begin(); iter != listThreadWnd.end(); ++iter)
			{
				std::wstring::size_type npos = std::wstring::npos;
				CString cstrWindowText;
				::GetWindowText(*iter, cstrWindowText.GetBuffer(256), 256);
				std::wstring wstrWindowText = cstrWindowText.GetBuffer();
				if (std::wstring::npos != (npos = wstrWindowText.find(L"qqexchangewnd_shortcut_prefix_")))
				{
					CInfoNode node;
					node.number = wstrWindowText.substr(npos + 30);						// QQ��
					node.windows = pWnd->GetSafeHwnd();									// ������
					node.processid = dwProcessId;										// ���̺�
					node.threadid = dwThreadId;											// ���̺߳�
					g_InfoGroup.push_back(node);
					break;
				}
			}
		}

		pWnd = pWnd->GetWindow(GW_HWNDNEXT);
	}

	// ��ȡQQ skey����Ϣ
	CaptureCookies();

	// ��ȡQQ �ǳ�
	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		g_InfoGroup[i].nickname = s2ws(CaptureNickname(ws2s(g_InfoGroup[i].number)));
	}

	// ʶ��QQ״̬
	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		CheckStatus(g_InfoGroup[i]);
	}

	// ��ʾ��⵽��QQ��
	int nNormal = 0;
	int nException = 0;
	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		if (E_STATUS_NORMAL == g_InfoGroup[i].status)
		{
			++nNormal;
		}
		else if (E_STATUS_EXCEPTION == g_InfoGroup[i].status)
		{
			++nException;
		}
	}

	CString tmp;
	tmp.Format(_T("��⵽ %d �� QQ �ͻ���\n����: %d\n�쳣: %d"), g_InfoGroup.size(), nNormal, nException);
	MessageBox(tmp.GetBuffer(), L"��ʾ", MB_OK);
	//MessageBox((std::wstring(L"��⵽ ") + s2ws(TransToString(g_InfoGroup.size())) + L" �� QQ �ͻ���").c_str(), L"��ʾ", MB_OK);

	// �����˺��б�
	this->SendMessage(WM_REFRESH, NULL, NULL);
}

void CDialogPageAccount::OnBnClickedButton1()
{
	SetTimer(1, 1000, NULL);
}

LRESULT CDialogPageAccount::OnRefresh(WPARAM wParam, LPARAM lParam)
{
	m_listctlAccount.DeleteAllItems();
	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		CString tmp;
		tmp.Format(_T("%d"), i + 1);
		m_listctlAccount.InsertItem(i, tmp);
		m_listctlAccount.SetItemState(i, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
		m_listctlAccount.SetItemText(i, 1, g_InfoGroup[i].number.c_str());
		m_listctlAccount.SetItemText(i, 2, g_InfoGroup[i].nickname.c_str());
		m_listctlAccount.SetItemText(i, 3, StatusAsWString(g_InfoGroup[i].status).c_str());
	}

	return 0;
}