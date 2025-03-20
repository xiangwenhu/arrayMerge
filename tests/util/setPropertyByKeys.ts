import { setPropertyByKeys } from "../../src/utils/object";

const obj = {};


setPropertyByKeys(obj, [Symbol.for("a"), "ccc.dd"], 10)

console.log(obj);