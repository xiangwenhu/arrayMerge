import { GetKeyFunction, KeyMappingItem, MergeArrayOptions, ObjectRecord, SourceKeyMapping } from "./types";
import { isFunction, isObject, isPropertyKey, isValidKeyOrPaths, toMappingItemList } from "./utils";
import { arrayToRecord } from "./utils/array";
import { getProperty, mergeObject } from "./utils/object";

const DEFAULT_MERGE_OPTIONS: MergeArrayOptions = {
    sourceKey: "id",
    targetKey: undefined,
    desc: true,
    sourceKeyMapping: undefined,
    maxWalkCount: 1000,
    enableLog: false
}

/**
 * 循环迭代器
 * TODO:: 对象形式
 * @param min 
 * @param max 
 * @param desc 
 * @returns 
 */
function getIterator(min: number, max: number, desc: boolean) {

    let start = desc ? max : min;
    let end = desc ? min : max;

    if (desc) {
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
 * @param options.desc  是否是从后往前遍历
 * @param options.sourceKey  源数组对象的key
 * @param options.targetKey  目标数组对象的key
 * @param options.keyMap  源复制map关系
 * @returns 
 */
export function mergeArray<S = ObjectRecord, T = ObjectRecord, R = ObjectRecord>(targetArr: T[] = [], sourceArr: S[] = [], options: MergeArrayOptions<S, T> = DEFAULT_MERGE_OPTIONS): R[] {
    // 有一个不是数组
    if (!Array.isArray(sourceArr) || !Array.isArray(targetArr)) {
        return targetArr as any;
    }

    let { targetKey, sourceKey, enableLog, desc, sourceKeyMapping, maxWalkCount, newItem }: MergeArrayOptions = { ...DEFAULT_MERGE_OPTIONS, ...options };

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

    const iterator = getIterator(0, targetLen - 1, desc);

    const mapping = toMappingItemList(sourceKeyMapping);

    while (iterator.hasNext()) {

        const index = iterator.current;
        walkCounts++

        if (walkCounts > maxWalkCount) {
            console.error(`mergeArray: 遍历次数超过最大遍历次数 ${maxWalkCount}, 终止遍历，请检查程序逻辑`);
            break;
        }

        tempTItem = targetArr[index];
        // 不更改原对象，需deepClone??
        tempTItem = newItem ? { ...tempTItem } : tempTItem;

        // 目标值
        const tKey = getTargetKeyFn(tempTItem);

        const tKeyValue = getProperty(tempTItem, tKey);
        // 通过tKey从sRecord查找
        const tempSItem = getProperty(sRecord, tKeyValue);


        if (!isPropertyKey(tKey) || tempSItem == undefined) {
            resultArr[index] = tempTItem;
            iterator.next()
            continue;
        }
        resultArr[index] = mergeObject(tempTItem, tempSItem, mapping);
        hitCounts++
        if (hitCounts >= sourceLen) {
            break;
        }
        iterator.next()
    }
    if (enableLog) {
        console.log(`mergeArray:: sourceArr(${sourceLen}), 统计：遍历次数${walkCounts}, 命中次数${hitCounts}`);
    }
    return resultArr as R[];
}
