import { MergeBaseClass } from "./MergeBaseClass";
import { SourceKeyMapping } from "./types";
import { isObject, toMappingItemList } from "./utils";
import { getOwnPropertyKeys, getProperty, setProperty } from "./utils/object";

/**
 * 合并对象生成新的对象
 * @param object1 
 * @param object2 
 * @param obj2Mapping 
 * @returns 
 */
export function mergeObject<T = any, S = any, R extends T = T>(
    object1: T,
    object2: S,
    obj2Mapping: SourceKeyMapping | undefined = undefined
): R {

    const obj1 = Object(object1);
    const obj2 = Object(object2);

    let mapping = toMappingItemList(obj2Mapping);
    if (mapping === undefined) {
        mapping = getOwnPropertyKeys(obj2).map(key => [key, key])
    }
    for (let i = 0; i < mapping.length; i++) {
        const mappingItem = mapping[i];
        const sKey = mappingItem[0];
        const tKey = mappingItem[1];

        const sKeyList = Array.isArray(sKey) ? sKey : [sKey];

        const val2 = getProperty(obj2, sKeyList);
        const val1 = getProperty(obj1, sKeyList);
        let val = val2;

        // 如果都是对象，合并
        if (isObject(val2) && isObject(val1)) {
            val = mergeObject(val1, val2);
        }

        const tKeyList = Array.isArray(tKey) ? tKey : [tKey];
        setProperty(obj1, tKeyList, val)
    }

    return obj1 as unknown as R;
}

/**
 * 合并多个对象的HOC
 * @param obj 
 * @returns 
 */
export function mergeObjectHOC(obj: any) {
    const hoc = new MergeBaseClass<Object, SourceKeyMapping | undefined>({
        mergeMethod: mergeObject
    });
    hoc.push(obj);
    return hoc
}