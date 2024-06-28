import { Pattern } from "../types/pattern.js";

// Spaces and comments
export class Skippable {
	
	pattern: Pattern;
	initialSet: string;

	constructor(pattern: Pattern, initalSet: string) {
		this.pattern = pattern;
		this.initialSet = initalSet;
	}
}
