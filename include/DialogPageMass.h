#pragma once
#include "afxwin.h"


// CDialogPageMass 对话框

class CDialogPageMass : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageMass)

public:
	CDialogPageMass(CWnd* pParent = NULL);   // 标准构造函数
	virtual ~CDialogPageMass();

// 对话框数据
	enum { IDD = IDD_PAGE_MASS };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboMass;
public:
	afx_msg void OnBnClickedButtonMass();
};
