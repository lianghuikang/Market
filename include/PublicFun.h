#pragma once

#include "PublicDef.h"
#include "pcap.h"
#include <sstream>

template<typename T>
std::string TransToString(T src)
{
	std::ostringstream oss;
	oss << src;
	return oss.str();
}

int NetDevSize(pcap_if_t* pAllDev);

int CaptureCookies();

DWORD WINAPI ThreadProc_CaptureCookies(LPVOID lpParam);