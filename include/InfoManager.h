#pragma once

#include <string>
#include <vector>
#include <PublicDef.h>

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