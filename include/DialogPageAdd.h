#pragma once
#include "afxwin.h"
#include "afxcmn.h"
#include <string>

// CDialogAdd �Ի���

class CDialogPageAdd : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageAdd)

public:
	CDialogPageAdd(CWnd* pParent = NULL);   // ��׼���캯��
	virtual ~CDialogPageAdd();

// �Ի�������
	enum { IDD = IDD_PAGE_ADD };

protected:
	virtual BOOL OnInitDialog();
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);
	void BuddyAdd(HWND hwnd, const std::wstring& account, const std::wstring& msg);
	void GroupAdd(HWND hwnd, const std::wstring& account, const std::wstring& msg);
	static BOOL CALLBACK EnumThreadWndProc(HWND hwnd, LPARAM lParam);

	DECLARE_MESSAGE_MAP()
	CComboBox m_comboAdd;
	CListCtrl m_listctlAdd;
public:
	afx_msg void OnBnClickedButtonAdd();
	afx_msg void OnBnClickedButtonImport();
	afx_msg void OnBnClickedButtonMsgAdd();
	afx_msg void OnBnClickedButtonMsgDelete();
	afx_msg void OnBnClickedButtonMsgSave();
	afx_msg void OnBnClickedButtonMsgImport();
	afx_msg void OnBnClickedButtonMsgExport();
protected:
	CEdit m_editMsg;
	CListCtrl m_listMsg;
public:
	afx_msg void OnNMClickListMsg(NMHDR *pNMHDR, LRESULT *pResult);
};
