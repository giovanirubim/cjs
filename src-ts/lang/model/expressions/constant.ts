import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class Constant extends Expression {

	token: Token;

	constructor(token: Token) {
		super(token.start, token.end);
		this.token = token;
	}
}
