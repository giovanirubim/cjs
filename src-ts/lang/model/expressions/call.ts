import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class Call extends Expression {

	fn: Expression;
	args: Expression[];

	constructor(fn: Expression, args: Expression[], close: Token) {
		super(fn.start, close.end);
		this.fn = fn;
		this.args = args;
	}
}
