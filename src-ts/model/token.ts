import { CodeChunk } from "./code-chunk.js";
import { TokenDef } from "./token-def.js";

export class Token extends CodeChunk {
	
	def: TokenDef;
	content: string;

	constructor(def: TokenDef, content: string, start: number, end: number) {
		super(start, end);
		this.def = def;
		this.content = content;
	}

	is(...tokenType: TokenDef[]): boolean {
		return tokenType.indexOf(this.def) !== -1;
	}
}
