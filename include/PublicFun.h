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

int CollectBuddy();

int CollectGroup();

int GetCSRFToken(const std::string& e);

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