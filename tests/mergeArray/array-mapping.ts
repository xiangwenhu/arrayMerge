import { mergeArray } from "../../src";

export const usersInfo = Array.from({ length: 5 }, (val, index) => {
    return {
        uid: `${index + 1}`,
        index: index,
        name: `user-name-${index}`,
        age: index + 10,
        avatar: `http://www.avatar.com/${index + 1}`
    }
});

const symbolUid = Symbol.for("uid");

export const scoresInfo = Array.from({ length: 1 }, (val, index) => {
    return {
        [symbolUid]: `${index * 2}`,
        index: index,
        score: ~~(Math.random() * 10000),
        comments: ~~(Math.random() * 10000),
        stars: ~~(Math.random() * 1000)
    }
});


const result = mergeArray(usersInfo, scoresInfo, {
    sourceKey: symbolUid,
    targetKey: "uid",
    enableLog: true,
    // sourceKeyMap: undefined,
    sourceKeyMapping: [
        ["score", ["a.d.0", Symbol.for("a")]],
        ["comments", "data.comments"],
        ["stars", "stars"]
    ],
    newItem: false
});
console.log("usersInfo[0] === result[0]", usersInfo[0] === result[0]);

console.log("result:", result);

