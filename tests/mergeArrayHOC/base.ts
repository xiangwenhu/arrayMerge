import { mergeArrayHOC } from "../../src/array"

const arr1 = [{
    id: 1,
    a: 1
}, {
    id: 2,
    a: 2
}, {
    id: 3,
    a: 3
}]

const arr2 = [{
    id: 1,
    b: 2
}]

const arr3 = [{
    c: 3,
    id: 1,
},{
    c: 3,
    id: 2,
}]

const result = mergeArrayHOC(arr1)
    .push(arr2, {
        sourceKeyMapping: {
            b: "bb"
        },
        enableLog: true
    })
    .push(arr3)
    .merge();

console.log(result);