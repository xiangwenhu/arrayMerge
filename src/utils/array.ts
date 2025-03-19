import { isPropertyKey } from ".";
import { setProperty } from "./object";

export function arrayToRecord<T extends Record<PropertyKey, T>>(arr: T[], getKeyFun: (data: T) => PropertyKey) {
    const result: T = arr.reduce((obj: Record<PropertyKey, T>, cur: T) => {
        const key = getKeyFun(cur);
        if (isPropertyKey(key)) {
            setProperty(obj, key, cur);
        }
        return obj;
    }, Object.create(null));
    return result;
}

