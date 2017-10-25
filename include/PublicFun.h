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
	std::string keyword;			// �ؼ���
	std::string age;				// ����
	std::string sex;				// �Ա�
	std::string firston;			// ����
	std::string video;				// ����ͷ
	std::string online;
	std::string country;			// ���ڵ� country
	std::string province;			// ���ڵ� province
	std::string city;				// ���ڵ� city
	std::string district;			// ���ڵ� district
	std::string hcountry;			// ���� hcountry
	std::string hprovince;			// ���� hprovince
	std::string hcity;				// ���� hcity
	std::string hdistrict;			// ���� hdistrict
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

/* Ethernet �ײ� */
typedef struct ether_header{
	u_int8_t ether_dhost[6];		// Ŀ��ether��ַ
	u_int8_t ether_shost[6];		// Դether��ַ
	u_int16_t ether_type;			// ����
}ether_header;

/* 4�ֽڵ�IP��ַ */
typedef struct ip_address{
    u_char byte1;
    u_char byte2;
    u_char byte3;
    u_char byte4;
}ip_address;

/* IPv4 �ײ� */
typedef struct ip_header{
    u_char  ver_ihl;        // �汾 (4 bits) + �ײ����� (4 bits)
    u_char  tos;            // ��������(Type of service) 
    u_short tlen;           // �ܳ�(Total length) 
    u_short identification; // ��ʶ(Identification)
    u_short flags_fo;       // ��־λ(Flags) (3 bits) + ��ƫ����(Fragment offset) (13 bits)
    u_char  ttl;            // ���ʱ��(Time to live)
    u_char  proto;          // Э��(Protocol)
    u_short crc;            // �ײ�У���(Header checksum)
    ip_address  saddr;      // Դ��ַ(Source address)
    ip_address  daddr;      // Ŀ�ĵ�ַ(Destination address)
    u_int   op_pad;         // ѡ�������(Option + Padding)
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

/* UDP �ײ�*/
typedef struct udp_header{
    u_short sport;          // Դ�˿�(Source port)
    u_short dport;          // Ŀ�Ķ˿�(Destination port)
    u_short len;            // UDP���ݰ�����(Datagram length)
    u_short crc;            // У���(Checksum)
}udp_header;