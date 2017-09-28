// CDialogPageAccount.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAccount.h"
#include "InfoManager.h"
#include "PublicFun.h"
#include "afxdialogex.h"
#include <string>
#include <list>
#include <vector>

// CDialogPageAccount 对话框

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
	m_listctlAccount.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listctlAccount.InsertColumn(1, _T("账号"), LVCFMT_LEFT, 80);
	m_listctlAccount.InsertColumn(2, _T("昵称"), LVCFMT_LEFT, nWidth - 200);
	m_listctlAccount.InsertColumn(3, _T("状态"), LVCFMT_LEFT, 80);

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
	ON_WM_CTLCOLOR()
	ON_BN_CLICKED(IDC_BUTTON_STARTUP, &CDialogPageAccount::OnBnClickedButtonStartup)
	ON_BN_CLICKED(IDC_BUTTON_DETECT, &CDialogPageAccount::OnBnClickedButtonDetect)
END_MESSAGE_MAP()


// CDialogPageAccount 消息处理程序

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
		MessageBox(L"启动QQ失败！请检查软件路径是否正确", L"提示", MB_OK);
		return;
	}

	WaitForSingleObject(pi.hProcess, INFINITE);
	DWORD dwExit = 0;
	GetExitCodeProcess(pi.hProcess, &dwExit);
	if (0 != dwExit)
	{
		MessageBox(L"启动QQ错误！", L"提示", MB_OK);
		return;
	}
	CloseHandle(pi.hProcess);
	CloseHandle(pi.hThread);

	//DetectQqData();
	//MessageBox(L"启动QQ成功！", L"提示", MB_OK);
}

#if 1
void CDialogPageAccount::OnBnClickedButtonDetect()
{
	CInfoManager::GetInstance()->Clear();

	// 获取QQ号、主窗口、进程号、主线程号
	CWnd* pDesktopWnd = CWnd::GetDesktopWindow();
	CWnd* pWnd = pDesktopWnd->GetWindow(GW_CHILD);
	while (NULL != pWnd)
	{
		CString cstrWindowText;
		::GetWindowText(pWnd->GetSafeHwnd(), cstrWindowText.GetBuffer(256), 256);

		if (L"QQ" == cstrWindowText)																							// 获取QQ顶层窗口
		{
			DWORD dwProcessId = 0;
			DWORD dwThreadId = GetWindowThreadProcessId(pWnd->GetSafeHwnd(), &dwProcessId);										// 根据QQ顶层窗口获取主线程号

			std::list<HWND> listThreadWnd;
			EnumThreadWindows(dwThreadId, CDialogPageAccount::EnumThreadWndProc, (LPARAM)&listThreadWnd);						// 获取主线程下所有窗口
			for (std::list<HWND>::iterator iter = listThreadWnd.begin(); iter != listThreadWnd.end(); ++iter)
			{
				std::wstring::size_type npos = std::wstring::npos;
				CString cstrWindowText;
				::GetWindowText(*iter, cstrWindowText.GetBuffer(256), 256);
				std::wstring wstrWindowText = cstrWindowText.GetBuffer();
				if (std::wstring::npos != (npos = wstrWindowText.find(L"qqexchangewnd_shortcut_prefix_")))
				{
					CInfoNode node;
					node.number = wstrWindowText.substr(npos + 30);						// QQ号
					node.windows = *iter;												// 主窗口
					node.processid = dwProcessId;										// 进程号
					node.threadid = dwThreadId;											// 主线程号
					CInfoManager::GetInstance()->Insert(node);
					break;
				}
			}
		}

		pWnd = pWnd->GetWindow(GW_HWNDNEXT);
	}

	// 获取QQ其他信息

	// 提示检测到的QQ数
	CString tmp;
	tmp.Format(_T("检测到%d个QQ"), CInfoManager::GetInstance()->Size());
	MessageBox(tmp, L"提示", MB_OK);

	// 更新账号列表
	m_listctlAccount.DeleteAllItems();
	CInfoGroup InfoGroup = CInfoManager::GetInstance()->Get();
	for (int i = 0; i < InfoGroup.size(); ++i)
	{
		CString tmp;
		tmp.Format(_T("%d"), i + 1);
		m_listctlAccount.InsertItem(i, tmp);
		m_listctlAccount.SetItemState(i, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
		m_listctlAccount.SetItemText(i, 1, InfoGroup[i].number.c_str());
		m_listctlAccount.SetItemText(i, 3, InfoGroup[i].status.c_str());
	}
}
#else
void CDialogPageAccount::OnBnClickedButtonDetect()
{
	m_listctlAccount.DeleteAllItems();

	CWnd* pDesktopWnd = CWnd::GetDesktopWindow();
	CWnd* pWnd = pDesktopWnd->GetWindow(GW_CHILD);
	while (NULL != pWnd)
	{
		CString cstrWindowText;
		::GetWindowText(pWnd->GetSafeHwnd(), cstrWindowText.GetBuffer(256), 256);

		if (L"QQ" == cstrWindowText)				// 获取QQ顶层窗口
		{
			DWORD dwProcessId = 0;
			DWORD dwThreadId = GetWindowThreadProcessId(pWnd->GetSafeHwnd(), &dwProcessId);		// 根据QQ顶层窗口获取主线程号

			std::list<HWND> listThreadWnd;
			EnumThreadWindows(dwThreadId, CDialogPageAccount::EnumThreadWndProc, (LPARAM)&listThreadWnd);						// 获取主线程下所有窗口
			for (std::list<HWND>::iterator iter = listThreadWnd.begin(); iter != listThreadWnd.end(); ++iter)
			{
				std::wstring::size_type npos = std::wstring::npos;
				CString cstrWindowText;
				::GetWindowText(*iter, cstrWindowText.GetBuffer(256), 256);
				std::wstring wstrWindowText = cstrWindowText.GetBuffer();
				if (std::wstring::npos != (npos = wstrWindowText.find(L"qqexchangewnd_shortcut_prefix_")))
				{
					std::wstring strQQ = wstrWindowText.substr(npos + 30);							// 获取QQ号
					CString cstrRow;
					int nRow = m_listctlAccount.GetItemCount();
					cstrRow.Format(_T("%d"), nRow + 1);
					m_listctlAccount.InsertItem(nRow, cstrRow);
					m_listctlAccount.SetItemState(nRow, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
					m_listctlAccount.SetItemText(nRow, 1, strQQ.c_str());
					break;
				}
			}
		}

		pWnd = pWnd->GetWindow(GW_HWNDNEXT);
	}
}
#endif