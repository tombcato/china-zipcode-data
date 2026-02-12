
import { get, search } from './src/index.js';

async function test() {
    console.log('--- 测试 SDK (ESM) ---');

    // 1. 精确查找
    const dongcheng = await get('110101');
    console.log('[测试1] 精确查找 110101:', dongcheng ? '✅' : '❌', dongcheng?.name);

    // 2. 基础搜索
    const res1 = await search('朝阳');
    console.log(`[测试2] 搜索 "朝阳": ${res1.length}条`);

    // 3. 组合搜索 (带城市)
    const res2 = await search('朝阳', '北京');
    console.log(`[测试3] 搜索 "朝阳" + City="北京": ${res2.length}条`);

    // 4. 组合搜索 (带省份)
    const res3 = await search('朝阳', null, '吉林');
    console.log(`[测试4] 搜索 "朝阳" + Province="吉林": ${res3.length}条`);

    // 5. 组合搜索 (不存在的)
    const res4 = await search('朝阳', '上海');
    console.log(`[测试5] 搜索 "朝阳" + City="上海": ${res4.length}条 (预期0)`);
}

test();
