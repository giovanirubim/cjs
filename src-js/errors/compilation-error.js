export class CompilationError extends Error {
    constructor(message, index) {
        super(message);
        this.index = index;
    }
}
