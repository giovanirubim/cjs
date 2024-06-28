import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class Constant extends Expression {
	constructor(token: Token) {
		super(token.start, token.end);
	}
}
