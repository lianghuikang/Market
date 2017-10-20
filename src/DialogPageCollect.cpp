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

extern CNonLeaf g_Locations;
extern std::vector<CCityL1> g_Citys;

CDialogPageCollect::CDialogPageCollect(CWnd* pParent /*=NULL*/)
	: CDialogEx(CDialogPageCollect::IDD, pParent)
{

}

CDialogPageCollect::~CDialogPageCollect()
{
}

int CDialogPageCollect::InitBuddyCtrl()
{
	// 启用控件
	m_comboCountry.EnableWindow(TRUE);
	m_comboProvince.EnableWindow(TRUE);
	m_comboCity.EnableWindow(TRUE);
	m_comboDistrict.EnableWindow(TRUE);
	m_comboHcountry.EnableWindow(TRUE);
	m_comboHprovince.EnableWindow(TRUE);
	m_comboHcity.EnableWindow(TRUE);
	m_comboHdistrict.EnableWindow(TRUE);
	m_comboCollectSex.EnableWindow(TRUE);
	m_comboCollectAge.EnableWindow(TRUE);
	m_checkCollectOnline.EnableWindow(TRUE);
	m_checkCollectVideo.EnableWindow(TRUE);

	// 禁用控件
	m_comboCityL1.EnableWindow(FALSE);
	m_comboCityL2.EnableWindow(FALSE);
	
	// 还原控件状态
	ResetAllCtrl();
	
	// 设置控件状态
	for (std::vector<CNonLeaf>::iterator iter = g_Locations.child.begin(); iter != g_Locations.child.end(); ++iter)
	{
		m_comboCountry.AddString(Utf82Unicode(iter->name).c_str());
	}
	m_comboCountry.SetCurSel(0);
	m_comboProvince.EnableWindow(FALSE);
	m_comboCity.EnableWindow(FALSE);
	m_comboDistrict.EnableWindow(FALSE);
	
	for (std::vector<CNonLeaf>::iterator iter_country = g_Locations.child.begin(); iter_country != g_Locations.child.end(); ++iter_country)
	{
		m_comboHcountry.AddString(Utf82Unicode(iter_country->name).c_str());
	}
	m_comboHcountry.SetCurSel(0);
	m_comboHprovince.EnableWindow(FALSE);
	m_comboHcity.EnableWindow(FALSE);
	m_comboHdistrict.EnableWindow(FALSE);

	m_comboCollectSex.AddString(L"不限");
	m_comboCollectSex.AddString(L"男");
	m_comboCollectSex.AddString(L"女");
	m_comboCollectSex.SetCurSel(0);

	m_comboCollectAge.AddString(L"不限");
	m_comboCollectAge.AddString(L"18岁以下");
	m_comboCollectAge.AddString(L"18-22岁");
	m_comboCollectAge.AddString(L"23-26岁");
	m_comboCollectAge.AddString(L"27-35岁");
	m_comboCollectAge.AddString(L"35岁以上");
	m_comboCollectAge.SetCurSel(0);

	m_checkCollectOnline.SetCheck(BST_CHECKED);

	CRect rc;
	m_listctlCollect.GetClientRect(rc);
	int nWidth = rc.Width();
	m_listctlCollect.SetExtendedStyle(m_listctlCollect.GetExtendedStyle() | LVS_EX_FULLROWSELECT | LVS_EX_GRIDLINES);
	m_listctlCollect.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 40);
	m_listctlCollect.InsertColumn(1, _T("QQ号"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertColumn(2, _T("昵称"), LVCFMT_LEFT, 80);
	m_listctlCollect.InsertItem(0, NULL);			// 默认添加一行使显示水平滚动条

	return 0;
}

int CDialogPageCollect::InitGroupCtrl()
{
	// 启用控件
	m_comboCityL1.EnableWindow(TRUE);
	m_comboCityL2.EnableWindow(TRUE);

	// 禁用控件
	m_comboCountry.EnableWindow(FALSE);
	m_comboProvince.EnableWindow(FALSE);
	m_comboCity.EnableWindow(FALSE);
	m_comboDistrict.EnableWindow(FALSE);
	m_comboHcountry.EnableWindow(FALSE);
	m_comboHprovince.EnableWindow(FALSE);
	m_comboHcity.EnableWindow(FALSE);
	m_comboHdistrict.EnableWindow(FALSE);
	m_comboCollectSex.EnableWindow(FALSE);
	m_comboCollectAge.EnableWindow(FALSE);
	m_checkCollectOnline.EnableWindow(FALSE);
	m_checkCollectVideo.EnableWindow(FALSE);
	
	// 还原控件状态
	ResetAllCtrl();

	// 设置控件状态
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
	m_listctlCollect.InsertItem(0, NULL);			// 默认添加一行使显示水平滚动条
	
	for (int i = 0; i < g_Citys.size(); ++i)
	{
		m_comboCityL1.AddString(Utf82Unicode(g_Citys[i].name).c_str());
	}
	m_comboCityL1.SetCurSel(0);
	m_comboCityL2.EnableWindow(FALSE);

	return 0;
}

int CDialogPageCollect::ResetAllCtrl()
{
	m_comboCityL1.ResetContent();
	m_comboCityL2.ResetContent();
	m_comboCountry.ResetContent();
	m_comboProvince.ResetContent();
	m_comboCity.ResetContent();
	m_comboDistrict.ResetContent();
	m_comboHcountry.ResetContent();
	m_comboHprovince.ResetContent();
	m_comboHcity.ResetContent();
	m_comboHdistrict.ResetContent();
	m_comboCollectSex.ResetContent();
	m_comboCollectAge.ResetContent();
	m_checkCollectOnline.SetCheck(BST_UNCHECKED);
	m_checkCollectVideo.SetCheck(BST_UNCHECKED);
	ClearCollectList();				// 清空采集列表

	return 0;
}

int CDialogPageCollect::ClearCollectList()
{
	m_listctlCollect.DeleteAllItems();
	int nCols = m_listctlCollect.GetHeaderCtrl()->GetItemCount();
	for (int i = 0; i < nCols; ++i)
	{
		m_listctlCollect.DeleteColumn(0);
	}

	return 0;
}

int CDialogPageCollect::InitLocation()
{
	pugi::xml_document doc;
	std::wstring strCfg = GetRunPathW() + L"location.xml";
	if (pugi::xml_parse_status::status_ok != doc.load_file(strCfg.c_str()).status)
	{
		return -1;
	}

	CNonLeaf ulimit;
	ulimit.name = Unicode2Utf8(L"不限");
	ulimit.code = "0";
	g_Locations.child.push_back(ulimit);

	for (pugi::xml_node pCountry = doc.child("Location").child("CountryRegion"); pCountry; pCountry = pCountry.next_sibling("CountryRegion"))
	{
		if ("0" == pCountry.attribute("Code").value())
		{
			continue;
		}

		CNonLeaf country;
		country.name = pCountry.attribute("Name").value();
		country.code = pCountry.attribute("Code").value();
		country.child.push_back(ulimit);

		for (pugi::xml_node pProvince = pCountry.child("State"); pProvince; pProvince = pProvince.next_sibling("State"))
		{
			if ("0" == pProvince.attribute("Code").value())
			{
				continue;
			}

			CNonLeaf province;
			province.name = pProvince.attribute("Name").value();
			province.code = pProvince.attribute("Code").value();
			province.child.push_back(ulimit);

			for (pugi::xml_node pCity = pProvince.child("City"); pCity; pCity = pCity.next_sibling("City"))
			{
				if ("0" == pCity.attribute("Code").value())
				{
					continue;
				}
				
				CNonLeaf city;
				city.name = pCity.attribute("Name").value();
				city.code = pCity.attribute("Code").value();
				city.child.push_back(ulimit);

				for (pugi::xml_node pDistrict = pCity.child("Region"); pDistrict; pDistrict = pDistrict.next_sibling("Region"))
				{
					if ("0" == pDistrict.attribute("Code").value())
					{
						continue;
					}

					CNonLeaf district;
					district.name = pDistrict.attribute("Name").value();
					district.code = pDistrict.attribute("Code").value();
					city.child.push_back(district);
				}

				province.child.push_back(city);
			}

			country.child.push_back(province);
		}

		g_Locations.child.push_back(country);
	}

	return 0;
}

int CDialogPageCollect::InitCity()
{
	pugi::xml_document doc;
	std::wstring strCfg = GetRunPathW() + L"city.xml";
	if (pugi::xml_parse_status::status_ok != doc.load_file(strCfg.c_str()).status)
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
		CityL1.CityL2.push_back(CCityL2(pL1.attribute("id").value(), Unicode2Utf8(L"不限")));

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

	InitLocation();
	InitCity();
	
	// 采集对象
	m_comboCollect.AddString(L"QQ号");
	m_comboCollect.AddString(L"QQ群");
	m_comboCollect.SetCurSel(0);
	
	InitBuddyCtrl();

	return TRUE;
}

void CDialogPageCollect::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Control(pDX, IDC_COMBO_COLLECT, m_comboCollect);
	DDX_Control(pDX, IDC_LIST_COLLECT, m_listctlCollect);
	DDX_Control(pDX, IDC_COMBO_CITYL1, m_comboCityL1);
	DDX_Control(pDX, IDC_COMBO_CITYL2, m_comboCityL2);
	DDX_Control(pDX, IDC_EDIT_COLLECT_KEYWORD, m_editCollectKeyword);
	DDX_Control(pDX, IDC_COMBO_COUNTRY, m_comboCountry);
	DDX_Control(pDX, IDC_COMBO_PROVINCE, m_comboProvince);
	DDX_Control(pDX, IDC_COMBO_CITY, m_comboCity);
	DDX_Control(pDX, IDC_COMBO_DISTRICT, m_comboDistrict);
	DDX_Control(pDX, IDC_COMBO_HCOUNTRY, m_comboHcountry);
	DDX_Control(pDX, IDC_COMBO_HPROVINCE, m_comboHprovince);
	DDX_Control(pDX, IDC_COMBO_HCITY, m_comboHcity);
	DDX_Control(pDX, IDC_COMBO_HDISTRICT, m_comboHdistrict);
	DDX_Control(pDX, IDC_COMBO_COLLECT_SEX, m_comboCollectSex);
	DDX_Control(pDX, IDC_COMBO_COLLECT_AGE, m_comboCollectAge);
	DDX_Control(pDX, IDC_CHECK_COLLECT_ONLINE, m_checkCollectOnline);
	DDX_Control(pDX, IDC_CHECK_COLLECT_VIDEO, m_checkCollectVideo);
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
    ON_CBN_SELCHANGE(IDC_COMBO_COLLECT, &CDialogPageCollect::OnCbnSelchangeComboCollect)
    ON_CBN_SELCHANGE(IDC_COMBO_COUNTRY, &CDialogPageCollect::OnCbnSelchangeComboCountry)
    ON_CBN_SELCHANGE(IDC_COMBO_PROVINCE, &CDialogPageCollect::OnCbnSelchangeComboProvince)
    ON_CBN_SELCHANGE(IDC_COMBO_CITY, &CDialogPageCollect::OnCbnSelchangeComboCity)
    ON_CBN_SELCHANGE(IDC_COMBO_HCOUNTRY, &CDialogPageCollect::OnCbnSelchangeComboHcountry)
    ON_CBN_SELCHANGE(IDC_COMBO_HPROVINCE, &CDialogPageCollect::OnCbnSelchangeComboHprovince)
    ON_CBN_SELCHANGE(IDC_COMBO_HCITY, &CDialogPageCollect::OnCbnSelchangeComboHcity)
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
	dlg.m_ofn.lpstrInitialDir = _T("C:\\Users\\Administrator\\Desktop\\"); //打开文件夹   
	if(IDOK == dlg.DoModal())
	{
		CString cstrFile = dlg.GetPathName();//获取完整路径
		FILE* pFile = NULL;
		if (NULL == (pFile = _tfopen(cstrFile.GetBuffer(), L"wb")))
		{
			MessageBox(L"打开文件失败", L"提示", MB_OK);
			return;
		}

		std::wstring wstrContent;
		for (int i = 0; i < m_listctlCollect.GetItemCount(); ++i)
		{
			wstrContent += m_listctlCollect.GetItemText(i, 1).GetBuffer();
			wstrContent += L"\r\n";
		}
		std::string strContent = Unicode2Utf8(wstrContent);

		if (1 != fwrite(strContent.c_str(), strContent.size(), 1, pFile))
		{
			MessageBox(L"写入文件不完整", L"提示", MB_OK);
		}
		fclose(pFile);
	}
}

void CDialogPageCollect::OnCbnSelchangeComboCollect()
{
	int nSelect = m_comboCollect.GetCurSel();
	if (0 == nSelect)
	{
		InitBuddyCtrl();
	}
	else
	{
		InitGroupCtrl();
	}
}

void CDialogPageCollect::OnCbnSelchangeComboCountry()
{
}

void CDialogPageCollect::OnCbnSelchangeComboProvince()
{
}

void CDialogPageCollect::OnCbnSelchangeComboCity()
{
}

void CDialogPageCollect::OnCbnSelchangeComboHcountry()
{
}

void CDialogPageCollect::OnCbnSelchangeComboHprovince()
{
}

void CDialogPageCollect::OnCbnSelchangeComboHcity()
{
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
}