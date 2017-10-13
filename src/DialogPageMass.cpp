// DialogPageMass.cpp : ʵ���ļ�
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageMass.h"
#include "afxdialogex.h"


// CDialogPageMass �Ի���

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

	// Ⱥ������
	m_comboMass.AddString(L"QQ����");
	m_comboMass.AddString(L"Ⱥ��");
	m_comboMass.AddString(L"Ⱥ���Ա");
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