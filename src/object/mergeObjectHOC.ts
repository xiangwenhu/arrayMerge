import { MergeBaseClass } from "../MergeBaseClass";
import { SourceKeyMapping } from "../types";
import mergeObject from "./mergeObject";

/**
 * 合并多个对象的HOC，支持属性映射
 * @param obj 
 * @returns 
 */
export default function mergeObjectHOC(obj: any) {
    const hoc = new MergeBaseClass<Object, SourceKeyMapping | undefined>({
        mergeMethod: mergeObject
    });
    hoc.push(obj);
    return hoc
}


