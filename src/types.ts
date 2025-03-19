export type ObjectRecord = Record<PropertyKey, any>;

export interface GetKeyFunction {
    (data?: any): PropertyKey
}


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
     * 键值映射关系
     */
    keyMap?: Record<PropertyKey, PropertyKey>;
}
