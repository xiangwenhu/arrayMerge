import { MergeBaseClassOptions } from "./types";

export class MergeBaseClass<M = any, O = any> {

    constructor(private options: MergeBaseClassOptions) {
    }

    private list: [M, O][] = [];

    push(item: M, options?: O) {
        this.list.push([item, options]);
        return this;
    }

    merge() {
        const { list, options } = this;
        if (list.length === 0) return undefined

        const { mergeMethod } = options;

        let result: any = list[0][0];
        for (let i = 1; i < this.list.length; i++) {
            const [item, options] = this.list[i];
            result = mergeMethod(result, item, options)
        }
        return result;
    }
}