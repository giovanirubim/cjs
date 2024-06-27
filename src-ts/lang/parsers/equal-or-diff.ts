import { CodeNode } from "../../model/code-node.js";
import { TokenProducer } from "../../model/token-producer.js";
import { TokenType } from "../../types/token-types.js";
import { parseSumOrSub } from "./sum-or-sub.js";

export class EqualOrDiffNode extends CodeNode {

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
	return parseSumOrSub(tokens);
};

const parseOperator = (tokens: TokenProducer): CodeNode | null => {
	const token = tokens.next();
	if (token === null) {
		return null;
	}
	if (token.is(TokenType.CMP_DIFFERENT) || token.is(TokenType.CMP_EQUALS)) {
		return tokens.pop();
	}
	return null;
};

export const parseEqualOrDiff = (tokens: TokenProducer): CodeNode => {
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
