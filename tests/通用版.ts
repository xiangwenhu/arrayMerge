import { mergeArrayObjects } from "../src";

import * as data from "./data";

const { usersInfo, scoresInfo } = data;


const arr = mergeArrayObjects(usersInfo, scoresInfo, {
    sourceKey: "uid",
    sourceKeyMap: undefined,
    // sourceKeyMap: {
    //     "score": "data.score",
    //     "comments": "data.comments",
    //     "stars": "stars"
    // }
});

console.log("arr", arr);