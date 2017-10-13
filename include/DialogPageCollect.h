#pragma once
#include "afxwin.h"
#include "afxcmn.h"


// CDialogPageCollect 对话框

class CDialogPageCollect : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageCollect)

public:
	CDialogPageCollect(CWnd* pParent = NULL);   // 标准构造函数
	virtual ~CDialogPageCollect();

// 对话框数据
	enum { IDD = IDD_PAGE_COLLECT };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboCollect;
	CEdit m_editCollectNum;
	CListCtrl m_listctlCollect;
public:
	afx_msg LRESULT OnRefresh(WPARAM wParam, LPARAM lParam);
	afx_msg void OnBnClickedButtonCollect();
	afx_msg void OnBnClickedButtonExport();
};
