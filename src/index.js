import { loadData, setData as _setData } from './data-loader.js';

/**
 * 根据 adcode 精确查找
 * @param {string} code 行政区划代码
 * @returns {Promise<Object|null>}
 */
export async function get(code) {
    const list = await loadData();
    if (!list) return null;
    return list.find(item => item.code === String(code)) || null;
}

/**
 * 组合条件搜索
 * @param {string} name 必需，区县名称或关键词
 * @param {string} [city] 可选，城市名称(包含即可)
 * @param {string} [province] 可选，省份名称(包含即可)
 * @returns {Promise<Array>}
 */
export async function search(name, city, province) {
    if (!name) return [];
    const list = await loadData();
    if (!list) return [];

    const keyName = String(name).toLowerCase();
    const keyCity = city ? String(city).toLowerCase() : null;
    const keyProvince = province ? String(province).toLowerCase() : null;

    return list.filter(item => {
        // 1. name 必须包含
        const matchName = (item.name && item.name.includes(keyName)) ||
            (item.pinyin && item.pinyin.includes(keyName))||
            (item.code && item.code === keyName);

        if (!matchName) return false;

        // 2. 如果传了 city，city 必须包含
        if (keyCity && (!item.city || !item.city.includes(keyCity))) {
            return false;
        }

        // 3. 如果传了 province，province 必须包含
        if (keyProvince && (!item.province || !item.province.includes(keyProvince))) {
            return false;
        }

        return true;
    });
}

/**
 * 获取所有数据
 * @returns {Promise<Array>}
 */
export async function getAll() {
    return await loadData();
}

export const setData = _setData;
