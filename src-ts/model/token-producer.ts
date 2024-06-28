import { CompilationError } from "../errors/compilation-error.js";
import { TokenType } from "../lang/token-types.js";
import { SrcConsumer } from "./src-consumer.js";
import { TokenDef } from "./token-def.js";
import { Token } from "./token.js";

type Char = string;
type TokenDefSet = TokenDef[];

const buildTokenDefSetMap = (tokenDefs: TokenDef[]): Map<Char, TokenDefSet> => {
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
	buffer: Token[];

	constructor(srcConsumer: SrcConsumer, tokenDefs: TokenDef[]) {
		this.srcConsumer = srcConsumer;
		this.map = buildTokenDefSetMap(tokenDefs);
		this.buffer = [];
	}

	incrementBuffer() {
		const { srcConsumer, map, buffer } = this;
		if (srcConsumer.end()) {
			throw this.eof();
		}
		const tokenDefs = map.get(srcConsumer.nextChar());
		if (tokenDefs === undefined) {
			throw this.unrecognizedToken();
		}
		for (const tokenDef of tokenDefs) {
			const start = srcConsumer.getIndex();
			const content = srcConsumer.pop(tokenDef.pattern);
			if (content !== undefined) {
				const end = srcConsumer.getIndex();
				const token = new Token(tokenDef, content, start, end);
				buffer.push(token);
				return;
			}
		}
		throw this.unrecognizedToken();
	}

	next(index: number = 0): Token | undefined {
		const { buffer, srcConsumer } = this;
		while (buffer.length - 1 < index) {
			if (srcConsumer.end()) {
				return;
			}
			this.incrementBuffer();
		}
		return buffer[index];
	}

	pop(types?: TokenType | TokenType[]): Token | undefined {
		const token = this.next();
		if (token !== undefined) {
			if (types !== undefined && !token.is(types)) {
				return;
			}
			this.buffer.splice(0, 1);
		}
		return token;
	}

	mustPop(types?: TokenType | TokenType[]): Token {
		const res = this.pop(types);
		if (res === undefined) {
			throw this.eof();
		}
		return res;
	}

	end(): boolean {
		return this.buffer.length === 0 && this.srcConsumer.end();
	}

	eof(): CompilationError {
		return this.srcConsumer.error('unexpected end of file');
	}

	unexpectedToken(): CompilationError {
		return this.srcConsumer.error('unexpected token');
	}

	unrecognizedToken(): CompilationError {
		return this.srcConsumer.error('unrecognized token');
	}
}
