import { CompilationError } from "./compilation-error.js";

export class UnexpectedEOF extends CompilationError {
	constructor(index: number) {
		super("Unexpected end of file", index);
	}
}
