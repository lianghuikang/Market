#pragma once

#include "DialogPageAccount.h"
#include "DialogPageAdd.h"
#include "DialogPageCollect.h"
#include "DialogPageMass.h"

// CDialogTabMain �Ի���

class CDialogTabMain : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogTabMain)

public:
	CDialogTabMain(CWnd* pParent = NULL);   // ��׼���캯��
	virtual ~CDialogTabMain();

// �Ի�������
	enum { IDD = IDD_TAB_MAIN };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
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
