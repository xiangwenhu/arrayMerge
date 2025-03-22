import assert from "assert";
import { getProperty } from "../../../src/utils/object";


const symbolA = Symbol.for("a");
const obj = {
    a: {
        b: [{
            [symbolA]: 'symbolA'
        }]
    },
    order: {
        id: 1000,
        products: [
            {
                name: "鞋子",
                price: 100
            }
        ],
        address: {
            province: "湖北"
        }
    }
};


describe("getProperty", function () {

    describe(`#多级带Symbol属性: getProperty(obj, ["a.b", 0, symbolA])`, function () {

        const result = getProperty(obj, ["a.b", 0, symbolA])

        it(`正常取值`, function () {
            assert.equal(result, 'symbolA')
        });

    })
})



