import { mergeArrayHOC } from "../../src/array"

const arr1 = [{
    id: 1,
    a: 1
}, {
    id: 2,
    a: 2
}]

const arr2 = [{
    id: 1,
    b: 2
}]

const arr3 = [{
    c: 3,
    id: 1,
}]

const result = mergeArrayHOC(arr1)
    .push(arr2, {
        sourceKeyMapping: {
            b: "bb"
        }
    })
    .push(arr3)
    .merge();

console.log(result);