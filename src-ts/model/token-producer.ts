import { TokenType } from "../lang/token-types.js";
import { ErrorBuilder } from "./error-builder.js";
import { Skippable } from "./skippable.js";
import { SrcConsumer } from "./src-consumer.js";
import { TokenDef } from "./token-def.js";
import { Token } from "./token.js";

type Char = string;
type TokenDefSet = TokenDef[];
type Handler = ((s: string, err: ErrorBuilder) => void);

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
	skippableMap: Map<Skippable, Handler | undefined>;
	buffer: Token[];
	initialized: boolean = false;

	constructor(srcConsumer: SrcConsumer, tokenDefs: TokenDef[], skippables: Skippable[]) {
		this.srcConsumer = srcConsumer;
		this.map = buildTokenDefSetMap(tokenDefs);
		this.buffer = [];
		this.skippableMap = new Map<Skippable, Handler | undefined>();
		for (const skippable of skippables) {
			this.skippableMap.set(skippable, undefined);
		}
	}

	private ensureInitialization() {
		if (this.initialized) {
			return;
		}
		this.skip();
		this.initialized = true;
	}

	private skipOnce(): boolean {
		const { srcConsumer, skippableMap } = this;
		const index = srcConsumer.getIndex();
		const char = srcConsumer.nextChar();
		for (const [ skippable, handler ] of skippableMap) {
			if (!skippable.initialSet.includes(char)) {
				continue;
			}
			const s = srcConsumer.pop(skippable.pattern);
			if (s === undefined) {
				continue;
			}
			handler?.(s, new ErrorBuilder(index));
			return true;
		}
		return false;
	}

	private skip() {
		while (this.skipOnce());
	}

	private increaseBuffer() {
		this.ensureInitialization();
		const { srcConsumer, map, buffer: buffer } = this;
		if (srcConsumer.end()) {
			throw this.error().eof();
		}
		const tokenDefs = map.get(srcConsumer.nextChar());
		if (tokenDefs === undefined) {
			throw this.error().unrecognizedToken();
		}
		for (const tokenDef of tokenDefs) {
			const start = srcConsumer.getIndex();
			const content = srcConsumer.pop(tokenDef.pattern);
			if (content !== undefined) {
				const end = srcConsumer.getIndex();
				const token = new Token(tokenDef, content, start, end);
				this.skip();
				buffer.push(token);
				return;
			}
		}
		throw this.error().unrecognizedToken();
	}

	onSkip(skippable: Skippable, handler?: Handler): TokenProducer {
		this.skippableMap.set(skippable, handler);
		return this;
	}

	next(index: number = 0): Token | undefined {
		this.ensureInitialization();
		const { buffer: buffer, srcConsumer } = this;
		while (buffer.length - 1 < index) {
			if (srcConsumer.end()) {
				return;
			}
			this.increaseBuffer();
		}
		return buffer[index];
	}

	nextIs(type: TokenType): boolean {
		return this.next()?.is(type) ?? false;
	}

	pop(...types: TokenType[]): Token | undefined {
		const token = this.next();
		if (token !== undefined) {
			if ((types !== undefined) && (types.length !== 0) && !token.is(...types)) {
				return;
			}
			this.buffer.splice(0, 1);
		}
		return token;
	}

	mustPop(...types: TokenType[]): Token {
		const res = this.pop(...types);
		if (res === undefined) {
			throw this.error().eof();
		}
		return res;
	}

	end(): boolean {
		this.ensureInitialization();
		return this.buffer.length === 0 && this.srcConsumer.end();
	}

	error(): ErrorBuilder {
		return new ErrorBuilder(this.srcConsumer.getIndex());
	}
}
