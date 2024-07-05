import { Token } from "../model/token.js";
import { CompilationError } from "./compilation-error.js";

export class UnexpectedToken extends CompilationError {
	constructor(token: Token, index: number) {
		super(`Unexpected token: ${token.content}`, index);
	}
}
