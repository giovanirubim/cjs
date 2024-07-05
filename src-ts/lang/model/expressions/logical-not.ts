import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class LogicalNOT extends Expression {
	expr: Expression;
	constructor(token: Token, expr: Expression) {
		super(token.start, expr.end);
		this.expr = expr;
	}
}
