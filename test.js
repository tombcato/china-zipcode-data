
const { get, search } = require('./src/index');

async function test() {
    console.log('--- 测试 SDK ---');

    // 1. 测试精确查找
    const dongcheng = await get('110101');
    console.log('精确查找 110101:', dongcheng ? '成功' : '失败', dongcheng);

    // 2. 测试模糊搜索
    const results = await search('朝阳');
    console.log('搜索 "朝阳":', results.length > 0 ? `成功 (${results.length}条)` : '失败');

    if (results.length > 0) {
        console.log('第一条结果:', results[0]);
    }
}

test();
