import { GetKeyFunction, PropertyKeyOrPaths } from "../types";
import { isFunction, isValidKeyOrPaths } from ".";
import { getProperty, setProperty } from "./object";

/**
 * 数组转Record
 * @param arr 数组
 * @param key PropertyKey 或者 PropertyKey列表
 * @returns 
 */
export function arrayToRecord<T>(arr: T[], key: PropertyKeyOrPaths | GetKeyFunction<T>) {
    const keyExtractFun = (isFunction(key) ? key : () => key) as GetKeyFunction<T>;

    const result: T = arr.reduce((obj: Record<PropertyKey, T>, cur: T) => {
        const keyProperty = keyExtractFun(cur);
        if (isValidKeyOrPaths(keyProperty)) {
            const keyValue = getProperty(cur, keyProperty);
            if (isValidKeyOrPaths(keyValue)) {
                setProperty(obj, keyValue, cur);
            }
        }
        return obj;
    }, Object.create(null));

    return result;
}