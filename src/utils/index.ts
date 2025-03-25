import { KeyMappingItem, SourceKeyMapping } from "../types";

const INFINITY = 1 / 0;

export function isObject(value: any) {
    const type = typeof value;
    return value !== null && type === 'object';
}

const reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * https://github.com/lodash/lodash/blob/main/dist/lodash.core.js
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
export function isIndex(value: any) {
    const type = typeof value;
    return (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0);
}

export function isFunction(value: any) {
    return typeof value === "function"
}

export function isSymbol(value: any) {
    return typeof value === "symbol"
}

export function isString(value: any) {
    return typeof value === "string"
}

export function isNumber(value: any) {
    return typeof value === "number"
}


export function toKey(value: any) {
    if (typeof value == 'string' || isSymbol(value)) {
        return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}


export function isPropertyKey(key: any) {
    return isString(key) || isNumber(key) || isSymbol(key)
}

export function isValidKeyOrPaths(key: any) {
    if (Array.isArray(key)) {
        return key.every(k => isPropertyKey(k))
    }
    return isPropertyKey(key);
}

export function toMappingItemList(mapping: SourceKeyMapping): KeyMappingItem[] | undefined {
    if (Array.isArray(mapping)) return mapping;
    if (isObject(mapping)) {
        return Object.keys(mapping).map(key => ([key, mapping[key]]))
    }
    return undefined;
}