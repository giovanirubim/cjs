import { CompilationError } from "../errors/compilation-error.js";

export class ErrorBuilder {

	baseIndex: number;
	
	constructor(baseIndex: number) {
		this.baseIndex = baseIndex;
	}

	eof(offset: number = 0): CompilationError {
		return new CompilationError('unexpected end of file', this.baseIndex + offset);
	}

	unexpectedToken(offset: number = 0): CompilationError {
		return new CompilationError('unexpected token', this.baseIndex + offset);
	}

	unrecognizedToken(offset: number = 0): CompilationError {
		return new CompilationError('unrecognized token', this.baseIndex + offset);
	}
}
