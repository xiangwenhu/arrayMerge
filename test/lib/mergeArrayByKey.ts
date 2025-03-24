import assert from "assert";
import { mergeArrayByKey } from "../../src";

const symbolUid = Symbol.for("uid");


const dataFactory = {
    getData() {
        const users = Array.from({ length: 5 }, (val, index) => {
            return {
                uid: `${index + 1}`,
                index: index,
                name: `user-name-${index}`,
                age: index + 10,
                avatar: `http://www.avatar.com/${index + 1}`
            }
        });


        const scores = Array.from({ length: 6 }, (val, index) => {
            return {
                [symbolUid]: `${index + 2}`,
                index: index,
                score: ~~(Math.random() * 10000),
                comments: ~~(Math.random() * 10000),
                stars: ~~(Math.random() * 1000)
            }
        });

        return {
            users,
            scores
        }
    },

    getDeepKeyData() {
        const users = Array.from({ length: 5 }, (val, index) => {
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

        const scores = Array.from({ length: 6 }, (val, index) => {
            return {
                deepKey: {
                    [symbolUid]: `${index + 2}`,
                },
                index: index,
                score: ~~(Math.random() * 10000),
                comments: ~~(Math.random() * 10000),
                stars: ~~(Math.random() * 1000)
            }
        });

        return {
            users,
            scores
        }
    }
}




describe('mergeArrayByKey', function () {
    describe('#newItem:false', function () {

        const { users, scores } = dataFactory.getData();

        const result = mergeArrayByKey(users, scores, {
            sourceKey: symbolUid,
            targetKey: "uid",
            enableLog: false,
            newItem: false
        });

        it('合并后的结果第一项等于targetArr第一项', function () {
            assert.equal(users[0], result[0]);
        });
    });

    describe('#newItem:true', function () {

        const { users, scores } = dataFactory.getData();

        const result = mergeArrayByKey(users, scores, {
            sourceKey: symbolUid,
            targetKey: "uid",
            enableLog: false,
            newItem: true
        });

        it('合并后的结果第一项不等于targetArr第一项', function () {
            assert.notEqual(users[0], result[0]);
        });
    });

    describe('#maxWalkCount', function () {

        const { users, scores } = dataFactory.getData();

        const result = mergeArrayByKey(users, scores, {
            sourceKey: symbolUid,
            targetKey: "uid",
            enableLog: false,
            newItem: false,
            maxWalkCount: 1
        });

        it('索引值为1的对象未合并到属性', function () {
            assert.equal(result[1].comments, undefined);
        });
    });



    describe("#复杂的sourceKey和targetKey", function () {

        const { users, scores } = dataFactory.getDeepKeyData();

        const result = mergeArrayByKey(users, scores, {
            sourceKey: ["deepKey", symbolUid],
            targetKey: "deepKey.uid",
            enableLog: false,
            sourceKeyMapping: {
                "score": "a.c.d.s",
                "comments": "data.comments",
                "stars": "stars"
            }
        });

        it('sourceKey:["deepKey", symbolUid]', function () {
            const m1 = result[1];
            assert.equal(typeof m1.data.comments === "number", true);
        });
    });

    describe(`#sourceKeyMapping`, function () {

        const { users, scores } = dataFactory.getDeepKeyData();

        const result = mergeArrayByKey(users, scores, {
            sourceKey: ["deepKey", symbolUid],
            targetKey: "deepKey.uid",
            enableLog: false,
            sourceKeyMapping: {
                "score": "a.c.d.s",
                "comments": "data.comments",
                "stars": "stars"
            }
        });

        it(`"comments"=>"data.comments"`, function () {
            const m1 = result[1];
            assert.equal(typeof m1.data.comments === "number", true);
        });
    });
});




