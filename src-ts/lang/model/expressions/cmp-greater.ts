import { Expression } from "../expression.js";

export class CmpGreater extends Expression {
	constructor(left: Expression, right: Expression) {
		super(left.start, right.end);
	}
}
