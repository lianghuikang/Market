#pragma once


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
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
};
