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