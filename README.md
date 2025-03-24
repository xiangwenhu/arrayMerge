# merge-js
**起因**: 服务端丢给前端2份数据，需要前端根据某种条件进行数据合并。离谱，问就是历史问题，改动成本大。   
**目标**：通用合并，高效，适用性强。   

特性
  * 支持对象合并：不问属性路径深浅，支持属性映射。
  * 支持数组合并：不问属性路径深浅，支持属性映射，支持顺序和倒序。


## API 文档

## 示例

### mergeObject: 属性映射

```js
import { mergeObject } from "merge-js"

const object1: any = {
    p1: "p1",
    id: 1
}
const object2 = {
    p2: "p2",
    id: 2,
}

mergeObject(object1, object2, {
    "id": "id2"
})

console.log("object1:", object1)

// 输出：
// object1: { p1: 'p1', id: 1, id2: 2 }
```

### mergeObject: 多级属性含Symbol映射
```typescript
import { mergeObject } from "merge-js"

const symbolName = Symbol.for("name");

const object1: any = {
    p1: "p1",
    id: 1,

}
const object2 = {
    p2: "p2",
    id: 2,
    product: {
        [symbolName]: "productName"
    }
}

mergeObject(object1, object2, [
   [ "id", "id2"],
   [["product", symbolName], "productName"]    
])

console.log("object1:", object1)

// 输出：
// object1: { p1: 'p1', id: 1, id2: 2, productName: 'productName' }
```


### mergeObject: 数组属性合并

```typescript
import { mergeObject } from "merge-js"

const object1: any = {
    arr1: [{
        name: "name"
    }],
}
const object2 = {
    arr1: [{
        name: "arr1-0-name",
        age: 18
    }, {
        name: "arr1-1-name"
    }]
}

mergeObject(object1, object2)

console.log("object1:", object1)

// 输出：
// object1: { arr1: [ { name: 'arr1-0-name', age: 18 }, { name: 'arr1-1-name' } ] }

```

### mergeObject: 数组属性映射
```typescript
import { mergeObject } from "merge-js"

const object1: any = {
    arr1: [{
        name: "name"
    }],
}
const object2 = {
    arr1: [{
        name: "arr1-0-name",
        age: 18
    }, {
        name: "arr1-1-name"
    }]
}

mergeObject(object1, object2, {
    "arr1[0].name": "arr1[0].arr1Name",
    "arr1[0].age": "arr1[0].age",
    "arr1[1].name": "arr1[1].arr1Name",
})

console.log("object1:", object1)

// 输出：
// object1: {
//   arr1: [
//     { name: 'name', arr1Name: 'arr1-0-name', age: 18 },
//     { arr1Name: 'arr1-1-name' }
//   ]
// }
```

### mergeObjectHOC: 多个对象带映射的合并
其映射能力和mergeObject一样，只不过支持多个对象合并。
```typescript
import { mergeObjectHOC } from "merge-js";

const object1: any = {
    a: 'a'
}
const object2 = {
    a: 'object2-a'
}
const object3 = {
    a: 'object3-a'
}

const result = mergeObjectHOC(object1)
    .push(object2, {
        "a": "a2"
    })
    .push(object3, {
        a: "a3"
    })
    .merge();

console.log(result);

// 输出：
// { a: 'a', a2: 'object2-a', a3: 'object3-c' }
```


### mergeObjectForce
不具备属性映射
```typescript
import { mergeObjectForce } from "merge-js"

const object1: any = {
    a: 'a'
}

const object2 = {
    b: 'b'
}

const object3 = {
    c: 'c',
    a: "object3-a"
}

const result = mergeObjectForce(object1, object2, object3);

console.log("result:", result);

// 输出：
// result: { a: 'object3-a', b: 'b', c: 'c' }
```

### mergeArrayByKey: 多级属性 + 含Symbol + 映射
```typescript
import { mergeArrayByKey } from "merge-js";

const symbolUid = Symbol.for("uid");
const users = Array.from({ length: 1 }, (val, index) => {
    return {
        deepKey: {
            uid: `${index + 1}`,
        },
        index: index,
        name: `user-name-${index}`,
        age: index + 10,
        avatar: `http://www.avatar.com/${index + 1}`
    }
});

const scores = Array.from({ length: 2 }, (val, index) => {
    return {
        deepKey: {
            [symbolUid]: `${index}`,
        },
        index: index,
        score: ~~(Math.random() * 10000),
        comments: ~~(Math.random() * 10000),
        stars: ~~(Math.random() * 1000)
    }
});

const result = mergeArrayByKey(users, scores, {
    sourceKey: ["deepKey", symbolUid],
    targetKey: "deepKey.uid",
    enableLog: false,
    newItem: false,
    sourceKeyMapping: {
        "score": "data.score",
        "comments": "data.comments",
        "stars": "data.stars"
    }
});

console.log("result:", result);
// 输出：
// result: [
//   {
//     deepKey: { uid: '1' },
//     index: 0,
//     name: 'user-name-0',
//     age: 10,
//     avatar: 'http://www.avatar.com/1',
//     data: { score: 5060, comments: 5092, stars: 573 }
//   }
// ]

```

### mergeArrayByKeyHOC
其映射能力和 mergeArrayByKey 一样，只不过支持多个对象合并。
```typescript
import { mergeArrayByKeyHOC } from "merge-js";

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
    b: 1
}]

const arr3 = [{
    c: 2,
    id: 2,
}, {
    c: 3,
    id: 3,
}]

const result = mergeArrayByKeyHOC(arr1)
    .push(arr2)
    .push(arr3)
    .merge();

console.log("result:", result);

// 输出
// result: [ { id: 1, a: 1, b: 1 }, { id: 2, a: 2, c: 2 }, { id: 3, a: 3, c: 3 } ]

```


### mergeArray 
```typescript
import { mergeArray } from "merge-js";

const arr1 = [{
    idx: 1,
    name: 'name'
}, {
    idx: 2,
    name: "nam2"
}]

const arr2 = [{
    idx: 1,
    name: 'arr2-name',
    age: 18
}]

const arr3 = [{
    idx: 2,
    name: "arr3-name",
    sex: "男"
}]


const result = mergeArray(arr1, arr2, arr3)

console.log(result);

// [
//   { idx: 2, name: 'arr3-name', age: 18, sex: '男' },
//   { idx: 2, name: 'nam2' }
// ]


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
- [x] 支持合并多个对象(HOC) (2025-03-21)
- [x] 支持合并多个数组(HOC)  (2025-03-21) 