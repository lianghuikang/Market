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

void CDialogPageMass::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

HBRUSH CDialogPageMass::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageMass, CDialogEx)
	ON_WM_CTLCOLOR()
END_MESSAGE_MAP()


// CDialogPageMass ��Ϣ�������
