import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import * as Tokens from "../../tokens/token-defs.js";
import { Multiply } from "../../model/expressions/multiply.js";
import { Divide } from "../../model/expressions/divide.js";
import { Remainder } from "../../model/expressions/remainder.js";
import { parseOperand3 } from "../operands/operand-3.js";
import { Token } from "../../../model/token.js";

const operators = [
	Tokens.ASTERISK,
	Tokens.DIVISION,
	Tokens.REMAINDER,
];

const buildNode = (left: Expression, operand: Token, right: Expression): Expression => {
	if (operand.is(Tokens.ASTERISK)) {
		return new Multiply(left, right);
	}
	if (operand.is(Tokens.DIVISION)) {
		return new Divide(left, right);
	}
	return new Remainder(left, right);
};

export const parseOperation3 = (tokenProducer: TokenProducer): Expression => {
	const left = parseOperand3(tokenProducer);
	const op = tokenProducer.pop(...operators);
	
	if (op === undefined) {
		return left;
	}
	
	const right = parseOperand3(tokenProducer);
	let tree = buildNode(left, op, right);
	
	for (;;) {
		const op = tokenProducer.pop(...operators);
		if (op === undefined) {
			break;
		}
		const right = parseOperand3(tokenProducer);
		const newTree = buildNode(tree, op, right);
		tree = newTree;
	}

	return tree;
};
