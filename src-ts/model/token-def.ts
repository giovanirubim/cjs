import { Pattern } from "../types/pattern.js";
import { TokenType } from "../types/token-types.js";

export class TokenDef {

	tokenType: TokenType;
	pattern: Pattern;
	initialCharSet: string;

	constructor(tokenType: TokenType, pattern: Pattern, initialCharSet?: string) {
		this.tokenType = tokenType;
		if (typeof pattern === 'string') {
			if (initialCharSet !== undefined) {
				throw new Error('String patterns require no initial char set');
			}
			this.initialCharSet = pattern[0];
		} else {
			if (initialCharSet === undefined) {
				throw new Error('Initial char set is required for non-string patterns');
			}
			this.initialCharSet = initialCharSet;
		}
		this.pattern = pattern;
	}
}
