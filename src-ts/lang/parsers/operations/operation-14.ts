import { TokenProducer } from "../../../model/token-producer.js";
import { Token } from "../../../model/token.js";
import { Expression } from "../../model/expression.js";
import { Assign } from "../../model/expressions/assign.js";
import { ASSIGN } from "../../tokens/token-defs.js";
import { buildLRTree } from "../build-lr-tree.js";
import { parseOperation13 } from "./operation-13.js";

const parseOperand = (tokenProducer: TokenProducer) => {
	return parseOperation13(tokenProducer);
};

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(ASSIGN);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	return new Assign(left, right);
};

export const parseOperation14 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperand, parseOperator, buildNode);
};
