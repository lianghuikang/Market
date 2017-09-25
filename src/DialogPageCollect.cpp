// DialogPageCollect.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageCollect.h"
#include "afxdialogex.h"


// CDialogPageCollect 对话框

IMPLEMENT_DYNAMIC(CDialogPageCollect, CDialogEx)

CDialogPageCollect::CDialogPageCollect(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageCollect::IDD, pParent)
{

}

CDialogPageCollect::~CDialogPageCollect()
{
}

void CDialogPageCollect::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

HBRUSH CDialogPageCollect::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageCollect, CDialogEx)
	ON_WM_CTLCOLOR()
END_MESSAGE_MAP()


// CDialogPageCollect 消息处理程序
