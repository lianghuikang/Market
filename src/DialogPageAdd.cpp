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

void CDialogPageAdd::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

HBRUSH CDialogPageAdd::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageAdd, CDialogEx)
	ON_WM_CTLCOLOR()
END_MESSAGE_MAP()


// CDialogPageAdd ��Ϣ�������
