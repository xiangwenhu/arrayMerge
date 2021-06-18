import { mergeArray } from "../lib/array";

import * as datas from "./data";

const { usersInfo, scoresInfo } = datas;


const arr = mergeArray(usersInfo, scoresInfo, {
    sourceKey: "uid",
    targetKey: "uid",
    sKMap: {
        "score": "data.score",
        "comments": "data.comments"
    }
});

console.log("arr", arr);