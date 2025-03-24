export type ObjectRecord = Record<PropertyKey, any>;

export interface GetKeyFunction<D = any> {
    (data?: D): PropertyKeyOrPaths
}

export type PropertyKeyOrPaths = PropertyKey | PropertyKey[];

export type KeyMappingItem = [PropertyKeyOrPaths, PropertyKeyOrPaths]

export type KeyMappingMap = Record<PropertyKey, PropertyKey>;

export type SourceKeyMapping = KeyMappingMap | KeyMappingItem[];



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
    desc?: boolean;
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

export declare class MergeBaseClass<M = any, O = any> {
    private options;
    constructor(options: MergeBaseClassOptions);
    private list;
    push(item: M, mapping?: O): this;
    merge(): any;
}

/**
 * 合并两个对象生成新的对象，支持属性映射
 * @param object1
 * @param object2
 * @param obj2Mapping
 * @returns
 */
export declare function mergeObject<T = any, S = any, R extends T = T>(object1: T, object2: S, obj2Mapping?: SourceKeyMapping | undefined): R;
/**
 * 合并多个对象的HOC，支持属性映射
 * @param obj
 * @returns
 */
export declare function mergeObjectHOC(obj: any): MergeBaseClass<Object, SourceKeyMapping>;
/**
 * 多个对象合并，不支持属性映射
 * @param objectList
 * @returns
 */
export declare function mergeObjectForce(...objectList: any[]): any;


/**
 * 根据两个数组的key合并数据，支持属性映射
 * @param targetArr 目标数组
 * @param sourceArr 需要被合并的数组
 * @param options   选项
 * @returns
 */
export declare function mergeArrayByKey<S = ObjectRecord, T = ObjectRecord, R = ObjectRecord>(targetArr?: T[], sourceArr?: S[], options?: MergeArrayOptions<S, T>): R[];
/**
 * 根据key合并数组的HOC，支持属性映射
 * @param array
 * @returns
 */
export declare function mergeArrayByKeyHOC(array: any[]): MergeBaseClass<Object[], MergeArrayOptions<any, any>>;
/**
 * 多个数组属性覆盖式的合并，不支持属性映射
 * @param arrayList
 * @returns
 */
export declare function mergeArray(...arrayList: any[]): any[];
