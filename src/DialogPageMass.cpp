// DialogPageMass.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageMass.h"
#include "afxdialogex.h"


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

	return TRUE;
}

void CDialogPageMass::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_MASS, m_comboMass);
}

HBRUSH CDialogPageMass::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageMass, CDialogEx)
	ON_WM_CTLCOLOR()
	ON_BN_CLICKED(IDC_BUTTON_MASS, &CDialogPageMass::OnBnClickedButtonMass)
END_MESSAGE_MAP()

void CDialogPageMass::OnBnClickedButtonMass()
{
}