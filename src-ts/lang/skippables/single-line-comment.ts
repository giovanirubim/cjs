import { Skippable } from "../../model/skippable.js";

const pattern = (s: string): string | undefined => {
	if (!s.startsWith('//')) {
		return;
	}
	const lineBreakIndex = s.indexOf('\n');
	if (lineBreakIndex !== -1) {
		const end = lineBreakIndex + 1;
		return s.substring(0, end);
	}
	return s;
};

export const singleLineComment = new Skippable(pattern, "/");
