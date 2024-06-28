import { Expression } from "../expression.js";

export class Remainder extends Expression {

	left: Expression;
	right: Expression

	constructor(left: Expression, right: Expression) {
		super(left.start, right.end);
		this.left = left;
		this.right = right;
	}
}
