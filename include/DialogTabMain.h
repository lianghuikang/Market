#pragma once

#include "DialogPageAccount.h"
#include "DialogPageAdd.h"
#include "DialogPageCollect.h"
#include "DialogPageMass.h"

// CDialogTabMain 对话框

class CDialogTabMain : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogTabMain)

public:
	CDialogTabMain(CWnd* pParent = NULL);   // 标准构造函数
	virtual ~CDialogTabMain();

// 对话框数据
	enum { IDD = IDD_TAB_MAIN };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	afx_msg void OnSize(UINT nType, int cx, int cy );
	afx_msg void OnTcnSelchangeTab(NMHDR *pNMHDR, LRESULT *pResult);

	DECLARE_MESSAGE_MAP()

protected:
	CTabCtrl m_tabctlTabMain;

	CDialogPageAccount m_dialogPageAccount;
	CDialogPageAdd m_dialogPageAdd;
	CDialogPageCollect m_dialogPageCollect;
	CDialogPageMass m_dialogPageMass;
};
