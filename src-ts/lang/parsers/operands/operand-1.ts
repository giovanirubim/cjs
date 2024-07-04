import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { Constant } from "../../model/expressions/constant.js";
import { Id } from "../../model/expressions/id.js";
import { parseExpression } from "../expression.js";
import * as Tokens from '../../tokens/token-defs.js';

const constantTokenTypes = [
	Tokens.INTEGER,
	Tokens.DECIMAL,
	Tokens.CHAR_CONST,
	Tokens.STRING_CONST,
];

const parseEnclosedExpression = (tokenProducer: TokenProducer): Expression => {
	tokenProducer.mustPop(Tokens.OPEN_PARENTHESIS);
	const expr = parseExpression(tokenProducer);
	tokenProducer.mustPop(Tokens.CLOSE_PARENTHESIS);
	return expr;
};

const parseId = (tokenProducer: TokenProducer): Id => {
	const token = tokenProducer.mustPop(Tokens.IDENTIFIER);
	return new Id(token);
}

export const parseOperand1 = (tokenProducer: TokenProducer): Expression => {
	if (tokenProducer.end()) {
		throw tokenProducer.error().eof();
	}

	if (tokenProducer.nextIs(Tokens.OPEN_PARENTHESIS)) {
		return parseEnclosedExpression(tokenProducer);
	}

	if (tokenProducer.nextIs(Tokens.IDENTIFIER)) {
		return parseId(tokenProducer);
	}

	return new Constant(tokenProducer.mustPop(...constantTokenTypes));
};
