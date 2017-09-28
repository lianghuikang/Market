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
	HWND		 windows;			// ������
	DWORD		 processid;			// ���̺�
	DWORD		 threadid;			// ���̺߳�
};

typedef std::vector<CInfoNode> CInfoGroup;
typedef CInfoGroup::iterator   CInfoGroupIter;

class CInfoManager
{
public:
	static CInfoManager* GetInstance();

	CInfoGroup& Get();

	int Insert(CInfoNode& node);

	void Clear();

	int Size();

private:
	CInfoManager();

	virtual ~CInfoManager();

private:
	static CInfoManager* m_pInstance;
	CInfoGroup m_vecInfo;
};