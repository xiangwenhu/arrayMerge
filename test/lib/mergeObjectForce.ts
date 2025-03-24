import assert from "assert"
import { mergeObjectForce } from "../../src"

const dataFactory = {
    getData() {
        const object1: any = {
            a: 'a'
        }

        const object2 = {
            b: 'b'
        }

        const object3 = {
            c: 'c'
        }

        return {
            object1,
            object2,
            object3
        }
    }
}

describe("mergeObjectForce", function () {

    describe("#三个对象合并", function () {
        const { object1, object2, object3 } = dataFactory.getData();

        const result = mergeObjectForce(object1, object2, object3);

        it('#属性正常复制', function () {
            assert.equal(result.a, "a");
            assert.equal(result.b, "b");
            assert.equal(result.c, "c");
        });
    })

})


