import { setProperty } from "../../src/utils/object";

const obj = {};

setProperty(obj, ['cc[0]', Symbol.for('a'), 'c.d'], 10)

console.log("obj:", obj);