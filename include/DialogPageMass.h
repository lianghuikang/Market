#pragma once
#include "afxwin.h"
#include "afxcmn.h"


// CDialogPageMass �Ի���

class CDialogPageMass : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageMass)

public:
	CDialogPageMass(CWnd* pParent = NULL);   // ��׼���캯��
	virtual ~CDialogPageMass();

// �Ի�������
	enum { IDD = IDD_PAGE_MASS };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	void MassForBuddy();
	void MassForGroup();
	void MassForGroupMember();

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboMass;
public:
	afx_msg void OnBnClickedButtonMass();
	afx_msg void OnBnClickedButtonMsgImport();
	afx_msg void OnBnClickedButtonMsgExport();
	afx_msg void OnBnClickedButtonMsgAdd();
	afx_msg void OnBnClickedButtonMsgDelete();
	afx_msg void OnBnClickedButtonMsgMsgSave();
protected:
	CListCtrl m_listMsg;
	CEdit m_editMsg;
public:
	afx_msg void OnNMClickListMsg(NMHDR *pNMHDR, LRESULT *pResult);
};
