/**
 * 循环迭代器
 * TODO:: 对象形式
 * @param min 
 * @param max 
 * @param desc 
 * @returns 
 */
export function getIterator(min: number, max: number, isBackward: boolean) {

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