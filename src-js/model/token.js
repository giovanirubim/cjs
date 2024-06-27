import { CodeNode } from "./code-node.js";
export class Token extends CodeNode {
    constructor(def, content, start, end) {
        super(start, end);
        this.def = def;
        this.content = content;
    }
    is(tokenType) {
        return this.def.tokenType === tokenType;
    }
    typeIsIncluded(tokenTypes) {
        return tokenTypes.indexOf(this.def.tokenType) !== -1;
    }
}
