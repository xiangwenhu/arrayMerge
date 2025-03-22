export type ObjectRecord = Record<PropertyKey, any>;

export interface GetKeyFunction<D = any> {
    (data?: D): PropertyKeyOrPaths
}

export type PropertyKeyOrPaths = PropertyKey | PropertyKey[];

export type KeyMappingItem = [PropertyKeyOrPaths, PropertyKeyOrPaths]

export type KeyMappingMap = Record<PropertyKey, PropertyKey>;

export type SourceKeyMapping = KeyMappingMap | KeyMappingItem[];


/**
 * 遍历模式
 */
export enum EnumTraverseMode {
    /**
     * 从前往后
     */
    Forward = 1,
    /**
     * 从后往前
     */
    Backward = 2
}



export interface MergeObjectOption {
    newItem?: boolean;
    /**
     * 对象的键值映射关系
     */
    keyMapping?: SourceKeyMapping;
}

export interface MergeArrayOptions<S = any, T = any> {
    /**
     * 降序
     */
    mode?: EnumTraverseMode;
    /**
     * 源键, 默认值 id
     */
    sourceKey?: PropertyKeyOrPaths | ((data: S) => PropertyKeyOrPaths);
    /**
     * 目标键, 如果未设置，等于 sourceKey
     */
    targetKey?: PropertyKeyOrPaths | ((data: T) => PropertyKeyOrPaths);

    /**
     * 源对象的键值映射关系
     */
    sourceKeyMapping?: SourceKeyMapping;
    /**
     * 最大遍历数量, 默认值 1000
     */
    maxWalkCount?: number;
    /**
     * 启用日志
     */
    enableLog?: boolean;
    /**
     * 是否创建的对象，而不是直接更改targetArr上的对象， 默认值 false
     */
    newItem?: boolean;
}


export type MergeObjectHocItem = [Object, SourceKeyMapping | undefined]

export interface MergeBaseClassOptions {
    mergeMethod: Function
}
