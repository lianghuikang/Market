#pragma once

#include <string>
#include <vector>

class CInfoNode
{
public:
	CInfoNode() : windows(NULL), processid(-1), threadid(-1) {};
	virtual ~CInfoNode() {};

public:
	std::wstring number;			// QQ����
	std::wstring nickname;			// �ǳ�
	std::wstring status;			// ״̬
	std::wstring skey;				// skey
	HWND		 windows;			// ������
	DWORD		 processid;			// ���̺�
	DWORD		 threadid;			// ���̺߳�
};

typedef std::vector<CInfoNode> CInfoGroup;
typedef CInfoGroup::iterator   CInfoGroupIter;