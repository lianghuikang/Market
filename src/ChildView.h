
// ChildView.h : CChildView ��Ľӿ�
//


#pragma once

#include "DialogTabMain.h"

// CChildView ����

class CChildView : public CWnd
{
// ����
public:
	CChildView();

// ����
public:
	CDialogTabMain m_dialogTabMain;

// ����
public:

// ��д
protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// ʵ��
public:
	virtual ~CChildView();

	// ���ɵ���Ϣӳ�亯��
protected:
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
	afx_msg void OnPaint();
	afx_msg void OnSize(UINT nType, int cx, int cy );
	DECLARE_MESSAGE_MAP()
};

