import assert from "assert"
import { mergeArrayHOC } from "../../src"

const dataFactory = {
    getData() {
        const arr1 = [{
            id: 1,
            a: 1
        }, {
            id: 2,
            a: 2
        }, {
            id: 3,
            a: 3
        }]

        const arr2 = [{
            id: 1,
            b: 1
        }]

        const arr3 = [{
            c: 1,
            id: 1,
        }, {
            c: 2,
            id: 2,
        }]

        return {
            arr1,
            arr2,
            arr3
        }
    }
}

describe('mergeArrayHOC', function () {


    describe('#基础属性合并', function () {

        const { arr1, arr2, arr3 } = dataFactory.getData();

        const result = mergeArrayHOC(arr1)
            .push(arr2)
            .push(arr3)
            .merge();

        console.log(result);

        it('#属性正常复制', function () {
            assert.equal(result[0].b, 1);
            assert.equal(result[0].c, 1);
        });
    });
})