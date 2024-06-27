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

	match(pattern: Pattern): string | null {
		if (typeof pattern === 'string') {
			return this.buffer.startsWith(pattern) ? pattern : null;
		}
		if (pattern instanceof RegExp) {
			const match = this.buffer.match(pattern);
			if (match === null) {
				return match;
			}
			return match[0];
		}
		return pattern(this.buffer);
	}

	pop(pattern: Pattern): string | null {
		const res = this.match(pattern);
		if (res !== null) {
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
}
