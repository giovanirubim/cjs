export type PatternFunction = ((s: string) => string | null);
export type Pattern = string | RegExp | PatternFunction;

export const matchPattern = (s: string, pattern: Pattern): string | null => {
	if (typeof pattern === 'string') {
		if (s.startsWith(pattern)) {
			return pattern;
		}
		return null;
	}
	if (pattern instanceof RegExp) {
		const match = s.match(pattern);
		if (match === null) {
			return null;
		}
		return match[0];
	}
	return pattern(s);
};
