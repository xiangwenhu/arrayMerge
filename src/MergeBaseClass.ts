import { MergeBaseClassOptions } from "./types";

export class MergeBaseClass<M = any, O = any> {

    constructor(private options: MergeBaseClassOptions) {
    }

    private list: [M, O][] = [];

    push(item: M, mapping?: O) {
        this.list.push([item, mapping]);
        return this;
    }

    merge() {
        const { list, options } = this;
        if (list.length === 0) return undefined

        const { mergeMethod } = options;

        let result: any = list[0][0];
        for (let i = 1; i < this.list.length; i++) {
            const [item, mapping] = this.list[i];
            result = mergeMethod(result, item, mapping)
        }
        return result;
    }
}