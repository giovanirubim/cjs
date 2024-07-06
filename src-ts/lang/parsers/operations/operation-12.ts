import { TokenProducer } from "../../../model/token-producer.js";
import { Token } from "../../../model/token.js";
import { Expression } from "../../model/expression.js";
import { LogicalOR } from "../../model/expressions/logical-or.js";
import { LOGICAL_OR } from "../../tokens/token-defs.js";
import { buildLRTree } from "../build-lr-tree.js";
import { parseOperation11 } from "./operation-11.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation11(tokenProducer);
};

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(LOGICAL_OR);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	return new LogicalOR(left, right);
};

export const parseOperation12 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperand, parseOperator, buildNode);
};
