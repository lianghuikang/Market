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

size_t write_fun_file(void *data, size_t size, size_t nmember, FILE* save);

size_t write_fun_string(void *data, size_t size, size_t nmember, std::string* save);

DWORD WINAPI ThreadProc_CaptureCookies(LPVOID lpParam);

void packet_handler(u_char *param, const struct pcap_pkthdr *header, const u_char *pkt_data);

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