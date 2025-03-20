import { mergeArrayObjects } from "../src";

import * as data from "./data";

const { usersInfo, scoresInfo } = data;


const symbolScore = Symbol.for("score")

const arr = mergeArrayObjects(usersInfo, scoresInfo, {
    sourceKey: "uid",
    enableLog: true,
    // sourceKeyMap: undefined,
    sourceKeyMapping: [
        ["score", ["a.d.0", Symbol.for("a")]],
        ["comments", "data.comments"],
        ["stars", "stars"]
    ]
});

console.log("arr", arr);