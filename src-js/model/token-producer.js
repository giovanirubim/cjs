import { CompilationError } from "../errors/compilation-error.js";
import { Token } from "./token.js";
const buildTokenDefSetMap = (tokenDefs) => {
    const map = new Map();
    for (const tokenDef of tokenDefs) {
        for (const char of tokenDef.initialCharSet) {
            let set = map.get(char);
            if (set === undefined) {
                set = [];
                map.set(char, set);
            }
            set.push(tokenDef);
        }
    }
    return map;
};
export class TokenProducer {
    constructor(srcConsumer, tokenDefs) {
        this.srcConsumer = srcConsumer;
        this.map = buildTokenDefSetMap(tokenDefs);
        this.buffer = [];
    }
    incrementBuffer() {
        const { srcConsumer, map, buffer } = this;
        if (srcConsumer.end()) {
            throw new CompilationError('Unexpected end of file', srcConsumer.getIndex());
        }
        const tokenDefs = map.get(srcConsumer.nextChar());
        if (tokenDefs === undefined) {
            throw new CompilationError('Unrecognized token', srcConsumer.getIndex());
        }
        for (const tokenDef of tokenDefs) {
            const start = srcConsumer.getIndex();
            const content = srcConsumer.pop(tokenDef.pattern);
            if (content !== null) {
                const end = srcConsumer.getIndex();
                const token = new Token(tokenDef, content, start, end);
                buffer.push(token);
                return;
            }
        }
        throw new CompilationError('Unrecognized token', srcConsumer.getIndex());
    }
    next(index = 0, forced = false) {
        const { buffer, srcConsumer } = this;
        while (buffer.length - 1 < index) {
            if (srcConsumer.end()) {
                if (forced) {
                    throw new CompilationError('Unexpected end of file', srcConsumer.getIndex());
                }
                return null;
            }
            this.incrementBuffer();
        }
        return buffer[index];
    }
    pop(type = null) {
        const token = this.next();
        if (token !== null) {
            if (type !== null && !token.is(type)) {
                return null;
            }
            this.buffer.splice(0, 1);
        }
        return token;
    }
    popForced() {
        const res = this.pop();
        if (res === null) {
            throw new CompilationError('Unexpected end of file', this.srcConsumer.getIndex());
        }
        return res;
    }
    end() {
        return this.buffer.length === 0 && this.srcConsumer.end();
    }
}
