import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { AddressOf } from "../../model/expressions/address-of.js";
import { parseExpression } from "../expression.js";
import * as Tokens from "../../tokens/token-defs.js";
import { Sizeof } from "../../model/expressions/sizeof.js";
import { parseOperand1 } from "../operands/operand-1.js";
import { LogicalNOT } from "../../model/expressions/logical-not.js";

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

const parseLogicalNot = (tokenProducer: TokenProducer): Expression => {
	const token = tokenProducer.mustPop(Tokens.LOGICAL_NOT);
	const expr = parseOperation2(tokenProducer);
	return new LogicalNOT(token, expr);
};

export const parseOperation2 = (tokenProducer: TokenProducer): Expression => {
	if (tokenProducer.nextIs(Tokens.AMPERSAND)) {
		return parseAddressOf(tokenProducer);
	}

	if (tokenProducer.nextIs(Tokens.SIZEOF)) {
		return parseSizeOf(tokenProducer);
	}

	if (tokenProducer.nextIs(Tokens.LOGICAL_NOT)) {
		return parseLogicalNot(tokenProducer);
	}

	return parseOperand1(tokenProducer);
};
