import { ObjectRecord } from "src/types";
import { isFunction, isIndex, isNumber, isObject, isSymbol, toKey } from ".";
import { stringToPath } from "./string"

/**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {PropertyKey} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
function baseAssignValue(object: any, key: PropertyKey, value: any) {
    if (key == '__proto__') {
        Object.defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        });
    } else {
        object[key] = value;
    }
}

/**
 * 获取对象属性
 * @param obj 
 * @param property 
 * @param defaultValue 
 * @returns 
 */
export function getProperty<T extends ObjectRecord>(object: T, property: PropertyKey, defaultValue: any = undefined) {
    if (!isObject(object)) {
        return defaultValue;
    }

    if (isNumber(property) || isSymbol(property)) {
        return object[property]
    }

    const path = stringToPath(property);

    let index = -1, length = path.length;

    // Ensure the loop is entered when path is empty.
    if (!length) {
        length = 1;
        object = undefined;
    }
    while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
            index = length;
            value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
    }
    return object;
}

/**
 * 设置属性值
 * @param obj 
 * @param property 
 * @param value 
 * @returns 
 */
export function setProperty(object: Object, property: PropertyKey, value: any = undefined) {

    if (!isObject(object)) {
        return object;
    }

    if (isNumber(property) || isSymbol(property)) {
        return baseAssignValue(value, key, value)
    }

    const path = stringToPath(property);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return object;
        }

        if (index != lastIndex) {
            var objValue = nested[key];
            newValue = undefined;
            if (newValue === undefined) {
                newValue = isObject(objValue)
                    ? objValue
                    : (isIndex(path[index + 1]) ? [] : {});
            }
        }
        baseAssignValue(nested, key, newValue);
        nested = nested[key];
    }
    return object;
}

/**
 * 提取属性生成新的对象
 */
function extractObject(object: Object, kMap: Record<PropertyKey, PropertyKey> = undefined) {

    if (!isObject(object)) {
        return object;
    }

    const ret = Object.create(null);
    if (kMap == null) {
        return { ...ret, ...object }
    }
    Object.keys(kMap).reduce((obj: Object, key: PropertyKey) => {
        setProperty(obj, kMap[key], getProperty(object, key))
        return obj;
    }, ret);

    return ret;
}


/**
 * 合并对象生成新的对象
 * @param obj1 
 * @param obj2 
 * @param ob1KMap 
 * @param ob2KMap 
 * @returns 
 */
export function mergeObject<T = any, S = any, R = any>(
    obj1: T,
    obj2: S,
    ob1KMap: Record<PropertyKey, PropertyKey> = undefined,
    ob2KMap: Record<PropertyKey, PropertyKey> = undefined
): R {

    const ret = Object.create(null);

    Object.assign(ret, extractObject(obj1, ob1KMap));

    Object.assign(ret, extractObject(obj2, ob2KMap));

    return ret;
}