export const usersInfo = Array.from({ length:  15 }, (val, index) => {
    return {
        uid: `${index + 10 }`,
        name: `user-name-${index}`,
        age: index + 10,
        avatar: `http://www.avatar.com/${index + 1}`
    }
});

export const scoresInfo = Array.from({ length: 30 }, (val, index) => {
    return {
        uid: `${index + 2}`,
        score: ~~(Math.random() * 10000),
        comments: ~~(Math.random() * 10000),
        stars: ~~(Math.random() * 1000)
    }
});

