import { SourceKeyMapping } from "../types";
import { isObject, toMappingItemList } from "../utils";
import { getOwnPropertyKeys, getProperty, setProperty } from "../utils/object";

/**
 * 合并两个对象生成新的对象，支持属性映射
 * @param object1 
 * @param object2 
 * @param obj2Mapping 
 * @returns 
 */
export default function mergeObject<T = any, S = any, R extends T = T>(
    object1: T,
    object2: S,
    obj2Mapping: SourceKeyMapping | undefined = undefined
): R {

    if(!isObject(object1) || !isObject(object2)) {
        return object1 as unknown as R;
    }


    let mapping = toMappingItemList(obj2Mapping);
    if (mapping === undefined) {
        mapping = getOwnPropertyKeys(object2).map(key => [key, key])
    }
    for (let i = 0; i < mapping.length; i++) {
        const mappingItem = mapping[i];
        const sKey = mappingItem[0];
        const tKey = mappingItem[1];

        const sKeyList = Array.isArray(sKey) ? sKey : [sKey];

        const val2 = getProperty(object2, sKeyList);
        const val1 = getProperty(object1, sKeyList);
        let val = val2;

        // 如果都是对象，合并
        if (isObject(val2) && isObject(val1)) {
            val = mergeObject(val1, val2);
        }

        const tKeyList = Array.isArray(tKey) ? tKey : [tKey];
        setProperty(object1, tKeyList, val)
    }

    return object1 as unknown as R;
}
