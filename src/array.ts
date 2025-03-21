import { MergeBaseClass } from "./MergeBaseClass";
import { mergeObject } from "./object";
import { EnumTraverseMode, GetKeyFunction, MergeArrayOptions, ObjectRecord } from "./types";
import { isFunction, isPropertyKey, isValidKeyOrPaths, toMappingItemList } from "./utils";
import { arrayToRecord } from "./utils/array";
import { getProperty } from "./utils/object";

const DEFAULT_MERGE_OPTIONS: MergeArrayOptions = {
    sourceKey: "id",
    targetKey: undefined,
    mode: EnumTraverseMode.Forward,
    sourceKeyMapping: undefined,
    maxWalkCount: 1000,
    enableLog: false,
    newItem: false
}

/**
 * 循环迭代器
 * TODO:: 对象形式
 * @param min 
 * @param max 
 * @param desc 
 * @returns 
 */
function getIterator(min: number, max: number, isBackward: boolean) {

    let start = isBackward ? max : min;
    let end = isBackward ? min : max;

    if (isBackward) {
        return {
            hasNext() {
                return start >= end
            },
            get current() {
                return start;
            },
            next() {
                return --start
            }
        }
    }
    return {
        hasNext() {
            return end >= start
        },
        get current() {
            return start;
        },
        next() {
            return ++start
        }
    }
}


/**
 * 合并数组生成新的数组
 * @param targetArr 目标数组
 * @param sourceArr 需要被合并的数组
 * @param options   选项
 * @returns 
 */
export function mergeArray<S = ObjectRecord, T = ObjectRecord, R = ObjectRecord>(targetArr: T[] = [], sourceArr: S[] = [], options: MergeArrayOptions<S, T> = DEFAULT_MERGE_OPTIONS): R[] {
    // 有一个不是数组
    if (!Array.isArray(sourceArr) || !Array.isArray(targetArr)) {
        return targetArr as any;
    }

    let { targetKey, sourceKey, enableLog, mode, sourceKeyMapping, maxWalkCount, newItem }: MergeArrayOptions = { ...DEFAULT_MERGE_OPTIONS, ...options };

    if (!isValidKeyOrPaths(sourceKey) && !isFunction(sourceKey)) {
        console.error("无效的sourceKey");
        return targetArr as any[];
    }
    if (!isPropertyKey(targetKey)) {
        targetKey = sourceKey;
    }
    if (!isValidKeyOrPaths(targetKey) && !isFunction(targetKey)) {
        console.error("无效的targetKey");
        return targetArr as any[];
    }

    const getSourceKeyFn: GetKeyFunction = (isFunction(sourceKey) ? sourceKey : () => sourceKey) as GetKeyFunction;
    const getTargetKeyFn: GetKeyFunction = (isFunction(targetKey) ? targetKey : () => targetKey) as GetKeyFunction

    const sRecord = arrayToRecord(sourceArr as Record<PropertyKey, any>[], getSourceKeyFn);

    const sourceLen = sourceArr.length, targetLen = targetArr.length;
    let hitCounts = 0, walkCounts = 0, resultArr = [], tempTItem;

    const iterator = getIterator(0, targetLen - 1, mode === EnumTraverseMode.Backward);

    const mapping = toMappingItemList(sourceKeyMapping);

    while (iterator.hasNext()) {
        const index = iterator.current;
        tempTItem = targetArr[index];


        if (walkCounts >= maxWalkCount) {
            if (enableLog) {
                console.error(`mergeArray: 遍历次数超过最大遍历次数 ${maxWalkCount}, 终止遍历，请检查程序逻辑`);
            }
            resultArr[index] = tempTItem;
            iterator.next()
            continue;
        }

        walkCounts++;

        if (hitCounts >= sourceLen) {
            if (enableLog) {
                console.log(`mergeArray:: sourceArr (${sourceLen}) 已遍历完, 直接赋值索引为${index}的数据项`);
            }
            resultArr[index] = tempTItem;
            iterator.next()
            continue;
        }

        // 不更改原对象，需deepClone??
        tempTItem = newItem ? { ...tempTItem } : tempTItem;

        // 目标值
        const tKey = getTargetKeyFn(tempTItem);

        const tKeyValue = getProperty(tempTItem, tKey);

        if (!isPropertyKey(tKeyValue)) {
            resultArr[index] = tempTItem;
            iterator.next()
            continue;
        }

        // 通过tKey从sRecord查找
        const tempSItem = getProperty(sRecord, tKeyValue);

        if (!isPropertyKey(tKey) || tempSItem == undefined) {
            resultArr[index] = tempTItem;
            iterator.next()
            continue;
        }
        resultArr[index] = mergeObject(tempTItem, tempSItem, mapping);
        hitCounts++

        iterator.next()
    }
    if (enableLog) {
        console.log(`mergeArray:: targetArr (${targetLen}), 统计：遍历次数${walkCounts}, 命中次数${hitCounts}`);
    }
    return resultArr as R[];
}

/**
 * 合并多个数组的HOC
 * @param array 
 * @returns 
 */
export function mergeArrayHOC(array: any[]) {
    const hoc = new MergeBaseClass<Object[], MergeArrayOptions>({
        mergeMethod: mergeArray
    });
    hoc.push(array);
    return hoc
}