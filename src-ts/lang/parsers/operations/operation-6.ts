import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation5 } from "./operation-5.js";
import * as Tokens from "../../tokens/token-defs.js";
import { Token } from "../../../model/token.js";
import { CmpGreater } from "../../model/expressions/cmp-greater.js";
import { CmpGreaterOrEqual } from "../../model/expressions/cmp-greater-or-equal.js";
import { CmpLess } from "../../model/expressions/cmp-less.js";
import { CmpLessOrEqual } from "../../model/expressions/cmp-less-or-equal.js";
import { buildLRTree } from "../build-lr-tree.js";

const oeprators = [
	Tokens.CMP_GREATER,
	Tokens.CMP_GREATER_OR_EQUAL,
	Tokens.CMP_LESS,
	Tokens.CMP_LESS_OR_EQUAL,
];

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation5(tokenProducer);
};

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(...oeprators);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	if (op.is(Tokens.CMP_GREATER)) {
		return new CmpGreater(left, right);
	}
	if (op.is(Tokens.CMP_GREATER_OR_EQUAL)) {
		return new CmpGreaterOrEqual(left, right);
	}
	if (op.is(Tokens.CMP_LESS)) {
		return new CmpLess(left, right);
	}
	return new CmpLessOrEqual(left, right);
};

export const parseOperation6 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperand, parseOperator, buildNode);
};
