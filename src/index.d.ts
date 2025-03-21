
export type ObjectRecord = Record<PropertyKey, any>;

export type PropertyKeyOrPaths = PropertyKey | PropertyKey[];

export type KeyMappingItem = [PropertyKeyOrPaths, PropertyKeyOrPaths]

export type KeyMappingMap = Record<PropertyKey, PropertyKey>;

export type SourceKeyMapping = KeyMappingMap | KeyMappingItem[];

export interface MergeOptions<S = any, T = any> {
    /**
     * 降序
     */
    desc?: boolean;
    /**
     * 源键
     */
    sourceKey: PropertyKeyOrPaths | ((data: S) => PropertyKeyOrPaths);
    /**
     * 目标键
     */
    targetKey?: PropertyKeyOrPaths | ((data: T) => PropertyKeyOrPaths);

    /**
     * 源对象的键值映射关系
     */
    sourceKeyMapping?: SourceKeyMapping;
    /**
     * 最大遍历数量
     */
    maxWalkCount?: number;
    /**
     * 启用日志
     */
    enableLog?: boolean;
    /**
     * 是否创建的对象，而不是直接更改targetArr上的对象
     */
    newItem?: boolean;
}


export declare function mergeArray<S = ObjectRecord, T = ObjectRecord, R = ObjectRecord>(targetArr?: T[], sourceArr?: S[], options?: MergeOptions<S, T>): R[];

