#pragma once


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
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

	DECLARE_MESSAGE_MAP()
};
