import { mergeObject } from "../../src"

const obj1 = {
    p1: "p1",
}
const obj2 = {
    p2: "p1",
    id: 2
}
const result = mergeObject(obj1, obj2);
console.log("result:", result)