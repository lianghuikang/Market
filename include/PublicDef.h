#pragma once

#include <string>
#include <vector>

enum E_STATUS_TYPE
{
	E_STATUS_NORMAL = 0,		// ����
	E_STATUS_EXCEPTION			// �쳣
};

class CInfoNode
{
public:
	CInfoNode() : windows(NULL), processid(-1), threadid(-1), status(E_STATUS_NORMAL) {};
	virtual ~CInfoNode() {};

public:
	std::wstring  number;			// QQ����
	std::wstring  nickname;			// �ǳ�
	E_STATUS_TYPE status;			// ״̬
	std::wstring  skey;				// skey
	HWND		  windows;			// ������
	DWORD		  processid;		// ���̺�
	DWORD		  threadid;			// ���̺߳�
};

typedef std::vector<CInfoNode> CInfoGroup;
typedef CInfoGroup::iterator   CInfoGroupIter;