// DialogPageCollect.cpp : 实现文件
//

#include "stdafx.h"
#include "Market.h"
#include "DialogPageCollect.h"
#include "afxdialogex.h"
#include "PublicFun.h"
#include "pugixml/pugixml.hpp"
#include <string>

// CDialogPageCollect 对话框

IMPLEMENT_DYNAMIC(CDialogPageCollect, CDialogEx)

extern std::vector<CCityL1> g_Citys;

CDialogPageCollect::CDialogPageCollect(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageCollect::IDD, pParent)
{

}

CDialogPageCollect::~CDialogPageCollect()
{
}

int CDialogPageCollect::InitCity()
{
	pugi::xml_document doc;
	std::wstring strCityCfg = GetRunPathW() + L"city.xml";
	if (pugi::xml_parse_status::status_ok != doc.load_file(strCityCfg.c_str()).status)
	{
		return -1;
	}
	
	CCityL1 CityL1;
	CityL1.name = Unicode2Utf8(L"全国");
	CityL1.CityL2.push_back(CCityL2("0", ""));
	g_Citys.push_back(CityL1);

	for (pugi::xml_node pL1 = doc.child("CITY").first_child(); pL1; pL1 = pL1.next_sibling())
	{
		CCityL1 CityL1;
		CityL1.name = pL1.attribute("value").value();
		CityL1.CityL2.push_back(CCityL2(pL1.attribute("id").value(), Unicode2Utf8(L"所有")));

		for (pugi::xml_node pL2 = pL1.first_child(); pL2; pL2 = pL2.next_sibling())
		{
			CityL1.CityL2.push_back(CCityL2(pL2.attribute("id").value(), pL2.attribute("value").value()));
		}

		g_Citys.push_back(CityL1);
	}

	return 0;
}

BOOL CDialogPageCollect::OnInitDialog()
{
	CDialogEx::OnInitDialog();
	
	// 采集对象
	m_comboCollect.AddString(L"QQ号");
	m_comboCollect.AddString(L"QQ群");
	m_comboCollect.SetCurSel(0);
	
	// 采集数量
	m_editCollectNum.SetWindowText(L"500");
	
	// 采集列表
	CRect rc;
	m_listctlCollect.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listctlCollect.SetExtendedStyle(m_listctlCollect.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listctlCollect.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listctlCollect.InsertColumn(1, _T("群账号"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(2, _T("群名称"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(3, _T("群标签"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(4, _T("群主账号"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(5, _T("当前成员数"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(6, _T("最大成员数"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(7, _T("地址"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(8, _T("群认证"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(9, _T("群介绍"), LVCFMT_LEFT, 80);
	
	InitCity();
	for (int i = 0; i < g_Citys.size(); ++i)
	{
		m_comboCityL1.AddString(Utf82Unicode(g_Citys[i].name).c_str());
	}
	m_comboCityL1.SetCurSel(0);
	m_comboCityL2.EnableWindow(FALSE);


	return TRUE;
}

void CDialogPageCollect::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_COLLECT, m_comboCollect);
	DDX_Control(pDX, IDC_EDIT_COLLECT_NUM, m_editCollectNum);
	DDX_Control(pDX, IDC_LIST_COLLECT, m_listctlCollect);
	DDX_Control(pDX, IDC_COMBO_CITYL1, m_comboCityL1);
	DDX_Control(pDX, IDC_COMBO_CITYL2, m_comboCityL2);
	DDX_Control(pDX, IDC_EDIT_COLLECT_KEYWORD, m_editCollectKeyword);
}

HBRUSH CDialogPageCollect::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
{
	return (HBRUSH)GetStockObject(WHITE_BRUSH);
}

BEGIN_MESSAGE_MAP(CDialogPageCollect, CDialogEx)
	ON_WM_CTLCOLOR()
	ON_MESSAGE(WM_COLLECT_REFRESH, &CDialogPageCollect::OnRefresh)
	ON_BN_CLICKED(IDC_BUTTON_COLLECT, &CDialogPageCollect::OnBnClickedButtonCollect)
	ON_BN_CLICKED(IDC_BUTTON_EXPORT, &CDialogPageCollect::OnBnClickedButtonExport)
    ON_CBN_SELCHANGE(IDC_COMBO_CITYL1, &CDialogPageCollect::OnCbnSelchangeComboCityl1)
END_MESSAGE_MAP()


// CDialogPageCollect 消息处理程序

LRESULT CDialogPageCollect::OnRefresh(WPARAM wParam, LPARAM lParam)
{
	m_listctlCollect.DeleteAllItems();

	std::vector<CGroupInfo>* pGroupInfo = (std::vector<CGroupInfo>*)lParam;
	for (int i = 0; i < pGroupInfo->size(); ++i)
	{
		CString tmp;
		tmp.Format(_T("%d"), i + 1);
		m_listctlCollect.InsertItem(i, tmp);
		m_listctlCollect.SetItemState(i, LVIS_SELECTED | LVIS_FOCUSED, LVIS_SELECTED | LVIS_FOCUSED);
		
		m_listctlCollect.SetItemText(i, 1, Utf82Unicode(pGroupInfo->at(i).Code).c_str());
		m_listctlCollect.SetItemText(i, 2, Utf82Unicode(pGroupInfo->at(i).Name).c_str());
		m_listctlCollect.SetItemText(i, 3, Utf82Unicode(pGroupInfo->at(i).Gcate).c_str());
		m_listctlCollect.SetItemText(i, 4, Utf82Unicode(pGroupInfo->at(i).OwnerUin).c_str());
		m_listctlCollect.SetItemText(i, 5, Utf82Unicode(pGroupInfo->at(i).MemberNum).c_str());
		m_listctlCollect.SetItemText(i, 6, Utf82Unicode(pGroupInfo->at(i).MaxMemberNum).c_str());
		m_listctlCollect.SetItemText(i, 7, Utf82Unicode(pGroupInfo->at(i).Gaddr).c_str());
		m_listctlCollect.SetItemText(i, 8, Utf82Unicode(pGroupInfo->at(i).CertificateName).c_str());
		m_listctlCollect.SetItemText(i, 9, Utf82Unicode(pGroupInfo->at(i).RichFingerMemo).c_str());
	}

	return 0;
}

void CDialogPageCollect::OnBnClickedButtonCollect()
{
	int nCityL1 = m_comboCityL1.GetCurSel() < 1 ? 0 : m_comboCityL1.GetCurSel();
	int nCityL2 = m_comboCityL2.GetCurSel() < 1 ? 0 : m_comboCityL2.GetCurSel();
	int nCityID = atoi(g_Citys[nCityL1].CityL2[nCityL2].id.c_str());

	CString cstrKeyword;
	m_editCollectKeyword.GetWindowText(cstrKeyword);

	std::vector<CGroupInfo> group_all;
	int nIndex = m_comboCollect.GetCurSel();
	switch (nIndex)
	{
	case 0:
		CollectGroup(group_all, nCityL1, nCityL2, escapeURL(Unicode2Utf8(cstrKeyword.GetBuffer())));
		//CollectBuddy();
		break;
	case 1:
		CollectGroup(group_all, nCityL1, nCityL2, escapeURL(Unicode2Utf8(cstrKeyword.GetBuffer())));
		break;
	default:
		return;
	}

	this->SendMessage(WM_COLLECT_REFRESH, NULL, (LPARAM)&group_all);
}

void CDialogPageCollect::OnBnClickedButtonExport()
{
	CFileDialog dlg(FALSE, _T("txt"), _T("test.txt"), OFN_HIDEREADONLY|OFN_OVERWRITEPROMPT, L"文本文件 (*.txt)|*.txt||", NULL);	//FALSE表示为“另存为”对话框，否则为“打开”对话框
	dlg.m_ofn.lpstrInitialDir = _T("c:\\"); //打开文件夹   
	if(IDOK == dlg.DoModal())
	{
		CString strFile = dlg.GetPathName();//获取完整路径
	}
}

void CDialogPageCollect::OnCbnSelchangeComboCityl1()
{
	m_comboCityL2.ResetContent();
	int nCityL1 = m_comboCityL1.GetCurSel();
	for (int i = 0; i < g_Citys[nCityL1].CityL2.size(); ++i)
	{
		m_comboCityL2.AddString(Utf82Unicode(g_Citys[nCityL1].CityL2[i].name).c_str());
	}
	m_comboCityL2.SetCurSel(0);

	if (0 == nCityL1)
	{
		m_comboCityL2.EnableWindow(FALSE);
	}
	else
	{
		m_comboCityL2.EnableWindow(TRUE);
	}

	return;
}