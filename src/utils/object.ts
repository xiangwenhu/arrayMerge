import { isFunction, isIndex, isNumber, isObject, isSymbol, toKey } from ".";
import { ObjectRecord } from "../types";
import { stringToPath } from "./string";

/**
   * https://github.com/lodash/lodash/blob/main/dist/lodash.core.js
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
 * https://github.com/lodash/lodash/blob/main/dist/lodash.core.js
 * 获取对象属性
 * @param obj 
 * @param property 
 * @param defaultValue 
 * @returns 
 */
function getPropertyInner<T extends ObjectRecord>(object: T, property: PropertyKey, defaultValue: any = undefined) {
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



export function getProperty<T extends ObjectRecord>(object: T, paths: PropertyKey | PropertyKey[], defaultValue: any = undefined) {
    if (!isObject(object)) {
        return defaultValue;
    }

    const keys = Array.isArray(paths) ? paths : [paths]

    let result = object;
    const len = keys.length;
    for (let index = 0; index < len; index++) {
        result = getPropertyInner(result, keys[index])
        // 不是最后一个
        if (index != len - 1) {
            // 不是对象，直接返回
            if (!isObject(result)) return defaultValue
            continue;
        }
    }
    return result === undefined ? defaultValue : result;
}


/**
 * https://github.com/lodash/lodash/blob/main/dist/lodash.core.js
 * 设置属性值
 * @param obj 
 * @param property 
 * @param value 
 * @returns 
 */
function setPropertyInner(object: Object, property: PropertyKey, value: any = undefined) {

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

export function setProperty<T extends ObjectRecord>(object: T, paths: PropertyKey | PropertyKey[], value: any = undefined) {
    if (!isObject(object)) {
        return object;
    }
    const keys = Array.isArray(paths) ? paths : [paths]

    const result = object, len = keys.length;
    let nested: any = object, objValue: any;
    for (let index = 0; index < len; index++) {
        const key = keys[index];


        if (index === len - 1) { // 最后一个，直接设值
            setPropertyInner(nested, key, value)
        } else {
            // 取值
            objValue = getPropertyInner(nested, key)
            if (isObject(objValue)) { // 是对象，继续
                nested = objValue;
                continue;
            } else {
                // 不是对象，判断下一个key的是不是索引，如果是创建数组，反之创建对象
                const val = (isIndex(keys[index + 1]) ? [] : {});
                setPropertyInner(nested, key, val)
                nested = val;
            }
        }
    }
    return result;
}


export function getOwnPropertyKeyList(object: any) {
    let obj = Object(object);

    const list: PropertyKey[] = Object.getOwnPropertyNames(obj);
    return list.concat(Object.getOwnPropertySymbols(obj))
}