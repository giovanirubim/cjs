import { CodeNode } from "../../model/code-node.js";
import { TokenProducer } from "../../model/token-producer.js";
import { TokenType } from "../../types/token-types.js";
import { parseMulDivOrMod } from "./mul-div-or-mod.js";

export class SumOrSubNode extends CodeNode {

	left: CodeNode;
	operator: CodeNode;
	right: CodeNode;

	constructor(left: CodeNode, operator: CodeNode, right: CodeNode) {
		super(left.start, right.end);
		this.left = left;
		this.operator = operator;
		this.right = right;
	}
}

const parseItem = (tokens: TokenProducer): CodeNode => {
	return parseMulDivOrMod(tokens);
};

const parseOperator = (tokens: TokenProducer): CodeNode | null => {
	const token = tokens.next();
	if (token === null) {
		return null;
	}
	if (token.is(TokenType.PLUS) || token.is(TokenType.MINUS)) {
		return tokens.pop();
	}
	return null;
};

export const parseSumOrSub = (tokens: TokenProducer): CodeNode => {
	const first = parseItem(tokens);
	const op = parseOperator(tokens);
	if (op === null) {
		return first;
	}
	const second = parseItem(tokens);
	let tree = new SumOrSubNode(first, op, second);
	for (;;) {
		const op = parseOperator(tokens);
		if (op === null) {
			break;
		}
		const second = parseItem(tokens);
		const newTree = new SumOrSubNode(tree, op, second);
		tree = newTree;
	}
	return tree;
};
