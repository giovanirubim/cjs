import { CompilationError } from "../errors/compilation-error.js";
import { TokenType } from "../lang/token-types.js";
import { SrcConsumer } from "./src-consumer.js";
import { TokenDef } from "./token-def.js";
import { Token } from "./token.js";

type Char = string;
type TokenDefSet = Array<TokenDef>;

const buildTokenDefSetMap = (tokenDefs: Array<TokenDef>): Map<Char, TokenDefSet> => {
	const map = new Map<Char, TokenDefSet>();
	for (const tokenDef of tokenDefs) {
		for (const char of tokenDef.initialCharSet) {
			let set = map.get(char);
			if (set === undefined) {
				set = [];
				map.set(char, set);
			}
			set.push(tokenDef);
		}
	}
	return map;
};

export class TokenProducer {

	srcConsumer: SrcConsumer;
	map: Map<Char, TokenDefSet>;
	buffer: Array<Token>;

	constructor(srcConsumer: SrcConsumer, tokenDefs: Array<TokenDef>) {
		this.srcConsumer = srcConsumer;
		this.map = buildTokenDefSetMap(tokenDefs);
		this.buffer = [];
	}

	incrementBuffer() {
		const { srcConsumer, map, buffer } = this;
		if (srcConsumer.end()) {
			throw new CompilationError('Unexpected end of file', srcConsumer.getIndex());
		}
		const tokenDefs = map.get(srcConsumer.nextChar());
		if (tokenDefs === undefined) {
			throw new CompilationError('Unrecognized token', srcConsumer.getIndex());
		}
		for (const tokenDef of tokenDefs) {
			const start = srcConsumer.getIndex();
			const content = srcConsumer.pop(tokenDef.pattern);
			if (content !== null) {
				const end = srcConsumer.getIndex();
				const token = new Token(tokenDef, content, start, end);
				buffer.push(token);
				return;
			}
		}
		throw new CompilationError('Unrecognized token', srcConsumer.getIndex());
	}

	next(index: number = 0, forced: boolean = false): Token | null {
		const { buffer, srcConsumer } = this;
		while (buffer.length - 1 < index) {
			if (srcConsumer.end()) {
				if (forced) {
					throw new CompilationError('Unexpected end of file', srcConsumer.getIndex());
				}
				return null;
			}
			this.incrementBuffer();
		}
		return buffer[index];
	}

	pop(type: TokenType | null = null): Token | null {
		const token = this.next();
		if (token !== null) {
			if (type !== null && !token.is(type)) {
				return null;
			}
			this.buffer.splice(0, 1);
		}
		return token;
	}

	popForced(): Token {
		const res = this.pop();
		if (res === null) {
			throw new CompilationError('Unexpected end of file', this.srcConsumer.getIndex());
		}
		return res;
	}

	end(): boolean {
		return this.buffer.length === 0 && this.srcConsumer.end();
	}
}
