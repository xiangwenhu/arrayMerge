import assert from "assert"
import { mergeArray } from "../../src"

const dataFactory = {
    getData() {
        const arr1 = [{
            idx: 1,
            name: 'name'
        }, {
            idx: 2,
            name: "nam2"
        }]

        const arr2 = [{
            idx: 1,
            name: 'arr2-name',
            age: 18
        }]

        const arr3 = [{

        }, {
            idx: 2,
            name: "arr3-name",
            sex: "男"
        }]

        return {
            arr1,
            arr2,
            arr3
        }
    }
}

describe('mergeArray', function () {


    describe('#基础属性合并', function () {

        const { arr1, arr2, arr3 } = dataFactory.getData();

        const result = mergeArray(arr1, arr2, arr3)

        console.log(result);

        it('#属性正常复制', function () {
            assert.equal(result[0].name, 'arr2-name');
            assert.equal(result[1].sex, "男");
        });
    });
})