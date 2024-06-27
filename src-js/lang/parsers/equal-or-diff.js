import { CodeNode } from "../../model/code-node.js";
import { TokenType } from "../../types/token-types.js";
import { parseSumOrSub } from "./sum-or-sub.js";
export class EqualOrDiffNode extends CodeNode {
    constructor(left, operator, right) {
        super(left.start, right.end);
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}
const parseItem = (tokens) => {
    return parseSumOrSub(tokens);
};
const parseOperator = (tokens) => {
    const token = tokens.next();
    if (token === null) {
        return null;
    }
    if (token.is(TokenType.CMP_DIFFERENT) || token.is(TokenType.CMP_EQUALS)) {
        return tokens.pop();
    }
    return null;
};
export const parseEqualOrDiff = (tokens) => {
    const first = parseItem(tokens);
    const op = parseOperator(tokens);
    if (op === null) {
        return first;
    }
    const second = parseItem(tokens);
    let tree = new EqualOrDiffNode(first, op, second);
    for (;;) {
        const op = parseOperator(tokens);
        if (op === null) {
            break;
        }
        const second = parseItem(tokens);
        const newTree = new EqualOrDiffNode(tree, op, second);
        tree = newTree;
    }
    return tree;
};
