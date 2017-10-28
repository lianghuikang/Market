// DialogPageMass.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageMass.h"
#include "afxdialogex.h"
#include "PublicFun.h"
#include "jsoncpp/json.h"

// CDialogPageMass 对话框

IMPLEMENT_DYNAMIC(CDialogPageMass, CDialogEx)

CDialogPageMass::CDialogPageMass(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageMass::IDD, pParent)
{

}

CDialogPageMass::~CDialogPageMass()
{
}

BOOL CDialogPageMass::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// 群发对象
	m_comboMass.AddString(L"QQ好友");
	m_comboMass.AddString(L"群组");
	m_comboMass.AddString(L"群组成员");
	m_comboMass.SetCurSel(0);
	
	CRect rc;
	m_listMsg.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listMsg.SetExtendedStyle(m_listMsg.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listMsg.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listMsg.InsertColumn(1, _T("内容"), LVCFMT_LEFT, nWidth - 40);

	return TRUE;
}

void CDialogPageMass::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_MASS, m_comboMass);
	DDX_Control(pDX, IDC_LIST_MSG, m_listMsg);
	DDX_Control(pDX, IDC_EDIT_MSG, m_editMsg);
}

HBRUSH CDialogPageMass::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

void CDialogPageMass::MassForBuddy()
{
	std::vector<HWND> vecQQHwnd =  GetAllQQHwnd();
	for (std::size_t i = 0; i < vecQQHwnd.size(); ++i)
	{
		int NoWnd = 0;
		while (NoWnd < 10)
		{
			KeyDown(vecQQHwnd[i]);
			KeyReturn(vecQQHwnd[i]);
			Sleep(500);
			
			HWND topWnd = ::GetForegroundWindow();
			CString cstrWindowText;
			::GetWindowText(topWnd, cstrWindowText.GetBuffer(256), 256);
			CString cstrClassName;
			::GetClassName(topWnd, cstrClassName.GetBuffer(256), 256);
			if (L"TXGuiFoundation" == cstrClassName && L"QQ" != cstrWindowText)
			{
				KeyCtrlA(topWnd);
				KeyCtrlV(topWnd);
				KeyCtrlEnter(topWnd);
				//KeyReturn(topWnd);
				::SendMessage(topWnd, WM_CLOSE, 0, 0);
				Sleep(500);
				NoWnd = 0;
			}
			else
			{
				NoWnd++;
			}
		}
	}
}

void CDialogPageMass::MassForGroup()
{
}

void CDialogPageMass::MassForGroupMember()
{
}

BEGIN_MESSAGE_MAP(CDialogPageMass, CDialogEx)
	ON_WM_CTLCOLOR()
	ON_BN_CLICKED(IDC_BUTTON_MASS, &CDialogPageMass::OnBnClickedButtonMass)
	ON_BN_CLICKED(IDC_BUTTON_MSG_IMPORT, &CDialogPageMass::OnBnClickedButtonMsgImport)
	ON_BN_CLICKED(IDC_BUTTON_MSG_EXPORT, &CDialogPageMass::OnBnClickedButtonMsgExport)
	ON_BN_CLICKED(IDC_BUTTON_MSG_ADD, &CDialogPageMass::OnBnClickedButtonMsgAdd)
	ON_BN_CLICKED(IDC_BUTTON_MSG_DELETE, &CDialogPageMass::OnBnClickedButtonMsgDelete)
	ON_BN_CLICKED(IDC_BUTTON_MSG_SAVE, &CDialogPageMass::OnBnClickedButtonMsgMsgSave)
	ON_NOTIFY(NM_CLICK, IDC_LIST_MSG, &CDialogPageMass::OnNMClickListMsg)
END_MESSAGE_MAP()

void CDialogPageMass::OnBnClickedButtonMass()
{
	int nMass = m_comboMass.GetCurSel();
	if (0 == nMass)
	{
		MassForBuddy();
	}
	else if (1 == nMass)
	{
		MassForGroup();
	}
	else if (2 == nMass)
	{
		MassForGroupMember();
	}
	else
	{
	}
}

void CDialogPageMass::OnBnClickedButtonMsgImport()
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

void CDialogPageMass::OnBnClickedButtonMsgExport()
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

void CDialogPageMass::OnBnClickedButtonMsgAdd()
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

void CDialogPageMass::OnBnClickedButtonMsgDelete()
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

void CDialogPageMass::OnBnClickedButtonMsgMsgSave()
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

void CDialogPageMass::OnNMClickListMsg(NMHDR *pNMHDR, LRESULT *pResult)
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