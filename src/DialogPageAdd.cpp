// CDialogPageAdd.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAdd.h"
#include "afxdialogex.h"


// CDialogPageAdd 对话框

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


// CDialogPageAdd 消息处理程序
