#pragma once
#include "afxwin.h"
#include "afxcmn.h"


// CDialogAdd 对话框

class CDialogPageAdd : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageAdd)

public:
	CDialogPageAdd(CWnd* pParent = NULL);   // 标准构造函数
	virtual ~CDialogPageAdd();

// 对话框数据
	enum { IDD = IDD_PAGE_ADD };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboAdd;
	CListCtrl m_listctlAdd;
public:
	afx_msg void OnBnClickedButtonAdd();
	afx_msg void OnBnClickedButtonImport();
};
