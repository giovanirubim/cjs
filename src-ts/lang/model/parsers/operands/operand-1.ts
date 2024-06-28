import { TokenProducer } from "../../../../model/token-producer.js";
import { TokenType } from "../../../token-types.js";
import { Expression } from "../../expression.js";
import { Constant } from "../../expressions/constant.js";
import { Id } from "../../expressions/id.js";
import { parseExpression } from "../expression.js";

const constantTokenTypes = [
	TokenType.INTEGER,
	TokenType.DECIMAL,
	TokenType.CHAR_CONST,
	TokenType.STRING_CONST,
];

const parseEnclosedExpression = (tokenProducer: TokenProducer): Expression => {
	tokenProducer.mustPop(TokenType.OPEN_PARENTHESIS);
	const expr = parseExpression(tokenProducer);
	tokenProducer.mustPop(TokenType.CLOSE_PARENTHESIS);
	return expr;
};

const parseId = (tokenProducer: TokenProducer): Id => {
	const token = tokenProducer.mustPop(TokenType.IDENTIFIER);
	return new Id(token);
}

export const parseOperand1 = (tokenProducer: TokenProducer): Expression => {
	if (tokenProducer.end()) {
		throw tokenProducer.error().eof();
	}

	if (tokenProducer.nextIs(TokenType.OPEN_PARENTHESIS)) {
		return parseEnclosedExpression(tokenProducer);
	}

	if (tokenProducer.nextIs(TokenType.IDENTIFIER)) {
		return parseId(tokenProducer);
	}

	return new Constant(tokenProducer.mustPop(...constantTokenTypes));
};
