import { KeyMappingItem, SourceKeyMapping } from "./types";
import { toMappingItemList } from "./utils";
import { getOwnPropertyKeyList, getProperty, setProperty } from "./utils/object";

/**
 * 合并对象生成新的对象
 * @param obj1 
 * @param obj2 
 * @param mapping 
 * @param mapping 
 * @returns 
 */
export function mergeObject<T = any, S = any, R extends T = T>(
    obj1: T,
    obj2: S,
    obj2Mapping: SourceKeyMapping | undefined = undefined
): R {


    let mapping = toMappingItemList(obj2Mapping);
    if (mapping === undefined) {
        mapping = getOwnPropertyKeyList(obj2Mapping).map(key => [key, key])
    }
    for (let i = 0; i < mapping.length; i++) {
        const mappingItem = mapping[i];
        const sKey = mappingItem[0];
        const tKey = mappingItem[1];
        const val = getProperty(obj2, Array.isArray(sKey) ? sKey : [sKey]);
        setProperty(obj1, Array.isArray(tKey) ? tKey : [tKey], val)
    }

    return obj1 as unknown as R;
}