import { TokenType } from "../lang/token-types.js";
import { CodeNode } from "./code-node.js";
import { TokenDef } from "./token-def.js";

export class Token extends CodeNode {
	
	def: TokenDef;
	content: string;

	constructor(def: TokenDef, content: string, start: number, end: number) {
		super(start, end);
		this.def = def;
		this.content = content;
	}

	is(tokenType: TokenType): boolean {
		return this.def.tokenType === tokenType;
	}

	typeIsIncluded(tokenTypes: Array<TokenType>): boolean {
		return tokenTypes.indexOf(this.def.tokenType) !== -1;
	}
}
