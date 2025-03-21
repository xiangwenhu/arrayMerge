import { mergeObject } from "../../src"

const obj1 = {
    p1: "p1",
    arr1: [{
        name: "name"
    }],
    id: 1
}

const obj2 = {
    p2: "p1",
    arr1: [{
        name2: "name2",
        age: 18
    }, {
        name3: "name3"
    }],
    id: 2
}



const result = mergeObject(obj1, obj2);

console.log("result:", result)