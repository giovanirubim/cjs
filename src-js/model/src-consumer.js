export class SrcConsumer {
    constructor(src) {
        this.src = src;
        this.buffer = src;
    }
    getIndex() {
        return this.src.length - this.buffer.length;
    }
    end() {
        return this.buffer.length === 0;
    }
    match(pattern) {
        if (typeof pattern === 'string') {
            return this.buffer.startsWith(pattern) ? pattern : null;
        }
        if (pattern instanceof RegExp) {
            const match = this.buffer.match(pattern);
            if (match === null) {
                return match;
            }
            return match[0];
        }
        return pattern(this.buffer);
    }
    pop(pattern) {
        const res = this.match(pattern);
        if (res !== null) {
            this.buffer = this.buffer.substring(res.length);
        }
        return res;
    }
    nextChar() {
        if (this.buffer === '') {
            return '';
        }
        return this.buffer[0];
    }
}
