import { CompilationError } from "../errors/compilation-error.js";
import { UnexpectedEOF } from "../errors/unexpected-eof.js";
import { UnexpectedToken } from "../errors/unexpected-token.js";
import { UnrecognizedToken } from "../errors/unrecognized-token.js";
import { Token } from "./token.js";

export class ErrorBuilder {

	baseIndex: number;
	
	constructor(baseIndex: number) {
		this.baseIndex = baseIndex;
	}
	eof(offset: number = 0): CompilationError {
		return new UnexpectedEOF(this.baseIndex + offset);
	}
	unexpectedToken(token: Token, offset: number = 0): CompilationError {
		return new UnexpectedToken(token, this.baseIndex + offset);
	}
	unrecognizedToken(offset: number = 0): CompilationError {
		return new UnrecognizedToken(this.baseIndex + offset);
	}
}
