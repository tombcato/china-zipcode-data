
export interface Region {
    code: string;
    name: string;
    zipCode: string;
    province: string;
    city: string;
    pinyin: string;
}

/**
 * 根据行政区划代码精确查找
 * @param code 行政区划代码 (Adcode)
 */
export function get(code: string): Promise<Region | null>;

/**
 * 模糊搜索 (匹配名称、拼音、邮编)
 * @param keyword 关键词
 */
export function search(keyword: string): Promise<Region[]>;

/**
 * 获取所有数据
 */
export function getAll(): Promise<Region[]>;

/**
 * 手动设置数据源 (用于预加载或自定义数据)
 * @param data 完整的行政区划数组
 */
export function setData(data: Region[]): void;
