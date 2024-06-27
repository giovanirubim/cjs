import { CodeNode } from "../../model/code-node.js";
import { TokenType } from "../../types/token-types.js";
import { parseConstOrId } from "./const-or-id.js";
class MulDivOrMod extends CodeNode {
    constructor(left, operator, right) {
        super(left.start, right.end);
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}
const parseItem = (tokens) => {
    return parseConstOrId(tokens);
};
const operators = [
    TokenType.ASTERISK,
    TokenType.DIVISION,
    TokenType.REMAINDER,
];
const parseOperator = (tokens) => {
    const token = tokens.next();
    if (token === null) {
        return null;
    }
    if (token.typeIsIncluded(operators)) {
        return tokens.pop();
    }
    return null;
};
export const parseMulDivOrMod = (tokens) => {
    const first = parseItem(tokens);
    const op = parseOperator(tokens);
    if (op === null) {
        return first;
    }
    const second = parseItem(tokens);
    let tree = new MulDivOrMod(first, op, second);
    for (;;) {
        const op = parseOperator(tokens);
        if (op === null) {
            break;
        }
        const second = parseItem(tokens);
        const newTree = new MulDivOrMod(tree, op, second);
        tree = newTree;
    }
    return tree;
};
