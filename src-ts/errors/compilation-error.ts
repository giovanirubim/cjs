export class CompilationError extends Error {

	index: number;
	
	constructor(message: string, index: number) {
		super(message);
		this.index = index;
	}
}
