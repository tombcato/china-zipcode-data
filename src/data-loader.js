
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

let data = null;

// CDN 地址模板，发布时请替换用户名和仓库名
const CDN_URL = "https://cdn.jsdelivr.net/gh/tombcato/china-zipcode-data@main/china_zipcode_adcode.json";

export async function loadData() {
    if (data) return data;

    if (isNode) {
        // Node.js 环境：读取本地文件
        try {
            // 在 ESM 中使用 fs 需要 import
            const fs = await import('fs');
            const path = await import('path');
            const { fileURLToPath } = await import('url');

            // 获取 __dirname 的 ESM 写法
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            // 假设数据文件在 SDK 根目录下
            const filePath = path.join(__dirname, '../china_zipcode_adcode.json');

            if (fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, 'utf-8');
                data = JSON.parse(raw);
            } else {
                console.warn('[ChinaZipcode] 本地数据文件不存在，尝试从 CDN 加载...');
                return await fetchFromCDN();
            }
        } catch (e) {
            console.error('[ChinaZipcode] 本地加载失败:', e);
            throw e;
        }
    } else {
        // 浏览器环境：从 CDN 加载
        data = await fetchFromCDN();
    }
    return data;
}

async function fetchFromCDN() {
    if (typeof fetch === 'undefined') {
        throw new Error('[ChinaZipcode] 当前环境不支持 fetch API');
    }
    const response = await fetch(CDN_URL);
    if (!response.ok) {
        throw new Error(`[ChinaZipcode] CDN 加载失败: ${response.statusText}`);
    }
    return await response.json();
}

/**
 * 手动设置数据（用于预加载或自定义数据源）
 * @param {Array} customData 
 */
export function setData(customData) {
    data = customData;
}
