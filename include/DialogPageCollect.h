#pragma once
#include "afxwin.h"
#include "afxcmn.h"
#include <string>
#include <vector>
#include "PublicFun.h"

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
	int InitBuddyCtrl();
	int InitGroupCtrl();
	int ResetAllCtrl();
	int ClearCollectList();
	CNonLeaf UnlimitNonLeaf(int level);
	std::string EscapeSex(int index);
	std::string EscapeAge(int index);
	int InitLocation();
	int InitCity();
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboCollect;
	CListCtrl m_listctlCollect;
public:
	afx_msg LRESULT OnRefresh(WPARAM wParam, LPARAM lParam);
	afx_msg void OnBnClickedButtonCollect();
	afx_msg void OnBnClickedButtonExport();
	afx_msg void OnCbnSelchangeComboCollect();
	afx_msg void OnCbnSelchangeComboCountry();
	afx_msg void OnCbnSelchangeComboProvince();
	afx_msg void OnCbnSelchangeComboCity();
	afx_msg void OnCbnSelchangeComboHcountry();
	afx_msg void OnCbnSelchangeComboHprovince();
	afx_msg void OnCbnSelchangeComboHcity();
	afx_msg void OnCbnSelchangeComboCityl1();
protected:
	CComboBox m_comboCityL1;
	CComboBox m_comboCityL2;
	CEdit m_editCollectKeyword;
	CComboBox m_comboCountry;
	CComboBox m_comboProvince;
	CComboBox m_comboCity;
	CComboBox m_comboDistrict;
	CComboBox m_comboHcountry;
	CComboBox m_comboHprovince;
	CComboBox m_comboHcity;
	CComboBox m_comboHdistrict;
	CComboBox m_comboCollectSex;
	CComboBox m_comboCollectAge;
	CButton m_checkCollectOnline;
	CButton m_checkCollectVideo;
};
