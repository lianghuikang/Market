// DialogTabMain.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogTabMain.h"
#include "afxdialogex.h"


// CDialogTabMain 对话框

IMPLEMENT_DYNAMIC(CDialogTabMain, CDialogEx)

CDialogTabMain::CDialogTabMain(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogTabMain::IDD, pParent)
{

}

CDialogTabMain::~CDialogTabMain()
{
}

BOOL CDialogTabMain::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	m_tabctlTabMain.InsertItem(0, L"帐号");
	m_tabctlTabMain.InsertItem(1, L"自动采集");
	m_tabctlTabMain.InsertItem(2, L"自动添加");
	m_tabctlTabMain.InsertItem(3, L"自动群发");

	m_dialogPageAccount.Create(IDD_PAGE_ACCOUNT, &m_tabctlTabMain);
	m_dialogPageAdd.Create(IDD_PAGE_ADD, &m_tabctlTabMain);
	m_dialogPageCollect.Create(IDD_PAGE_COLLECT, &m_tabctlTabMain);
	m_dialogPageMass.Create(IDD_PAGE_MASS, &m_tabctlTabMain);

	m_dialogPageAccount.ShowWindow(SW_SHOW);
	m_dialogPageAdd.ShowWindow(SW_HIDE);
	m_dialogPageCollect.ShowWindow(SW_HIDE);
	m_dialogPageMass.ShowWindow(SW_HIDE);

	m_tabctlTabMain.SetCurSel(0);

	return TRUE;
}

void CDialogTabMain::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_TAB_MAIN, m_tabctlTabMain);
}

void CDialogTabMain::OnSize(UINT nType, int cx, int cy )
{
	CRect rc;
	GetClientRect(rc);
	
	if (m_tabctlTabMain.GetSafeHwnd())
	{
		rc.right += 2;
		m_tabctlTabMain.MoveWindow(rc);

		CRect rcTabItem;
		m_tabctlTabMain.GetItemRect(0, rcTabItem);
		rc.top = rcTabItem.Height() + 4;
		rc.left += 2;
		rc.bottom -= 4;
		rc.right -= 4;

		m_dialogPageAccount.MoveWindow(rc);
		m_dialogPageAdd.MoveWindow(rc);
		m_dialogPageCollect.MoveWindow(rc);
		m_dialogPageMass.MoveWindow(rc);
	}
}

void CDialogTabMain::OnTcnSelchangeTab(NMHDR *pNMHDR, LRESULT *pResult)
{
	int nCurSel = m_tabctlTabMain.GetCurSel();
	switch (nCurSel)
	{
	case 0:
		m_dialogPageAccount.ShowWindow(SW_SHOW);
		m_dialogPageAdd.ShowWindow(SW_HIDE);
		m_dialogPageCollect.ShowWindow(SW_HIDE);
		m_dialogPageMass.ShowWindow(SW_HIDE);
		m_dialogPageAccount.SetFocus();
		break;
	case 1:
		m_dialogPageAccount.ShowWindow(SW_HIDE);
		m_dialogPageAdd.ShowWindow(SW_HIDE);
		m_dialogPageCollect.ShowWindow(SW_SHOW);
		m_dialogPageMass.ShowWindow(SW_HIDE);
		m_dialogPageCollect.SetFocus();
		break;
	case 2:
		m_dialogPageAccount.ShowWindow(SW_HIDE);
		m_dialogPageAdd.ShowWindow(SW_SHOW);
		m_dialogPageCollect.ShowWindow(SW_HIDE);
		m_dialogPageMass.ShowWindow(SW_HIDE);
		m_dialogPageAdd.SetFocus();
		break;
	case 3:
		m_dialogPageAccount.ShowWindow(SW_HIDE);
		m_dialogPageAdd.ShowWindow(SW_HIDE);
		m_dialogPageCollect.ShowWindow(SW_HIDE);
		m_dialogPageMass.ShowWindow(SW_SHOW);
		m_dialogPageMass.SetFocus();
		break;
	default:;
	}
	*pResult = 0;
}

BEGIN_MESSAGE_MAP(CDialogTabMain, CDialogEx)
	ON_WM_SIZE()
	ON_NOTIFY(TCN_SELCHANGE, IDC_TAB_MAIN, &CDialogTabMain::OnTcnSelchangeTab)
END_MESSAGE_MAP()


// CDialogTabMain 消息处理程序
