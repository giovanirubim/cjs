import { Token } from "../../../model/token.js";
import { Expression } from "../expression.js";

export class Id extends Expression {
	value: string;
	constructor(token: Token) {
		super(token.start, token.end);
		this.value = token.content;
	}
}
