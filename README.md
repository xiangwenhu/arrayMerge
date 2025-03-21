# array-object-Merge
* 对象合并
* 数组合并：不问属性路径深浅，顺序遍历，倒叙遍历都支持，高效合并数据方案


## 示例
```js
import  * as array from "../index";

const  { mergeArray } = array;

var arr1 = [{
    p1:1,
    key: 10
}];

var arr2 = [{
    key2: 10,
    p2:2
}]

var arr = mergeArray(arr1, arr2, {
    sourceKey: "key2",
    targetKey: "key",
});


console.log("arr", arr);
```


## TODO::
- [x] 对象属性重名属性的情况 
    * 指定 sourceKeyMap 就是只转换指定的属性, 会覆盖
    * 未设置 sourceKeyMap 全部转换，会覆盖
- [x] 支持多级属性映射，包含Symbol
```typescript
const obj = {};
setPropertyByKeys(obj, [Symbol.for("a"), "ccc.dd"], 10)
console.log(obj);

// { [Symbol(a)]: { ccc: { dd: 10 } } }
```
- [x] 支持合并对象 (2025-03-20)
- [x] 支持合并多个对象 (2025-03-21)
- [x] 支持合并多个数组  (2025-03-21) 