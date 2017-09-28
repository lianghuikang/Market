#pragma once
#include "afxcmn.h"
#include "afxeditbrowsectrl.h"


// CDialogAccount 对话框

class CDialogPageAccount : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageAccount)

public:
	CDialogPageAccount(CWnd* pParent = NULL);   // 标准构造函数
	virtual ~CDialogPageAccount();

// 对话框数据
	enum { IDD = IDD_PAGE_ACCOUNT };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	static BOOL CALLBACK EnumThreadWndProc(HWND hwnd, LPARAM lParam);

	DECLARE_MESSAGE_MAP()
	CListCtrl m_listctlAccount;
public:
	afx_msg void OnBnClickedButtonStartup();
protected:
	CMFCEditBrowseCtrl m_mfceditbrowserQqDir;
public:
	afx_msg void OnBnClickedButtonDetect();
};
