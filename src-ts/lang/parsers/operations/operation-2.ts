import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { AddressOf } from "../../model/expressions/address-of.js";
import { parseExpression } from "../expression.js";
import * as Tokens from "../../tokens/token-defs.js";
import { Sizeof } from "../../model/expressions/sizeof.js";

const parseAddressOf = (tokenProducer: TokenProducer): AddressOf => {
	const ampersand = tokenProducer.mustPop(Tokens.AMPERSAND);
	const expr = parseOperation2(tokenProducer);
	return new AddressOf(ampersand.start, expr);
};

const parseSizeOf = (tokenProducer: TokenProducer): Expression => {
	const token = tokenProducer.mustPop(Tokens.SIZEOF);
	tokenProducer.mustPop(Tokens.OPEN_PARENTHESIS);

	const arg = parseExpression(tokenProducer);
	const close = tokenProducer.mustPop(Tokens.CLOSE_PARENTHESIS);

	return new Sizeof(token, arg, close);
};

export const parseOperation2 = (tokenProducer: TokenProducer): Expression => {
	if (tokenProducer.nextIs(Tokens.AMPERSAND)) {
		return parseAddressOf(tokenProducer);
	}

	if (tokenProducer.nextIs(Tokens.SIZEOF)) {
		return parseSizeOf(tokenProducer);
	}

	tokenProducer.mustPop();
	throw tokenProducer.error().unexpectedToken();
};
