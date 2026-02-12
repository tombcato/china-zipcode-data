# China Zipcode Adcode Data

本项目包含中国省市区县的 Adcode 和 Zipcode 对应数据。
数据来源于网络整理。

## 如何使用 (jsDelivr CDN)

你可以直接通过 CDN 引用本数据，无需自行部署服务器。

### 获取最新版本
```javascript
// 建议使用具体版本号，例如 @1.0.0，避免缓存问题
const url = "https://cdn.jsdelivr.net/gh/<你的GitHub用户名>/<仓库名>@main/china_zipcode_adcode.json";

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
    const response = await fetch("https://cdn.jsdelivr.net/gh/<你的GitHub用户名>/<仓库名>@main/china_zipcode_adcode.json");
    const data = await response.json();
    return data.filter(item => 
        item.name.includes(keyword) || 
        item.province.includes(keyword) ||
        item.city.includes(keyword)
    );
}
```

## 数据字段说明

- `code`: 行政区划代码 (Adcode)
- `name`: 名称
- `province`: 省份
- `city`: 城市
- `zipCode`: 邮政编码
- `pinyin`: 拼音
