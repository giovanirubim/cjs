import { Skippable } from "../../model/skippable.js";

const pattern = (s: string): string | undefined => {
	if (!s.startsWith('/*')) {
		return;
	}
	const endIndex = s.indexOf('*/', 2);
	if (endIndex === -1) {
		return;
	}
	return s.substring(0, endIndex + 2);
};

export const multiLineComment = new Skippable(pattern, "/");
