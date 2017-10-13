#pragma once

#include <string>
#include <vector>

enum E_STATUS_TYPE
{
	E_STATUS_NORMAL = 0,		// 正常
	E_STATUS_EXCEPTION			// 异常
};

class CInfoNode
{
public:
	CInfoNode() : windows(NULL), processid(-1), threadid(-1), status(E_STATUS_NORMAL) {};
	virtual ~CInfoNode() {};

public:
	std::wstring  number;			// QQ号码
	std::wstring  nickname;			// 昵称
	E_STATUS_TYPE status;			// 状态
	std::wstring  skey;				// skey
	HWND		  windows;			// 主窗口
	DWORD		  processid;		// 进程号
	DWORD		  threadid;			// 主线程号
};

typedef std::vector<CInfoNode> CInfoGroup;
typedef CInfoGroup::iterator   CInfoGroupIter;