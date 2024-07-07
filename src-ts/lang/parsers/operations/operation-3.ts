import { TokenProducer } from "../../../model/token-producer.js";
import { Token } from "../../../model/token.js";
import { Expression } from "../../model/expression.js";
import { Divide } from "../../model/expressions/divide.js";
import { Multiply } from "../../model/expressions/multiply.js";
import { Remainder } from "../../model/expressions/remainder.js";
import { ASTERISK, DIVISION, REMAINDER } from "../../tokens/token-defs.js";
import { buildLRTree } from "../build-lr-tree.js";
import { parseOperation2 } from "./operation-2.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation2(tokenProducer);
};

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(ASTERISK, DIVISION, REMAINDER);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	if (op.is(ASTERISK)) {
		return new Multiply(left, right);
	}
	if (op.is(DIVISION)) {
		return new Divide(left, right);
	}
	return new Remainder(left, right);
};

export const parseOperation3 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperand, parseOperator, buildNode);
};
