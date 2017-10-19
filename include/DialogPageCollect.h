#pragma once
#include "afxwin.h"
#include "afxcmn.h"
#include <string>
#include <vector>

// CDialogPageCollect �Ի���

class CDialogPageCollect : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageCollect)

public:
	CDialogPageCollect(CWnd* pParent = NULL);   // ��׼���캯��
	virtual ~CDialogPageCollect();

// �Ի�������
	enum { IDD = IDD_PAGE_COLLECT };

protected:
	int InitCity();
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboCollect;
	CEdit m_editCollectNum;
	CListCtrl m_listctlCollect;
public:
	afx_msg LRESULT OnRefresh(WPARAM wParam, LPARAM lParam);
	afx_msg void OnBnClickedButtonCollect();
	afx_msg void OnBnClickedButtonExport();
	afx_msg void OnCbnSelchangeComboCityl1();
protected:
	CComboBox m_comboCityL1;
	CComboBox m_comboCityL2;
	CEdit m_editCollectKeyword;
};
