import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { Constant } from "../../model/expressions/constant.js";
import { Id } from "../../model/expressions/id.js";
import * as Tokens from "../../tokens/token-defs.js";
import { parseExpression } from "../expression.js";

const parseIdOrConstantOrEnclosedExpr = (tokenProducer: TokenProducer): Expression => {
	const open = tokenProducer.pop(Tokens.OPEN_PARENTHESIS);
	if (open) {
		const expr = parseExpression(tokenProducer);
		tokenProducer.mustPop(Tokens.CLOSE_PARENTHESIS);
		return expr;
	}

	const id = tokenProducer.pop(Tokens.IDENTIFIER);
	if (id) {
		return new Id(id);
	}

	const constant = tokenProducer.mustPop(
		Tokens.DECIMAL,
		Tokens.INTEGER,
		Tokens.CHAR_CONST,
		Tokens.STRING_CONST,
	);
	return new Constant(constant);
};

export const parseOperation1 = (tokenProducer: TokenProducer): Expression => {
	return parseIdOrConstantOrEnclosedExpr(tokenProducer);
};
