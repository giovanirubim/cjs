import { TokenProducer } from "../../../../model/token-producer.js";
import { TokenType } from "../../../token-types.js";
import { Expression } from "../../expression.js";
import { AddressOf } from "../../expressions/address-of.js";
import { Sizeof } from "../../expressions/sizeof.js";
import { parseExpression } from "../expression.js";

const parseAddressOf = (tokenProducer: TokenProducer): AddressOf => {
	const ampersand = tokenProducer.mustPop(TokenType.AMPERSAND);
	const expr = parseOperation2(tokenProducer);
	return new AddressOf(ampersand.start, expr);
};

const parseSizeOf = (tokenProducer: TokenProducer): Expression => {
	const token = tokenProducer.mustPop(TokenType.SIZEOF);
	tokenProducer.mustPop(TokenType.OPEN_PARENTHESIS);

	const arg = parseExpression(tokenProducer);
	const close = tokenProducer.mustPop(TokenType.CLOSE_PARENTHESIS);

	return new Sizeof(token, arg, close);
};

export const parseOperation2 = (tokenProducer: TokenProducer): Expression => {
	if (tokenProducer.nextIs(TokenType.AMPERSAND)) {
		return parseAddressOf(tokenProducer);
	}

	if (tokenProducer.nextIs(TokenType.SIZEOF)) {
		return parseSizeOf(tokenProducer);
	}

	tokenProducer.mustPop();
	throw tokenProducer.error().unexpectedToken();
};
