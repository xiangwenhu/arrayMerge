import { mergeObjectHOC } from "../../src/object"


const obj1 = {
    a: 1
}

const obj2 = {
    b: 2
}

const obj3 = {
    c: 3
}

const result = mergeObjectHOC(obj1)
    .push(obj2, {
        "b": "bb"
    })
    .push(obj3)
    .merge();

console.log(result);