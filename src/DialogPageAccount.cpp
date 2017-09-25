// CDialogPageAccount.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageAccount.h"
#include "afxdialogex.h"


// CDialogPageAccount 对话框

IMPLEMENT_DYNAMIC(CDialogPageAccount, CDialogEx)

CDialogPageAccount::CDialogPageAccount(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageAccount::IDD, pParent)
{

}

CDialogPageAccount::~CDialogPageAccount()
{
}

void CDialogPageAccount::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

HBRUSH CDialogPageAccount::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageAccount, CDialogEx)
	ON_WM_CTLCOLOR()
END_MESSAGE_MAP()


// CDialogPageAccount 消息处理程序
