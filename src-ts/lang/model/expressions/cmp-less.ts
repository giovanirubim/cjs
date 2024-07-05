import { Expression } from "../expression.js";

export class CmpLess extends Expression {
	constructor(left: Expression, right: Expression) {
		super(left.start, right.end);
	}
}
