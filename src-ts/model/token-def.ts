import { Pattern } from "../types/pattern.js";

export class TokenDef {

	pattern: Pattern;
	initialCharSet: string;

	constructor(pattern: Pattern, initialCharSet?: string) {
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
