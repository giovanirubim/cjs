import { Expression } from "../expression.js";

export class AddressOf extends Expression {
	lValue: Expression;
	constructor(start: number, lValue: Expression) {
		super(start, lValue.end);
		this.lValue = lValue;
	}
}
