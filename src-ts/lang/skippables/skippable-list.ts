import { multiLineComment } from "./multi-line-comment.js";
import { singleLineComment } from "./single-line-comment.js";
import { whiteSpacePattern } from "./white-space.js";

export const skippableList = [
	whiteSpacePattern,
	singleLineComment,
	multiLineComment,
];
