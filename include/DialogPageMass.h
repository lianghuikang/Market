#pragma once


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
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
};
