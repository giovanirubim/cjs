import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class AddressOf extends Expression {
	lValue: Expression;
	constructor(token: Token, lValue: Expression) {
		super(token.start, lValue.end);
		this.lValue = lValue;
	}
}
