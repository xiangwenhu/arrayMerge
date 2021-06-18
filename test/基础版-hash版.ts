import * as datas from "./data";

const { usersInfo, scoresInfo } = datas;

console.time("merge data")

const scoreMap = scoresInfo.reduce((obj, cur) => {
    obj[cur.uid] = cur;
    return obj;
}, Object.create(null));


for (let i = 0; i < usersInfo.length; i++) {
    const user = usersInfo[i] as any;
    const score = scoreMap[user.uid];

    if(score != null){
        user.score = score.score;
        user.comments = score.comments;
        user.stars = score.stars;
    }
}
console.timeEnd("merge data")

console.log(usersInfo);