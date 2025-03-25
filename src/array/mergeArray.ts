import { MergeBaseClass } from "../MergeBaseClass";
import mergeObject from "../object/mergeObject";
import { MergeArrayOptions } from "../types";

function mergeTwoArray(arr1: any[], arr2: any[]) {
    const len1 = arr1.length;
    const len2 = arr2.length;

    const maxLen = Math.max(len1, len2);

    let index = 0;
    while (index < maxLen) {

        const sItem = arr2[index];
        if (index > len1 - 1) {
            arr1[index] = mergeObject({}, sItem);
            index++
            continue;
        }

        const tItem = arr1[index];
        arr1[index] = mergeObject(tItem, sItem);

        index++

    }

    return arr1
}

/**
 * 多个数组属性覆盖式的合并，不支持属性映射
 * @param arrayList 
 * @returns 
 */
export default function mergeArray(...arrayList: any[]): any[] {
    // 只会合并数组
    const list = arrayList.filter(arr => Array.isArray(arr));

    if (!Array.isArray(list) || list.length === 0) {
        return list
    }
    if (list.length === 1) return list[0]

    const hoc = new MergeBaseClass<Object[], MergeArrayOptions>({
        mergeMethod: mergeTwoArray
    });
    list.forEach(arr => hoc.push(arr))

    return hoc.merge()
}