import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class Sizeof extends Expression {
	arg: Expression;
	constructor(token: Token, arg: Expression, close: Token) {
		super(token.start, close.end);
		this.arg = arg;
	}
}
