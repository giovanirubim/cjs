import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { AddressOf } from "../../model/expressions/address-of.js";
import { Sizeof } from "../../model/expressions/sizeof.js";
import { parseOperation1 } from "./operation-1.js";

import {
	AMPERSAND,
	CLOSE_PARENTHESIS,
	OPEN_PARENTHESIS,
	SIZEOF,
} from "../../tokens/token-defs.js";

export const parseOperation2 = (tokenProducer: TokenProducer): Expression => {
	const op = tokenProducer.pop(AMPERSAND, SIZEOF);
	if (!op) {
		return parseOperation1(tokenProducer);
	}
	if (op.is(AMPERSAND)) {
		const expr = parseOperation2(tokenProducer);
		return new AddressOf(op, expr);
	}
	tokenProducer.mustPop(OPEN_PARENTHESIS);
	const expr = parseOperation2(tokenProducer);
	const close = tokenProducer.mustPop(CLOSE_PARENTHESIS);
	return new Sizeof(op, expr, close);
};
