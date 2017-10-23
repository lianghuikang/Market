// CDialogPageAdd.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAdd.h"
#include "afxdialogex.h"
#include "PublicFun.h"

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
}

void CDialogPageAdd::OnBnClickedButtonMsgImport()
{
}

void CDialogPageAdd::OnBnClickedButtonMsgExport()
{
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