import { Expression } from "../expression.js";

export class TernaryIf extends Expression {

	condition: Expression;
	caseTrue: Expression;
	caseFalse: Expression;

	constructor(condition: Expression, caseTrue: Expression, caseFalse: Expression) {
		super(condition.start, caseFalse.end);
		this.condition = condition;
		this.caseTrue = caseTrue;
		this.caseFalse = caseFalse;
	}
}
