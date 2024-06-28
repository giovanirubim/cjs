import { TokenProducer } from "../../../../model/token-producer.js";
import { Token } from "../../../../model/token.js";
import { TokenType } from "../../../token-types.js";
import { Expression } from "../../expression.js";
import { Divide } from "../../expressions/divide.js";
import { Multiply } from "../../expressions/multiply.js";
import { Remainder } from "../../expressions/remainder.js";
import { parseOperand3 } from "../operands/operand-3.js";

const operators = [
	TokenType.ASTERISK,
	TokenType.DIVISION,
	TokenType.REMAINDER,
];

const buildNode = (left: Expression, operand: Token, right: Expression): Expression => {
	if (operand.is(TokenType.ASTERISK)) {
		return new Multiply(left, right);
	}
	if (operand.is(TokenType.DIVISION)) {
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
