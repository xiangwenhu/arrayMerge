import { KeyMappingItem, ObjectRecord } from "src/types";
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

    let result = object;
    // Ensure the loop is entered when path is empty.
    if (!length) {
        length = 1;
        result = undefined;
    }
    while (++index < length) {
        var value = result == null ? undefined : result[toKey(path[index])];
        if (value === undefined) {
            index = length;
            value = defaultValue;
        }
        result = isFunction(value) ? value.call(result) : value;
    }
    return result;
}



export function getPropertyByKeys<T extends ObjectRecord>(object: T, keys: PropertyKey[], defaultValue: any = undefined) {
    if (!isObject(object)) {
        return defaultValue;
    }

    let result = object;
    for (let i = 0; i < keys.length; i++) {
        result = getProperty(result, keys[i])
        if (!isObject(result)) return defaultValue
    }
    return result;
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
        return baseAssignValue(object, property, value)
    }

    const path = stringToPath(property);

    const length = path.length, lastIndex = length - 1;

    let result = object, index = -1, nested = result;

    while (nested != null && ++index < length) {
        let key = toKey(path[index]),
            newValue = value;

        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return result;
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
    return result;
}

export function setPropertyByKeys<T extends ObjectRecord>(object: T, keys: PropertyKey[], value: any = undefined) {
    if (!isObject(object)) {
        return object;
    }
    const result = object, len = keys.length;
    let nested: any = object, objValue: any;
    for (let i = 0; i < len; i++) {
        const key = keys[i];
        if (i === len - 1) {
            setProperty(nested, key, value)
        } else {
            objValue = getProperty(nested, key)
            if (isObject(objValue)) {
                nested = objValue;
                continue;
            } else {
                const val = (isIndex(key) ? [] : {});
                setProperty(nested, key, val)
                nested = val;
            }
        }
    }
    return result;
}

/**
 * 提取属性生成新的对象
 */
function extractObject(object: Object, mapping: KeyMappingItem[] | undefined = undefined,) {

    if (!isObject(object)) {
        return object;
    }

    const ret = Object.create(null);
    // 这种情况，不会复制原型上的属性
    if (!Array.isArray(mapping)) {
        return { ...ret, ...object }
    }

    for (let i = 0; i < mapping.length; i++) {
        const mappingItem = mapping[i];
        const sKey = mappingItem[0];
        const val = getPropertyByKeys(object, Array.isArray(sKey) ? sKey : [sKey]);
    }
    return ret;
}


/**
 * 合并对象生成新的对象
 * @param obj1 
 * @param obj2 
 * @param mapping 
 * @param mapping 
 * @returns 
 */
export function mergeObject<T = any, S = any, R = any>(
    obj1: T,
    obj2: S,
    obj1Mapping: KeyMappingItem[] | undefined = undefined,
    obj2Mapping: KeyMappingItem[] | undefined = undefined
): R {

    const ret = Object.create(null);

    Object.assign(ret, extractObject(obj1, obj1Mapping));

    Object.assign(ret, extractObject(obj2, obj2Mapping));

    return ret;
}