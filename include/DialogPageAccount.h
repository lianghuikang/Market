#pragma once


// CDialogAccount �Ի���

class CDialogPageAccount : public CDialogEx
{
	DECLARE_DYNAMIC(CDialogPageAccount)

public:
	CDialogPageAccount(CWnd* pParent = NULL);   // ��׼���캯��
	virtual ~CDialogPageAccount();

// �Ի�������
	enum { IDD = IDD_PAGE_ACCOUNT };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
};
