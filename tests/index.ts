import  * as  array from "../src";

const  { mergeArrayObjects } = array;

var arr1 = [{
    p1:1,
    key: 10
}];

var arr2 = [{
    key2: 10,
    p2:2
}]

var arr = mergeArrayObjects(arr1, arr2, {
    sourceKey: "key2",
    targetKey: "key",
});


console.log("arr", arr);