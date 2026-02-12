const { loadData, setData } = require('./data-loader');

/**
 * 根据 adcode 精确查找
 * @param {string} code 行政区划代码
 * @returns {Promise<Object|null>}
 */
async function get(code) {
    const list = await loadData();
    if (!list) return null;
    return list.find(item => item.code === String(code)) || null;
}

/**
 * 模糊搜索
 * @param {string} keyword 省/市/区/拼音 关键词
 * @returns {Promise<Array>}
 */
async function search(keyword) {
    if (!keyword) return [];
    const list = await loadData();
    if (!list) return [];

    const key = String(keyword).toLowerCase();
    return list.filter(item =>
        (item.name && item.name.includes(key)) ||
        (item.province && item.province.includes(key)) ||
        (item.city && item.city.includes(key)) ||
        (item.pinyin && item.pinyin.includes(key)) ||
        (item.zipCode && item.zipCode.includes(key))
    );
}

/**
 * 获取所有数据
 * @returns {Promise<Array>}
 */
async function getAll() {
    return await loadData();
}

module.exports = {
    get,
    search,
    getAll,
    setData // 暴露给需要手动注入数据的场景
};
