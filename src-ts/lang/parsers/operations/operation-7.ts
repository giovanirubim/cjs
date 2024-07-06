import { TokenProducer } from "../../../model/token-producer.js";
import { Token } from "../../../model/token.js";
import { Expression } from "../../model/expression.js";
import { CmpDifferent } from "../../model/expressions/cmp-different.js";
import { CmpEqual } from "../../model/expressions/cmp-equal.js";
import { CMP_DIFFERENT, CMP_EQUALS } from "../../tokens/token-defs.js";
import { buildLRTree } from "../build-lr-tree.js";
import { parseOperation6 } from "./operation-6.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation6(tokenProducer);
};

const parseOperator = (tokenProducer: TokenProducer): Token | undefined => {
	return tokenProducer.pop(CMP_EQUALS, CMP_DIFFERENT);
};

const buildNode = (left: Expression, op: Token, right: Expression): Expression => {
	if (op.is(CMP_DIFFERENT)) {
		return new CmpDifferent(left, right);
	}
	return new CmpEqual(left, right);
};

export const parseOperation7 = (tokenProducer: TokenProducer): Expression => {
	return buildLRTree(tokenProducer, parseOperand, parseOperator, buildNode);
};
