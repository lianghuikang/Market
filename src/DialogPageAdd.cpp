// CDialogPageAdd.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAdd.h"
#include "afxdialogex.h"
#include "PublicFun.h"
#include "jsoncpp/json.h"
#include <list>

extern CInfoGroup g_InfoGroup;

// CDialogPageAdd 对话框

IMPLEMENT_DYNAMIC(CDialogPageAdd, CDialogEx)

CDialogPageAdd::CDialogPageAdd(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageAdd::IDD, pParent)
{

}

CDialogPageAdd::~CDialogPageAdd()
{
}

BOOL CDialogPageAdd::OnInitDialog()
{
	CDialogEx::OnInitDialog();
	
	// 添加对象
	m_comboAdd.AddString(L"QQ号");
	m_comboAdd.AddString(L"QQ群");
	m_comboAdd.SetCurSel(0);

	// 添加列表
	CRect rc;
	m_listctlAdd.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listctlAdd.SetExtendedStyle(m_listctlAdd.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listctlAdd.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listctlAdd.InsertColumn(1, _T("账号"), LVCFMT_LEFT, 80);
	//m_listctlAdd.InsertColumn(2, _T("昵称"), LVCFMT_LEFT, nWidth - 120);
	
	m_listMsg.GetClientRect(rc);
	nWidth = rc.Width();
	m_listMsg.SetExtendedStyle(m_listMsg.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listMsg.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listMsg.InsertColumn(1, _T("内容"), LVCFMT_LEFT, nWidth - 40);

	return TRUE;
}

void CDialogPageAdd::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_ADD, m_comboAdd);
	DDX_Control(pDX, IDC_LIST_ADD, m_listctlAdd);
	DDX_Control(pDX, IDC_EDIT_MSG, m_editMsg);
	DDX_Control(pDX, IDC_LIST_MSG, m_listMsg);
}

HBRUSH CDialogPageAdd::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

void CDialogPageAdd::BuddyAdd(HWND hwnd, const std::wstring& account, const std::wstring& msg)
{
	//DWORD process_id = 0;
	DWORD thread_id = GetWindowThreadProcessId(hwnd, NULL);
	if (!thread_id)
	{
		return;
	}

	// 显示窗口
	::ShowWindow(hwnd, SW_SHOWNORMAL);
	::SetForegroundWindow(hwnd);

	MouseClick(hwnd, 35, 100);
	KeyCtrlC(Unicode2Utf8(account));
	KeyCtrlA(hwnd);
	KeyCtrlV(hwnd);
	KeyReturn(hwnd);

	HWND hwnd_friend = NULL;
	for (int i = 0; i < 5; ++i)
	{
		Sleep(1000);
		MouseClick(hwnd, 122, 311);

		for (int j = 0; j < 5; ++j)
		{
			Sleep(1000);
			hwnd_friend = SearchHwndUnderThread(thread_id, L"添加好友");
			if (hwnd_friend)
			{
				break;
			}
		}
		if (hwnd_friend)
		{
			break;
		}
	}
	if (!hwnd_friend)
	{
		return;
	}
	
	MouseClick(hwnd_friend, 160, 85);
	KeyCtrlC(ws2s(msg));
	KeyCtrlA(hwnd_friend);
	KeyCtrlV(hwnd_friend);
	KeyTab(hwnd_friend);
	KeyReturn(hwnd_friend);

	int nTryTimes = 5;
	while (IfHaveHwndUnderThread(thread_id, hwnd_friend) && nTryTimes-- > 0)
	{
		Sleep(1000);
		KeyReturn(hwnd_friend);
	}

	if (IfHaveHwndUnderThread(thread_id, hwnd_friend))
	{
		::SendMessage(hwnd_friend, WM_CLOSE, 0, 0);
	}
}

void CDialogPageAdd::GroupAdd(HWND hwnd, const std::wstring& account, const std::wstring& msg)
{
	DWORD thread_id = GetWindowThreadProcessId(hwnd, NULL);
	if (!thread_id)
	{
		return;
	}

	// 显示窗口
	::ShowWindow(hwnd, SW_SHOWNORMAL);
	::SetForegroundWindow(hwnd);

	MouseClick(hwnd, 145, 100);
	KeyCtrlC(Unicode2Utf8(account));
	KeyCtrlA(hwnd);
	KeyCtrlV(hwnd);
	KeyReturn(hwnd);

	HWND hwnd_friend = NULL;
	for (int i = 0; i < 5; ++i)
	{
		Sleep(1000);
		MouseClick(hwnd, 265, 345);

		for (int j = 0; j < 5; ++j)
		{
			Sleep(1000);
			hwnd_friend = SearchHwndUnderThread(thread_id, L"添加群");
			if (hwnd_friend)
			{
				break;
			}
		}
		if (hwnd_friend)
		{
			break;
		}
	}
	if (!hwnd_friend)
	{
		return;
	}

	MouseClick(hwnd_friend, 165, 80);
	KeyCtrlC(ws2s(msg));
	KeyCtrlA(hwnd_friend);
	KeyCtrlV(hwnd_friend);
	KeyTab(hwnd_friend);
	KeyReturn(hwnd_friend);

	int nTryTimes = 5;
	while (IfHaveHwndUnderThread(thread_id, hwnd_friend) && nTryTimes-- > 0)
	{
		Sleep(1000);
		KeyReturn(hwnd_friend);
	}

	if (IfHaveHwndUnderThread(thread_id, hwnd_friend))
	{
		::SendMessage(hwnd_friend, WM_CLOSE, 0, 0);
	}
}

BOOL CALLBACK CDialogPageAdd::EnumThreadWndProc(HWND hwnd, LPARAM lParam)
{
	std::list<HWND>* pList = (std::list<HWND>*)lParam;
	pList->push_back(hwnd);
	return true;
}

BEGIN_MESSAGE_MAP(CDialogPageAdd, CDialogEx)
	ON_WM_CTLCOLOR()
	ON_BN_CLICKED(IDC_BUTTON_ADD, &CDialogPageAdd::OnBnClickedButtonAdd)
	ON_BN_CLICKED(IDC_BUTTON_IMPORT, &CDialogPageAdd::OnBnClickedButtonImport)
	ON_BN_CLICKED(IDC_BUTTON_MSG_ADD, &CDialogPageAdd::OnBnClickedButtonMsgAdd)
	ON_BN_CLICKED(IDC_BUTTON_MSG_DELETE, &CDialogPageAdd::OnBnClickedButtonMsgDelete)
	ON_BN_CLICKED(IDC_BUTTON_MSG_SAVE, &CDialogPageAdd::OnBnClickedButtonMsgSave)
	ON_BN_CLICKED(IDC_BUTTON_MSG_IMPORT, &CDialogPageAdd::OnBnClickedButtonMsgImport)
	ON_BN_CLICKED(IDC_BUTTON_MSG_EXPORT, &CDialogPageAdd::OnBnClickedButtonMsgExport)
	ON_NOTIFY(NM_CLICK, IDC_LIST_MSG, &CDialogPageAdd::OnNMClickListMsg)
END_MESSAGE_MAP()

void CDialogPageAdd::OnBnClickedButtonAdd()
{
	// 搜索查找窗口
#if 1
	std::vector<HWND> vecSearchHwnd;
	CWnd* pDesktopWnd = CWnd::GetDesktopWindow();
	CWnd* pWnd = pDesktopWnd->GetWindow(GW_CHILD);
	while (NULL != pWnd)
	{
		CString cstrWindowText;
		::GetWindowText(pWnd->GetSafeHwnd(), cstrWindowText.GetBuffer(256), 256);
		if (L"查找" == cstrWindowText)																							// 获取QQ顶层窗口
		{
			vecSearchHwnd.push_back(pWnd->GetSafeHwnd());
		}

		pWnd = pWnd->GetWindow(GW_HWNDNEXT);
	}
#else
	for (std::size_t i = 0; i < g_InfoGroup.size(); ++i)
	{
		g_InfoGroup[i].window_search = NULL;
		std::list<HWND> listThreadWnd;
		EnumThreadWindows(g_InfoGroup[i].threadid, EnumThreadWndProc, (LPARAM)&listThreadWnd);						// 获取主线程下所有窗口
		for (std::list<HWND>::iterator iter = listThreadWnd.begin(); iter != listThreadWnd.end(); ++iter)
		{
			std::wstring::size_type npos = std::wstring::npos;
			CString cstrWindowText;
			::GetWindowText(*iter, cstrWindowText.GetBuffer(256), 256);
			std::wstring wstrWindowText = cstrWindowText.GetBuffer();
			if (std::wstring::npos != (npos = wstrWindowText.find(L"查找")))
			{
				g_InfoGroup[i].window_search = *iter;
				break;
			}
		}
	}
#endif

	int nHwndCount = vecSearchHwnd.size();
	if (nHwndCount <= 0)
	{
		MessageBox(L"未搜索到任何\"查找\"窗口", L"提示", MB_OK);
		return;
	}

	int nMsgCount = m_listMsg.GetItemCount();
	if (nMsgCount <= 0)
	{
		MessageBox(L"请输入至少一条验证消息", L"提示", MB_OK);
		return;
	}
	
	int x = 0;
	int y = 0;
	if (0 == m_comboAdd.GetCurSel())
	{
		x = 35;
		y = 100;
	}
	else
	{
		x = 150;
		y = 105;
	}
	
	int nHwndIndex = 0;
	int nMsgIndex = 0;
	int nRowCount = m_listctlAdd.GetItemCount();
	if (0 == m_comboAdd.GetCurSel())
	{
		for (int nRowIndex = 0; nRowIndex < nRowCount; ++nRowIndex)
		{
			CString cstrAccount = m_listctlAdd.GetItemText(nRowIndex, 1);

			nMsgIndex = nRowIndex %  nMsgCount;
			CString cstrMsg = m_listMsg.GetItemText(nMsgIndex, 1);

			nHwndIndex =  nRowIndex % nHwndCount;
			BuddyAdd(vecSearchHwnd[nHwndIndex], cstrAccount.GetBuffer(), cstrMsg.GetBuffer());
		}
	}
	else
	{
		for (int nRowIndex = 0; nRowIndex < nRowCount; ++nRowIndex)
		{
			CString cstrAccount = m_listctlAdd.GetItemText(nRowIndex, 1);

			nMsgIndex = nRowIndex %  nMsgCount;
			CString cstrMsg = m_listMsg.GetItemText(nMsgIndex, 1);

			nHwndIndex =  nRowIndex % nHwndCount;
			GroupAdd(vecSearchHwnd[nHwndIndex], cstrAccount.GetBuffer(), cstrMsg.GetBuffer());
		}
	}
}

void CDialogPageAdd::OnBnClickedButtonImport()
{
	CFileDialog dlg(TRUE, _T("txt"), _T("test.txt"), OFN_HIDEREADONLY|OFN_OVERWRITEPROMPT|OFN_FILEMUSTEXIST, L"文本文件 (*.txt)|*.txt||", NULL);	//FALSE表示为“另存为”对话框，否则为“打开”对话框
	dlg.m_ofn.lpstrInitialDir = _T("C:\\Users\\Administrator\\Desktop\\"); //打开文件夹   
	if(IDOK == dlg.DoModal())
	{
		CString cstrFile = dlg.GetPathName();//获取完整路径

		std::string strContent;
		if (0 != ReadFile(cstrFile.GetBuffer(), strContent))
		{
			MessageBox(L"读取文件失败", L"提示", MB_OK);
			return;
		}
		
		m_listctlAdd.DeleteAllItems();
		std::size_t begin = 0;
		if (0 == strncmp(strContent.c_str(), "TYPE=0", 6))
		{
			begin = 1;
			m_comboAdd.SetCurSel(0);
		}
		else if(0 == strncmp(strContent.c_str(), "TYPE=1", 6))
		{
			begin = 1;
			m_comboAdd.SetCurSel(1);
		}
		else
		{
			m_comboAdd.SetCurSel(0);
		}

		std::vector<std::string> vecRows;
		Split(strContent, "\r\n", vecRows);
		for (std::size_t i = 0; begin < vecRows.size(); ++begin)
		{
			std::vector<std::string> vecFields;
			Split(vecRows[begin], "\t", vecFields);
			if (1 > vecFields.size())
			{
				continue;
			}
			
			CString tmp;
			tmp.Format(_T("%d"), i + 1);
			m_listctlAdd.InsertItem(i, tmp);
			m_listctlAdd.SetItemState(i, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
			m_listctlAdd.SetItemText(i, 1, Utf82Unicode(vecFields[0]).c_str());
			++i;
		}
	}
}

void CDialogPageAdd::OnBnClickedButtonMsgAdd()
{
	CString cstrContent;
	m_editMsg.GetWindowText(cstrContent);
	if (cstrContent.IsEmpty())
	{
		MessageBox(L"内容不能为空", L"提示", MB_OK);
		return;
	}

	int nRow = m_listMsg.GetItemCount();
	CString tmp;
	tmp.Format(_T("%d"), nRow + 1);
	m_listMsg.InsertItem(nRow, tmp);
	m_listMsg.SetItemState(nRow, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
	m_listMsg.SetItemText(nRow, 1, cstrContent.GetBuffer());

	m_editMsg.SetWindowText(L"");
}

void CDialogPageAdd::OnBnClickedButtonMsgDelete()
{
	// 删除多选项目
	POSITION pos = NULL;
	while (pos = m_listMsg.GetFirstSelectedItemPosition())
	{
		m_listMsg.DeleteItem(m_listMsg.GetNextSelectedItem(pos));
	}

	// 更新序号
	int nRow = m_listMsg.GetItemCount();
	for (int i = 0; i < nRow; ++i)
	{
		CString tmp;
		tmp.Format(_T("%d"), i + 1);
		m_listMsg.SetItemText(i, 0, tmp.GetBuffer());
	}
}

void CDialogPageAdd::OnBnClickedButtonMsgSave()
{
	CString cstrContent;
	m_editMsg.GetWindowText(cstrContent);
	if (cstrContent.IsEmpty())
	{
		MessageBox(L"内容不能为空", L"提示", MB_OK);
		return;
	}

	POSITION pos = m_listMsg.GetFirstSelectedItemPosition();
	while (pos)
	{
		m_listMsg.SetItemText(m_listMsg.GetNextSelectedItem(pos), 1, cstrContent.GetBuffer());
	}

	m_editMsg.SetWindowText(L"");
}

void CDialogPageAdd::OnBnClickedButtonMsgImport()
{
	CFileDialog dlg(TRUE, _T("txt"), _T("test.txt"), OFN_HIDEREADONLY|OFN_OVERWRITEPROMPT|OFN_FILEMUSTEXIST, L"文本文件 (*.txt)|*.txt||", NULL);	//FALSE表示为“另存为”对话框，否则为“打开”对话框
	dlg.m_ofn.lpstrInitialDir = _T("C:\\Users\\Administrator\\Desktop\\"); //打开文件夹   
	if(IDOK == dlg.DoModal())
	{
		CString cstrFile = dlg.GetPathName();//获取完整路径

		std::string strContent;
		if (0 != ReadFile(cstrFile.GetBuffer(), strContent))
		{
			MessageBox(L"读取文件失败", L"提示", MB_OK);
			return;
		}
		
		Json::Reader reader;
		Json::Value root;
		if (reader.parse(strContent, root))
		{
			Json::Value msg_list = root["msg_list"];
			if (Json::arrayValue != msg_list.type())
			{
				MessageBox(L"文件格式错误", L"提示", MB_OK);
				return;
			}

			for (int i = 0; i < msg_list.size(); ++i)
			{
				Json::Value msg = msg_list[i]["msg"];
				if (Json::stringValue != msg.type())
				{
					MessageBox(L"字段类型错误", L"提示", MB_OK);
				}

				int nRow = m_listMsg.GetItemCount();
				CString tmp;
				tmp.Format(_T("%d"), nRow + 1);
				m_listMsg.InsertItem(nRow, tmp);
				m_listMsg.SetItemState(nRow, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
				m_listMsg.SetItemText(nRow, 1, Utf82Unicode(msg.asString()).c_str());
			}
		}
	}
}

void CDialogPageAdd::OnBnClickedButtonMsgExport()
{
	CFileDialog dlg(FALSE, _T("txt"), _T("test.txt"), OFN_HIDEREADONLY|OFN_OVERWRITEPROMPT, L"文本文件 (*.txt)|*.txt||", NULL);	//FALSE表示为“另存为”对话框，否则为“打开”对话框
	dlg.m_ofn.lpstrInitialDir = _T("C:\\Users\\Administrator\\Desktop\\"); //打开文件夹   
	if(IDOK == dlg.DoModal())
	{
		CString cstrFile = dlg.GetPathName();//获取完整路径
		FILE* pFile = NULL;
		if (NULL == (pFile = _tfopen(cstrFile.GetBuffer(), L"wb")))
		{
			MessageBox(L"打开文件失败", L"提示", MB_OK);
			return;
		}

		Json::Value root;
		Json::Value msg_list;
		int nRow = m_listMsg.GetItemCount();
		for (int i = 0; i < nRow; ++i)
		{
			CString cstrContent;
			cstrContent = m_listMsg.GetItemText(i, 1);

			Json::Value msg;
			msg["msg"] = Unicode2Utf8(cstrContent.GetBuffer());
			msg_list.append(msg);
		}
		root["msg_list"] = msg_list;

		std::string strContent = root.toStyledString();
		if (1 != fwrite(strContent.c_str(), strContent.size(), 1, pFile))
		{
			MessageBox(L"写入文件不完整", L"提示", MB_OK);
		}
		fclose(pFile);
	}
}

void CDialogPageAdd::OnNMClickListMsg(NMHDR *pNMHDR, LRESULT *pResult)
{
	NMLISTVIEW* pNMListView = (NMLISTVIEW*)pNMHDR;
	int nItem = pNMListView->iItem;
	if (nItem >= 0 && nItem < m_listMsg.GetItemCount())
	{
		CString cstrContent;
		cstrContent = m_listMsg.GetItemText(nItem, 1);
		m_editMsg.SetWindowText(cstrContent);
	}
	else
	{
		CString cstrContent;
		cstrContent = m_listMsg.GetItemText(0, 1);
		m_editMsg.SetWindowText(cstrContent);
		m_listMsg.SetItemState(0, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
	}
	*pResult = 0;
}