import { TokenProducer } from "../../../../model/token-producer.js";
import { TokenType } from "../../../token-types.js";
import { Expression } from "../../expression.js";
import { Call } from "../../expressions/call.js";
import { parseExpression } from "../expression.js";
import { parseOperand1 } from "../operands/operand-1.js";

const parseCall = (fn: Expression, tokenProducer: TokenProducer): Call => {
	tokenProducer.mustPop(TokenType.OPEN_PARENTHESIS);
	const args: Expression[] = [];

	if (tokenProducer.nextIs(TokenType.CLOSE_PARENTHESIS)) {
		const close = tokenProducer.mustPop(TokenType.CLOSE_PARENTHESIS);
		return new Call(fn, args, close);
	}

	for (;;) {
		const arg = parseExpression(tokenProducer);
		args.push(arg);
		if (tokenProducer.nextIs(TokenType.CLOSE_PARENTHESIS)) {
			break;
		}
		tokenProducer.mustPop(TokenType.COMMA);
	}

	const close = tokenProducer.mustPop(TokenType.CLOSE_PARENTHESIS);
	return new Call(fn, args, close);
};

export const parseOperation1 = (tokenProducer: TokenProducer): Expression => {
	const operand = parseOperand1(tokenProducer);

	if (tokenProducer.nextIs(TokenType.OPEN_PARENTHESIS)) {
		return parseCall(operand, tokenProducer);
	}

	tokenProducer.mustPop();
	throw tokenProducer.error().unexpectedToken();
};
