import { CompilationError } from "../errors/compilation-error.js";
import { Pattern } from "../types/pattern.js";

export class SrcConsumer {

	src: string;
	buffer: string;

	constructor(src: string) {
		this.src = src;
		this.buffer = src;
	}

	getIndex(): number {
		return this.src.length - this.buffer.length;
	}

	end(): boolean {
		return this.buffer.length === 0;
	}

	match(pattern: Pattern): string | undefined {
		if (typeof pattern === 'string') {
			return this.buffer.startsWith(pattern) ? pattern : undefined;
		}
		if (pattern instanceof RegExp) {
			const match = this.buffer.match(pattern);
			if (match === null) {
				return undefined;
			}
			return match[0];
		}
		return pattern(this.buffer);
	}

	pop(pattern: Pattern): string | undefined {
		const res = this.match(pattern);
		if (res !== undefined) {
			this.buffer = this.buffer.substring(res.length);
		}
		return res;
	}

	nextChar(): string {
		if (this.buffer === '') {
			return '';
		}
		return this.buffer[0];
	}

	error(message: string): CompilationError {
		return new CompilationError(message, this.getIndex());
	}
}
