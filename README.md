# China Zipcode Adcode Data

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/npm/v/@tombcato/china-zipcode-data.svg)](https://www.npmjs.com/package/@tombcato/china-zipcode-data)


本项目包含中国省市区县的 **行政编码(Adcode)** 和 **邮政编码(Zipcode)** 对应数据。  
可通过使用 [**整理好的JSON元数据**](./china_zipcode_adcode.json) 或者 **JS SDK** 两种方式使用。  
也可与高德地图/百度地图/腾讯地图等联动实现地址解析后通过Adcode获取地址邮编。 
详细可参考 [DEMO在线体验](https://tombcato.github.io/china-zipcode-data/)  

数据来源于网络整理，并进行了一定的清洗和整理。参考： 
[2023年中华人民共和国县以上行政区划代码](https://www.mca.gov.cn/mzsj/xzqh/2023/202301xzqh.html)  
[高德全国邮政编码查询](https://ditu.amap.com/postcode/)  

感谢开源项目提供部分数据：  
[China-zip-code-latitude-and-longitude](https://github.com/sfyc23/China-zip-code-latitude-and-longitude)  
[Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)  

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

