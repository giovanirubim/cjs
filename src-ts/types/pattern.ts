export type PatternFunction = ((s: string) => string | undefined);
export type Pattern = string | RegExp | PatternFunction;

export const matchPattern = (s: string, pattern: Pattern): string | undefined => {
	if (typeof pattern === 'string') {
		if (s.startsWith(pattern)) {
			return pattern;
		}
		return undefined;
	}
	if (pattern instanceof RegExp) {
		const match = s.match(pattern);
		if (match === null) {
			return undefined;
		}
		return match[0];
	}
	return pattern(s);
};
