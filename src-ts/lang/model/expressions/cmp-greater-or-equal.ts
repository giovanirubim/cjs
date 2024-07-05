import { Expression } from "../expression.js";

export class CmpGreaterOrEqual extends Expression {
	constructor(left: Expression, right: Expression) {
		super(left.start, right.end);
	}
}
