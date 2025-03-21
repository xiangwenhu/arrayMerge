import { getProperty } from "../../src/utils/object";


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
                price:  100
            }
        ],
        address: {
            province: "湖北"
        }
    }
};


const result = getProperty(obj, ["a.b", 0, symbolA])

console.log(result);