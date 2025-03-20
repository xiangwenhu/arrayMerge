import { setPropertyByKeys } from "../../src/utils/object";

const obj = {};


setPropertyByKeys(obj, ['cc[0]', Symbol.for('a'), 'c.d'], 10)

console.log(obj);