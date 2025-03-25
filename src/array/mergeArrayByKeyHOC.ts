import { MergeBaseClass } from "../MergeBaseClass";
import { MergeArrayOptions } from "../types";
import mergeArrayByKey from "./mergeArrayByKey";

/**
 * 根据key合并数组的HOC，支持属性映射
 * @param array 
 * @returns 
 */
export default function mergeArrayByKeyHOC(array: any[]) {
    const hoc = new MergeBaseClass<Object[], MergeArrayOptions>({
        mergeMethod: mergeArrayByKey
    });
    hoc.push(array);
    return hoc
}
