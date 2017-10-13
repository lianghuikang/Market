import requests
import json

url = 'http://qun.qq.com/cgi-bin/group_search/pc_group_search'
headers = {'Accept': 'application/json, text/javascript, */*; q=0.01',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'zh-CN,zh;q=0.8',
'Connection': 'keep-alive',
'Content-Length': '148',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Host': 'qun.qq.com',
'Origin': 'http://find.qq.com',
'Referer': 'http://find.qq.com/index.html?version=1&im_version=5485&width=910&height=610&search_target=0',
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'}

'''
cookies = {'pgv_pvi': '3942382592',
'RK': 'Lak/mn1eTl', 
'pgv_pvid': '7347405980', 
'pgv_info': 's9448080696',
'ssid': 's9448080696',
'pgv_si': 's6963220480',
'ptisp': 'cm',
'ptcz': '663e0abfa623195e6d1292d0fd74ad28272bd782913d6d537f09576b04ff6249',
'pt2gguin': 'o0505519763',
'uin': 'o0505519763', 
'skey': '@dbnaez6nv'}
'''

cookies = {
#'pgv_pvi': '8872777728',
#'RK': 'Lak/mn1eTl', 
#'ssid': 's9448080696',
#'pgv_si': 's7531570176',
#'ptisp': 'cm',
#'ptcz': '55e5cac8e47ccb717aa4fe9f05951d11f7c9528a082415be8ed4da8750a3ae99',
#'pt2gguin': 'o0505519763',
'uin': 'o0505519763', 	#no login
'skey': '@SkpRIHzBh'	#basekey err
}

data = {
'k': '交友',
'n': '8',
'st': '1',
'iso': '1',
'src': '1',
'v': '4903',
'bkn': '776135898',
'isRecommend': 'false',
'city_id': '0',
'from': '1',
'keyword': 'rthrth',
'sort': '0',
'wantnum': '500',
'page': '0',
'ldw': '776135898'
}

r = requests.post(url=url, headers=headers, cookies=cookies, data=data)

print(r.json())

