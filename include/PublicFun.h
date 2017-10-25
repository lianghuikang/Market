#pragma once

#include "PublicDef.h"
#include "pcap.h"
#include <sstream>

#define WM_ACCOUNT_REFRESH WM_USER + 1
#define WM_COLLECT_REFRESH WM_USER + 2

#define JV_STRING(node, value) (Json::stringValue == node.type()? node.asString() : value)
#define JV_INT(node, value) (Json::intValue == node.type() || Json::uintValue == node.type() ||Json::realValue == node.type()? DoubleToString(node.asDouble()) : value)

template<typename T>
std::string TransToString(T src)
{
	std::ostringstream oss;
	oss << src;
	return oss.str();
}

class CBuddyInfo
{
public:
	std::string Code;
	std::string Nickname;
	std::string Sex;
	std::string Age;
	std::string Location;
	std::string Stat;
};

class CGroupInfo
{
public:
	std::string CertificateName;
	std::string CertificateType;
	std::string CityID;
	std::string Code;
	std::string Gcate;
	std::string Gid;
	std::string GroupLabel;
	std::string Latitude;
	std::string Level;
	std::string Longitude;
	std::string MaxMemberNum;
	std::string MemberNum;
	std::string Name;
	std::string OwnerUin;
	std::string Gaddr;
	std::string RichFingerMemo;
	std::string Url;
};

class CLeaf
{
public:
	std::string name;
	std::string code;
};

class CNonLeaf : public CLeaf
{
public:
	std::vector<CNonLeaf> child;
};

class CCityL2
{
public:
	CCityL2(std::string _id, std::string _name) : id(_id), name(_name) {};
	std::string id;
	std::string name;
};

class CCityL1
{
public:
	std::string name;
	std::vector<CCityL2> CityL2;
};

typedef struct _PARAM_BUDDY
{
	std::string keyword;			// 关键字
	std::string age;				// 年龄
	std::string sex;				// 性别
	std::string firston;			// 在线
	std::string video;				// 摄像头
	std::string online;
	std::string country;			// 所在地 country
	std::string province;			// 所在地 province
	std::string city;				// 所在地 city
	std::string district;			// 所在地 district
	std::string hcountry;			// 故乡 hcountry
	std::string hprovince;			// 故乡 hprovince
	std::string hcity;				// 故乡 hcity
	std::string hdistrict;			// 故乡 hdistrict
}PARAM_BUDDY;

void MouseClick(HWND hwnd, DWORD x, DWORD y);

void KeyReturn(HWND hwnd);

void KeyTab(HWND hwnd);

void KeyCtrlA(HWND hwnd);

void KeyCtrlC(const std::string& src);

void KeyCtrlV(HWND hwnd);

HWND SearchHwndUnderThread(int thread_id, const wchar_t* title, bool fuzzy = true);

HWND SearchHwndUnderDesktop(const wchar_t* title, bool fuzzy = true);

bool IfHaveHwndUnderThread(int thread_id, const HWND const hwnd);

static BOOL CALLBACK EnumThreadWndProc(HWND hwnd, LPARAM lParam);

char dec2hexChar(short int n);

short int hexChar2dec(char c);

std::string escapeURL(const std::string &URL);

std::string deescapeURL(const std::string &URL);

std::string DoubleToString(double src);

std::string ws2s(const std::wstring& ws);

std::wstring s2ws(const std::string& s);

int NetDevSize(pcap_if_t* pAllDev);

int CaptureCookies();

std::string CaptureNickname(const std::string& qq_number);

int CheckStatus(CInfoNode& node);

std::wstring StatusAsWString(E_STATUS_TYPE status);

std::wstring Utf82Unicode(const std::string& utf8string);

std::string Unicode2Utf8(const std::wstring& widestring);

size_t write_fun_file(void *data, size_t size, size_t nmember, FILE* save);

size_t write_fun_string(void *data, size_t size, size_t nmember, std::string* save);

DWORD WINAPI ThreadProc_CaptureCookies(LPVOID lpParam);

void packet_handler(u_char *param, const struct pcap_pkthdr *header, const u_char *pkt_data);

int CollectBuddy(std::vector<CBuddyInfo>& buddy_all, const PARAM_BUDDY& param);

int CollectGroup(std::vector<CGroupInfo>& group_all, int city_l1, int city_l2, const std::string& keyword);

int CollectBuddyEvery(std::vector<CBuddyInfo>& buddy_all, const PARAM_BUDDY& param);

int CollectGroupEvery(std::vector<CGroupInfo>& group_all, int cityid, const std::string& keyword);

int GetCSRFToken(const std::string& e);

std::wstring GetRunPathW();

int ReadFile(const std::wstring& strPath, std::string& strCont);

void Split(const std::string& src, const char* sep, std::vector<std::string>& res);

int Ymd2Age(int year, int month, int day);

/* Ethernet 首部 */
typedef struct ether_header{
	u_int8_t ether_dhost[6];		// 目的ether地址
	u_int8_t ether_shost[6];		// 源ether地址
	u_int16_t ether_type;			// 类型
}ether_header;

/* 4字节的IP地址 */
typedef struct ip_address{
    u_char byte1;
    u_char byte2;
    u_char byte3;
    u_char byte4;
}ip_address;

/* IPv4 首部 */
typedef struct ip_header{
    u_char  ver_ihl;        // 版本 (4 bits) + 首部长度 (4 bits)
    u_char  tos;            // 服务类型(Type of service) 
    u_short tlen;           // 总长(Total length) 
    u_short identification; // 标识(Identification)
    u_short flags_fo;       // 标志位(Flags) (3 bits) + 段偏移量(Fragment offset) (13 bits)
    u_char  ttl;            // 存活时间(Time to live)
    u_char  proto;          // 协议(Protocol)
    u_short crc;            // 首部校验和(Header checksum)
    ip_address  saddr;      // 源地址(Source address)
    ip_address  daddr;      // 目的地址(Destination address)
    u_int   op_pad;         // 选项与填充(Option + Padding)
}ip_header;

/*TCP Header*/
struct tcp_header
{
    u_int16_t th_sport;         /* source port */
    u_int16_t th_dport;         /* destination port */
    u_int32_t th_seq;             /* sequence number */
    u_int32_t th_ack;             /* acknowledgement number */
    u_int16_t th_len_resv_code; //   Datagram   length and reserved code
    u_int16_t th_win;           /* window */
    u_int16_t th_sum;           /* checksum */
    u_int16_t th_urp;           /* urgent pointer */
};

/* UDP 首部*/
typedef struct udp_header{
    u_short sport;          // 源端口(Source port)
    u_short dport;          // 目的端口(Destination port)
    u_short len;            // UDP数据包长度(Datagram length)
    u_short crc;            // 校验和(Checksum)
}udp_header;