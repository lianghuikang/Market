#pragma once


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
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
};
