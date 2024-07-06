import { TokenProducer } from "../../../model/token-producer.js";
import { Token } from "../../../model/token.js";
import { Expression } from "../../model/expression.js";
import { LogicalAND } from "../../model/expressions/logical-and.js";
import { LOGICAL_AND } from "../../tokens/token-defs.js";
import { buildLRTree } from "../build-lr-tree.js";
import { parseOperation10 } from "./operation-10.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation10(tokenProducer);
};

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(LOGICAL_AND);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	return new LogicalAND(left, right);
};

export const parseOperation11 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperand, parseOperator, buildNode);
};
