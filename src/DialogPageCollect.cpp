// DialogPageCollect.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageCollect.h"
#include "afxdialogex.h"
#include "PublicFun.h"
#include <string>

#define WM_REFRESH WM_USER + 1

// CDialogPageCollect 对话框

IMPLEMENT_DYNAMIC(CDialogPageCollect, CDialogEx)

CDialogPageCollect::CDialogPageCollect(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageCollect::IDD, pParent)
{

}

CDialogPageCollect::~CDialogPageCollect()
{
}

BOOL CDialogPageCollect::OnInitDialog()
{
	CDialogEx::OnInitDialog();
	
	// 采集对象
	m_comboCollect.AddString(L"QQ号");
	m_comboCollect.AddString(L"QQ群");
	m_comboCollect.SetCurSel(0);
	
	// 采集数量
	m_editCollectNum.SetWindowText(L"500");
	
	// 采集列表
	CRect rc;
	m_listctlCollect.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listctlCollect.SetExtendedStyle(m_listctlCollect.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listctlCollect.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listctlCollect.InsertColumn(1, _T("账号"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(2, _T("昵称"), LVCFMT_LEFT, nWidth - 120);

	return TRUE;
}

void CDialogPageCollect::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_COLLECT, m_comboCollect);
	DDX_Control(pDX, IDC_EDIT_COLLECT_NUM, m_editCollectNum);
	DDX_Control(pDX, IDC_LIST_COLLECT, m_listctlCollect);
}

HBRUSH CDialogPageCollect::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageCollect, CDialogEx)
	ON_WM_CTLCOLOR()
	ON_MESSAGE(WM_REFRESH, OnRefresh)
	ON_BN_CLICKED(IDC_BUTTON_COLLECT, &CDialogPageCollect::OnBnClickedButtonCollect)
	ON_BN_CLICKED(IDC_BUTTON_EXPORT, &CDialogPageCollect::OnBnClickedButtonExport)
END_MESSAGE_MAP()


// CDialogPageCollect 消息处理程序

LRESULT CDialogPageCollect::OnRefresh(WPARAM wParam, LPARAM lParam)
{
	m_listctlCollect.DeleteAllItems();
	for (int i = 0; i < 100; ++i)
	{
		CString tmp;
		tmp.Format(_T("%d"), i + 1);
		m_listctlCollect.InsertItem(i, tmp);
		m_listctlCollect.SetItemState(i, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
		m_listctlCollect.SetItemText(i, 1, tmp);
		m_listctlCollect.SetItemText(i, 2, tmp);
		m_listctlCollect.SetItemText(i, 3, tmp);
	}

	return 0;
}

void CDialogPageCollect::OnBnClickedButtonCollect()
{
	int nIndex = m_comboCollect.GetCurSel();
	switch (nIndex)
	{
	case 0:
		CollectGroup();
		//CollectBuddy();
		break;
	case 1:
		CollectGroup();
		break;
	default:
		return;
	}



	CString num;
	m_editCollectNum.GetWindowText(num);

	this->SendMessage(WM_REFRESH, NULL, NULL);
}

void CDialogPageCollect::OnBnClickedButtonExport()
{
	CFileDialog dlg(FALSE, _T("txt"), _T("test.txt"), OFN_HIDEREADONLY|OFN_OVERWRITEPROMPT, L"文本文件 (*.txt)|*.txt||", NULL);	//FALSE表示为“另存为”对话框，否则为“打开”对话框
	dlg.m_ofn.lpstrInitialDir = _T("c:\\"); //打开文件夹   
	if(IDOK == dlg.DoModal())
	{
		CString strFile = dlg.GetPathName();//获取完整路径
	}
}