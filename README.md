# China Zipcode Adcode Data

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/npm/v/@tombcato/china-zipcode-data.svg)](https://www.npmjs.com/package/@tombcato/china-zipcode-data)


本项目包含中国省市区县的 **行政编码(Adcode)** 和 **邮政编码(Zipcode)** 对应数据。  
可通过使用 [**整理好的JSON元数据**](./china_zipcode_adcode.json) 或者 **JS SDK** 两种方式使用。  
也可与高德地图/百度地图/腾讯地图等联动实现地址解析后通过Adcode获取地址邮编。 
详细可参考 [DEMO在线体验](https://tombcato.github.io/china-zipcode-data/)  

![Demo](demo_address.png)


数据来源于网络整理，并进行了一定的清洗和整理。参考：   
[2023年中华人民共和国县以上行政区划代码](https://www.mca.gov.cn/mzsj/xzqh/2023/202301xzqh.html)   
[高德全国邮政编码查询](https://ditu.amap.com/postcode/)   

感谢开源项目提供部分数据：  
[China-zip-code-latitude-and-longitude](https://github.com/sfyc23/China-zip-code-latitude-and-longitude)  
[Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)  

## 为什么需要这个数据？

### 1. 开发时邮编获取的困局

调研了下市面上的邮编数据API, 通过地址信息获取邮编需要付费限免次数有限\
通过AI获取的邮编数据幻觉严重，实测多个模型都无法返回准确邮编\
有很多网页提供三级联动查询区域邮编，但无法通过api接入项目\
有一些开源数据但内行政区划老旧不准确，获取邮编还需要手动拆分输入地址的省市区来进行匹配，不准还麻烦

### 2. 地图 API 的“断层”

在使用地图 SDK 时，最常用的流程是：
`输入地址 -> 地图地理编码 -> 行政代码(Adcode) / 经纬度 / 格式化后的地址等`。
然而，邮编作为一个相对传统的字段，在现代地图服务中的权重在降低。即使拿到了详细地址以及行政区域编码(Adcode)，也无法获取到对应的邮编。

### 3. 数据的时效性问题

邮编数据，要么是 2018 年之前的陈旧版本，不少是付费下载的。\
行政区划数据，随着近年来国内行政区划的频繁调整（撤县设区、新区合并），**最新对应数据**变得非常稀缺。

> 注意：自2024年10月起，国家统计局继续公开《关于统计上划分城乡的规定》《统计用区划代码和城乡划分代码编制规则》等统计标准方法，不再公开具体相关代码

## JavaScript SDK 使用指南

本项目提供了一个同构的 JavaScript SDK，支持 Node.js 和浏览器环境。

### 安装
```bash
npm install @tombcato/china-zipcode-data
```

### 使用 (Node.js / Webpack / ESM)
```javascript
import { get, search } from '@tombcato/china-zipcode-data';

// 1. 通过adcode精确查找
const region = await get('110101');
console.log(region);

// 2. 搜索 (支持组合条件)
// 搜索 "朝阳"
const res1 = await search('朝阳'); 

// 搜索 "朝阳" 且城市包含 "北京"
const res2 = await search('朝阳', '北京');

// 搜索 "朝阳" 且省份包含 "吉林"
const res3 = await search('朝阳', null, '吉林');
```

### 使用 (浏览器 CDN 推荐)
无需安装，直接引用即可。数据会自动从 jsDelivr CDN 加载。

> **提示**: `@latest` 会指向最新版本，但可能有缓存延迟。生产环境建议锁定版本号 (如 `@1.0.2`)。

```html
<script type="module">
  // 引用最新版 (使用 +esm 自动处理模块加载)
  import { search } from 'https://cdn.jsdelivr.net/npm/@tombcato/china-zipcode-data@latest/+esm';
  
  search('朝阳').then(results => {
    console.log(results);
  });
</script>
```

---

## 字段说明
- `code`: 行政编码
- `name`: 名称
- `province`: 省份
- `city`: 城市
- `zipCode`: 邮政编码
- `pinyin`: 拼音

## 多语言使用示例 (Multi-language Examples)

本数据为标准 JSON 格式，任何语言都可以轻松解析。

### Python
```python
import requests
import json

# 方式 1: 在线加载
url = "https://cdn.jsdelivr.net/gh/tombcato/china-zipcode-data@latest/china_zipcode_adcode.json"
data = requests.get(url).json()

# 方式 2: 本地加载
with open('china_zipcode_adcode.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 查找示例
def find_by_code(code):
    return next((item for item in data if item['code'] == code), None)

print(find_by_code('110101'))
```

