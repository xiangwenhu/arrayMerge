import {mergeArray} from "../../src";

export const usersInfo = Array.from({ length: 5 }, (val, index) => {
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

const symbolUid = Symbol.for("uid");

export const scoresInfo = Array.from({ length: 2 }, (val, index) => {
    return {
        deepKey: {
            [symbolUid]: `${index * 2}`,
        },
        index: index,
        score: ~~(Math.random() * 10000),
        comments: ~~(Math.random() * 10000),
        stars: ~~(Math.random() * 1000)
    }
});


const arr = mergeArray(usersInfo, scoresInfo, {
    sourceKey: ["deepKey", symbolUid],
    targetKey: "deepKey.uid",
    enableLog: true,
    sourceKeyMapping: {
        "score": "a.c.d.s",
        "comments": "data.comments",
        "stars": "stars"
    }
});

console.log("arr", arr);