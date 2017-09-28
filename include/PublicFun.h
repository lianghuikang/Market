#pragma once

#include <sstream>
#include <PublicDef.h>

template<typename T>
std::string TransToString(T src)
{
	std::ostringstream oss;
	oss << src;
	return oss.str();
}