
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
 * 组合条件搜索
 * @param name 必需，区县名称或关键词
 * @param city 可选，城市名称
 * @param province 可选，省份名称
 */
export function search(name: string, city?: string, province?: string): Promise<Region[]>;

/**
 * 获取所有数据
 */
export function getAll(): Promise<Region[]>;

/**
 * 手动设置数据源 (用于预加载或自定义数据)
 * @param data 完整的行政区划数组
 */
export function setData(data: Region[]): void;
