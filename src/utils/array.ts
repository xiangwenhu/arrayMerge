import { isPropertyKey } from ".";
import { getProperty, setProperty } from "./object";

export function arrayToRecord<T extends Record<PropertyKey, T>>(arr: T[], getKeyFun: (data: T) => PropertyKey) {
    const result: T = arr.reduce((obj: Record<PropertyKey, T>, cur: T) => {
        const key = getKeyFun(cur);
        if (isPropertyKey(key)) {
            const keyValue = getProperty(cur, key);
            setProperty(obj, keyValue, cur);
        }
        return obj;
    }, Object.create(null));
    return result;
}

