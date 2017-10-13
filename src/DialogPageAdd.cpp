// CDialogPageAdd.cpp : ʵ���ļ�
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAdd.h"
#include "afxdialogex.h"


// CDialogPageAdd �Ի���

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
	
	// ��Ӷ���
	m_comboAdd.AddString(L"QQ��");
	m_comboAdd.AddString(L"QQȺ");
	m_comboAdd.SetCurSel(0);

	// ����б�
	CRect rc;
	m_listctlAdd.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listctlAdd.SetExtendedStyle(m_listctlAdd.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listctlAdd.InsertColumn(0, _T("���"), LVCFMT_LEFT, 40);
	m_listctlAdd.InsertColumn(1, _T("�˺�"), LVCFMT_LEFT, 80);
	m_listctlAdd.InsertColumn(2, _T("�ǳ�"), LVCFMT_LEFT, nWidth - 120);

	return TRUE;
}

void CDialogPageAdd::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_ADD, m_comboAdd);
	DDX_Control(pDX, IDC_LIST_ADD, m_listctlAdd);
}

HBRUSH CDialogPageAdd::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageAdd, CDialogEx)
	ON_WM_CTLCOLOR()
	ON_BN_CLICKED(IDC_BUTTON_ADD, &CDialogPageAdd::OnBnClickedButtonAdd)
	ON_BN_CLICKED(IDC_BUTTON_IMPORT, &CDialogPageAdd::OnBnClickedButtonImport)
END_MESSAGE_MAP()

void CDialogPageAdd::OnBnClickedButtonAdd()
{
}

void CDialogPageAdd::OnBnClickedButtonImport()
{
	CFileDialog dlg(TRUE, _T("txt"), _T("test.txt"), OFN_HIDEREADONLY|OFN_OVERWRITEPROMPT|OFN_FILEMUSTEXIST, L"�ı��ļ� (*.txt)|*.txt||", NULL);	//FALSE��ʾΪ�����Ϊ���Ի��򣬷���Ϊ���򿪡��Ի���
	dlg.m_ofn.lpstrInitialDir = _T("c:\\"); //���ļ���   
	if(IDOK == dlg.DoModal())
	{
		CString strFile = dlg.GetPathName();//��ȡ����·��
	}
}