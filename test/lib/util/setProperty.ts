import assert from "assert";
import { setProperty } from "../../../src/utils/object";


describe("setProperty", function () {

    describe("#多级带Symbol属性", function () {

        const symbolA = Symbol.for('a');
        const obj: any = {};

        setProperty(obj, ['cc[0]', symbolA, 'c.d'], 10)

        it(`属性正常赋值`, function () {
            assert.equal(obj.cc[0][symbolA].c.d, 10)
        });

    })
})

