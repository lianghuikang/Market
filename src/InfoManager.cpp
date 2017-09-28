#include "stdafx.h"
#include "InfoManager.h"

CInfoManager* CInfoManager::m_pInstance = NULL;

CInfoManager* CInfoManager::GetInstance()
{
	if (!m_pInstance)
	{
		m_pInstance = new CInfoManager();
	}
	return m_pInstance;
}

CInfoManager::CInfoManager()
{
}

CInfoManager::~CInfoManager()
{
}

CInfoGroup& CInfoManager::Get()
{
	return m_vecInfo;
}

int CInfoManager::Insert(CInfoNode& node)
{
	m_vecInfo.push_back(node);

	return 0;
}

void CInfoManager::Clear()
{
	m_vecInfo.clear();
}

int CInfoManager::Size()
{
	return m_vecInfo.size();
}