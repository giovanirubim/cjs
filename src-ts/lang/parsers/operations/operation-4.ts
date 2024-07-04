import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import * as Tokens from "../../tokens/token-defs.js";
import { Token } from "../../../model/token.js";
import { Sum } from "../../model/expressions/sum.js";
import { Subtract } from "../../model/expressions/subtract.js";
import { parseOperand4 } from "../operands/operand-4.js";

const operators = [
	Tokens.PLUS,
	Tokens.MINUS,
];

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	if (op.is(Tokens.PLUS)) {
		return new Sum(left, right);
	}
	return new Subtract(left, right);
};

export const parseOperation4 = (tokenProducer: TokenProducer): Expression => {
	const left = parseOperand4(tokenProducer);
	const op = tokenProducer.pop(...operators);

	if (!op) {
		return left;
	}

	const right = parseOperation4(tokenProducer);
	let tree = buildNode(left, op, right);
	
	for (;;) {
		const op = tokenProducer.pop(...operators);
		if (!op) {
			break;
		}
		const right = parseOperation4(tokenProducer);
		const newTree = buildNode(tree, op, right);
		tree = buildNode(tree, op, right);
	}
	return tree;
};
