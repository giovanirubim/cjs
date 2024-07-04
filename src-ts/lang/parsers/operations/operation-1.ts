import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { Call } from "../../model/expressions/call.js";
import { parseExpression } from "../expression.js";
import { parseOperand1 } from "../operands/operand-1.js";
import * as Tokens from "../../tokens/token-defs.js";

const parseCall = (fn: Expression, tokenProducer: TokenProducer): Call => {
	tokenProducer.mustPop(Tokens.OPEN_PARENTHESIS);
	const args: Expression[] = [];

	if (tokenProducer.nextIs(Tokens.CLOSE_PARENTHESIS)) {
		const close = tokenProducer.mustPop(Tokens.CLOSE_PARENTHESIS);
		return new Call(fn, args, close);
	}

	for (;;) {
		const arg = parseExpression(tokenProducer);
		args.push(arg);
		if (tokenProducer.nextIs(Tokens.CLOSE_PARENTHESIS)) {
			break;
		}
		tokenProducer.mustPop(Tokens.COMMA);
	}

	const close = tokenProducer.mustPop(Tokens.CLOSE_PARENTHESIS);
	return new Call(fn, args, close);
};

export const parseOperation1 = (tokenProducer: TokenProducer): Expression => {
	const operand = parseOperand1(tokenProducer);

	if (tokenProducer.nextIs(Tokens.OPEN_PARENTHESIS)) {
		return parseCall(operand, tokenProducer);
	}

	tokenProducer.mustPop();
	throw tokenProducer.error().unexpectedToken();
};
