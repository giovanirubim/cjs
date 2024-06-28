import { TokenProducer } from "../../../../model/token-producer.js";
import { Token } from "../../../../model/token.js";
import { TokenType } from "../../../token-types.js";
import { Expression } from "../../expression.js";
import { Subtract } from "../../expressions/subtract.js";
import { Sum } from "../../expressions/sum.js";
import { parseOperand4 } from "../operands/operand-4.js";

const operators = [
	TokenType.PLUS,
	TokenType.MINUS,
];

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	if (op.is(TokenType.PLUS)) {
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
