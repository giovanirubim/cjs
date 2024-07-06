import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { Token } from "../../../model/token.js";
import { Sum } from "../../model/expressions/sum.js";
import { Subtract } from "../../model/expressions/subtract.js";
import { MINUS, PLUS } from "../../tokens/token-defs.js";
import { buildLRTree } from "../build-lr-tree.js";
import { parseOperation3 } from "./operation-3.js";

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(PLUS, MINUS);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	if (op.is(PLUS)) {
		return new Sum(left, right);
	}
	return new Subtract(left, right);
};

export const parseOperation4 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperation3, parseOperator, buildNode);
};
