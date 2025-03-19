export const usersInfo = Array.from({ length:  2 }, (val, index) => {
    return {
        uid: `${index + 1 }`,
        index: index,
        name: `user-name-${index}`,
        age: index + 10,
        avatar: `http://www.avatar.com/${index + 1}`
    }
});

export const scoresInfo = Array.from({ length: 2 }, (val, index) => {
    return {
        uid: `${index + 2}`,
        index: index,
        score: ~~(Math.random() * 10000),
        comments: ~~(Math.random() * 10000),
        stars: ~~(Math.random() * 1000)
    }
});

