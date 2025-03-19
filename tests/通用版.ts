import { mergeArray } from "../src";

import * as data from "./data";

const { usersInfo, scoresInfo } = data;


const arr = mergeArray(usersInfo, scoresInfo, {
    sourceKey: "uid",
    keyMap: {
        "score": "data.score",
        "comments": "data.comments",
        "stars": "stars"
    }
});

console.log("arr", arr);