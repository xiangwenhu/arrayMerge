import { describe } from "mocha"
import { mergeObject } from "../../src"
import assert from "assert"

const dataFactory = {
    getData() {
        const object1: any = {
            p1: "p1",
            arr1: [{
                name: "name"
            }],
        }
        const object2 = {
            p2: "p2",
            id: 2,
            arr1: [{
                name2: "name2",
                age: 18
            }, {
                name3: "name3"
            }]
        }
        return {
            object1,
            object2
        }
    }
}

describe("mergeObject", function () {


    describe("#第一个参数是非对象", function () {
        const { object1, object2 } = dataFactory.getData();

        const result = mergeObject(null, object2)

        it('#第一个值是null', function () {
            assert.equal(result, null);
        });

        const result2 = mergeObject(1, object2)

        it('#第一个值是数字', function () {
            assert.equal(result2, 1);
        });

        const symbol = Symbol.for("s");
        const result3 = mergeObject(symbol, object2)
        it('#第一个值Symbol', function () {
            assert.equal(result3, symbol);
        });


        const result4 = mergeObject(object1, null)

        it('#第二个值是null', function () {
            assert.equal(result4, object1);
        });

        const result5 = mergeObject(object1, 1)

        it('#第二个值是数字', function () {
            assert.equal(result5, object1);
        });

        const symbol2 = Symbol.for("s");
        const result6 = mergeObject(object1, symbol)
        it('#第二个值Symbol', function () {
            assert.equal(result6, object1);
        });

    })


    describe("#基础合并", function () {
        const { object1, object2 } = dataFactory.getData();

        mergeObject(object1, object2)

        it('#属性正常复制', function () {
            assert.equal(object1.p2, "p2");
            assert.equal(object1.id, 2);
        });
    })


    describe("#数组属性", function () {
        const { object1, object2 } = dataFactory.getData();

        mergeObject(object1, object2)

        it('#属性正常复制', function () {
            assert.equal(object1.arr1[0].name2, "name2");
            assert.equal(object1.arr1[0].age, "18");
        });
    })

})