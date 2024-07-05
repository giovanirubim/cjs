import { CompilationError } from "./compilation-error.js";

export class UnrecognizedToken extends CompilationError {
	constructor(index: number) {
		super("Unrecognized token", index);
	}
}
