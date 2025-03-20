export type ObjectRecord = Record<PropertyKey, any>;

export interface GetKeyFunction {
    (data?: any): PropertyKey
}


export type KeyMappingItem = [PropertyKey | PropertyKey[], PropertyKey | PropertyKey[]]

export interface MergeOptions<S = any, T = any> {
    /**
     * 降序
     */
    desc?: boolean;
    /**
     * 源键
     */
    sourceKey: PropertyKey | ((data: S) => PropertyKey);
    /**
     * 目标键
     */
    targetKey?: PropertyKey | ((data: T) => PropertyKey);

    /**
     * 源对象的键值映射关系
     */
    sourceKeyMapping?: KeyMappingItem[];
    /**
     * 最大遍历数量
     */
    maxWalkCount?: number;
    /**
     * 启用日志
     */
    enableLog?: boolean
}
