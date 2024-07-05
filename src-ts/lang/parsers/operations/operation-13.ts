import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { TernaryIf } from "../../model/expressions/ternary-if.js";
import { TERNARY_ELSE, TERNARY_IF } from "../../tokens/token-defs.js";
import { parseOperation12 } from "./operation-12.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation12(tokenProducer);
};

export const parseOperation13 = (tokenProducer: TokenProducer): Expression => {
	const condition = parseOperand(tokenProducer);

	if (!tokenProducer.pop(TERNARY_IF)) {
		return condition;
	}

	const caseTrue = parseOperation13(tokenProducer);
	tokenProducer.mustPop(TERNARY_ELSE);
	const caseFalse = parseOperation13(tokenProducer);

	return new TernaryIf(condition, caseTrue, caseFalse);
};
