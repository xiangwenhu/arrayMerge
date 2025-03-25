import { MergeBaseClass } from "../MergeBaseClass";
import { SourceKeyMapping } from "../types";
import  mergeObject  from "./mergeObject";


/**
 * 多个对象合并，不支持属性映射
 * @param objectList 
 * @returns 
 */
export default function mergeObjectForce(...objectList: any[]): any {
    if (!Array.isArray(objectList) || objectList.length <= 1) {
        return objectList
    }

    const hoc = new MergeBaseClass<Object, SourceKeyMapping | undefined>({
        mergeMethod: mergeObject
    });
    objectList.forEach(arr => hoc.push(arr))

    return hoc.merge()
}