# China Zipcode Adcode Data

本项目包含中国省市区县的 Adcode 和 Zipcode 对应数据。
数据来源于网络整理。

## 如何使用 (jsDelivr CDN)

你可以直接通过 CDN 引用本数据，无需自行部署服务器。

### 获取最新版本
```javascript
// 建议使用具体版本号，例如 @1.0.0，避免缓存问题
const url = "https://cdn.jsdelivr.net/gh/tombcato/china-zipcode-data@main/china_zipcode_adcode.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // 在此处处理数据
  });
```

### 模糊查询示例
```javascript
async function search(keyword) {
    const response = await fetch("https://cdn.jsdelivr.net/gh/tombcato/china-zipcode-data@main/china_zipcode_adcode.json");
    const data = await response.json();
    return data.filter(item => 
        item.name.includes(keyword) || 
        item.province.includes(keyword) ||
        item.city.includes(keyword)
    );
}
``` 

## 数据字段说明

## JavaScript SDK 使用指南

本项目提供了一个同构的 JavaScript SDK，支持 Node.js 和浏览器环境。

### 安装
```bash
npm install china-zipcode-adcode
```

### 使用 (Node.js / Webpack / ESM)
```javascript
import { get, search } from 'china-zipcode-adcode';

// 1. 精确查找
const region = await get('110101');
console.log(region);

// 2. 模糊搜索
const results = await search('朝阳');
console.log(results);
```

### 使用 (浏览器 CDN)
无需安装，直接引用即可。数据会自动从 jsDelivr CDN 加载。
```html
<script type="module">
  import { search } from 'https://cdn.jsdelivr.net/gh/<你的GitHub用户名>/<仓库名>@main/src/index.js';
  
  search('朝阳').then(results => {
    console.log(results);
  });
</script>
```

---

## 字段说明
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
url = "https://cdn.jsdelivr.net/gh/<你的GitHub用户名>/<仓库名>@main/china_zipcode_adcode.json"
data = requests.get(url).json()

# 方式 2: 本地加载
with open('china_zipcode_adcode.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 查找示例
def find_by_code(code):
    return next((item for item in data if item['code'] == code), None)

print(find_by_code('110101'))
```

