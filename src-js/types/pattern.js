export const matchPattern = (s, pattern) => {
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
