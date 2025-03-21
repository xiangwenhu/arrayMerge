import { mergeObject } from "../../src"

const obj1 = {
    arr1: [{
        name: "name"
    }],
}

const obj2 = {
    arr1: [{
        name2: "name2",
        age: 18
    }, {
        name3: "name3"
    }]
}



const result = mergeObject(obj1, obj2);

console.log("result:", result)