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
	switch (nIDEvent)
	{
	case 1:
		handle = ::FindWindowEx(GetDesktopWindow()->GetSafeHwnd(), 0, NULL, L"����");
		::SetForegroundWindow(handle);
		keybd_event(VK_CONTROL, 0, 0, 0);
		keybd_event('A', 0, 0, 0);
		keybd_event('A', 0, KEYEVENTF_KEYUP, 0);
		keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0);

		keybd_event('K', 0, 0, 0);
		keybd_event('K', 0, KEYEVENTF_KEYUP, 0);
				
		keybd_event(VK_CONTROL, 0, 0, 0);
		keybd_event(VK_RETURN, 0, 0, 0);												
		keybd_event(VK_RETURN, 0, KEYEVENTF_KEYUP, 0);
		keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0);

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
					node.windows = *iter;												// ������
					node.processid = dwProcessId;										// ���̺�
					node.threadid = dwThreadId;											// ���̺߳�
					g_InfoGroup.push_back(node);
					break;
				}
			}
		}

		pWnd = pWnd->GetWindow(GW_HWNDNEXT);
	}

	// ��ȡQQ������Ϣ
	CaptureCookies();

	// ��ʾ��⵽��QQ��
	CString tmp;
	tmp.Format(_T("��⵽ %d �� QQ �ͻ���"), g_InfoGroup.size());
	MessageBox(tmp, L"��ʾ", MB_OK);

	// �����˺��б�
	m_listctlAccount.DeleteAllItems();
	for (int i = 0; i < g_InfoGroup.size(); ++i)
	{
		CString tmp;
		tmp.Format(_T("%d"), i + 1);
		m_listctlAccount.InsertItem(i, tmp);
		m_listctlAccount.SetItemState(i, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
		m_listctlAccount.SetItemText(i, 1, g_InfoGroup[i].number.c_str());
		m_listctlAccount.SetItemText(i, 3, g_InfoGroup[i].status.c_str());
	}
}

void CDialogPageAccount::OnBnClickedButton1()
{
	SetTimer(1, 60000, NULL);
}