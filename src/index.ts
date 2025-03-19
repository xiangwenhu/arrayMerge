import { GetKeyFunction, MergeOptions, ObjectRecord } from "./types";
import { isFunction, isPropertyKey } from "./utils";
import { arrayToRecord } from "./utils/array";
import { getProperty, mergeObject } from "./utils/object";

const DEFAULT_MERGE_OPTIONS: MergeOptions = {
    sourceKey: "id",
    targetKey: undefined,
    desc: true,
    keyMap: undefined,
}

/**
 * 循环迭代器
 * TODO:: 对象形式
 * @param min 
 * @param max 
 * @param desc 
 * @returns 
 */
function getStepIter(min: number, max: number, desc: boolean) {

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

const MAX_WALK_COUNT = 10000;


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
export function mergeArray<S = ObjectRecord, T = ObjectRecord, R = ObjectRecord>(targetArr: T[] = [], sourceArr: S[] = [], options: MergeOptions<S, T> = DEFAULT_MERGE_OPTIONS): R[] {

    // 有一个不是数组
    if (!Array.isArray(sourceArr) || !Array.isArray(targetArr)) {
        return targetArr as any;
    }

    const opt: MergeOptions = { ...DEFAULT_MERGE_OPTIONS, ...options };

    if (!isPropertyKey(options.sourceKey) && !isFunction(options.sourceKey)) {
        console.error("无效的sourceKey");
        return targetArr as any[];
    }

    let { targetKey, sourceKey } = opt;
    if (!isPropertyKey(targetKey)) {
        targetKey = opt.sourceKey;
    }

    const getSourceKeyFn: GetKeyFunction = isFunction(sourceKey) ?
        sourceKey as GetKeyFunction :
        (() => sourceKey) as GetKeyFunction;

    const getTargetKeyFn: GetKeyFunction = isFunction(targetKey) ?
        opt.targetKey as GetKeyFunction :
        (() => targetKey) as GetKeyFunction

    const sRecord = arrayToRecord(sourceArr as Record<PropertyKey, any>[], getSourceKeyFn);

    const { desc, keyMap } = opt;

    const sourceLen = sourceArr.length;
    let hitCounts = 0;
    let walkCounts = 0;

    let resultArr = [];
    const targetLen = targetArr.length;
    let tempTItem;

    const stepIter = getStepIter(0, targetLen - 1, desc);

    while (stepIter.hasNext()) {

        const index = stepIter.current;

        walkCounts++

        if (walkCounts > MAX_WALK_COUNT) {
            console.error(`mergeArray 遍历次数超过最大遍历次数 ${MAX_WALK_COUNT}, 终止遍历，请检查程序逻辑`);
            break;
        }

        tempTItem = targetArr[index];

        // 目标值
        const tKey = getTargetKeyFn(tempTItem);

        // 通过tKey从sRecord查找
        const tempSItem = getProperty(sRecord, tKey);

        if (!isPropertyKey(tKey) || tempSItem == undefined) {
            stepIter.next()
            continue;
        }
        resultArr[index] = mergeObject(tempTItem, tempSItem, undefined, keyMap);
        hitCounts++
        if (hitCounts >= sourceLen) {
            break;
        }

        stepIter.next()
    }

    console.log(`mergeArray:: sourceArr(${sourceLen}), 统计：遍历次数${walkCounts}, 命中次数${hitCounts}`);
    return resultArr as any[];
}
