import { CompilationError } from "../../errors/compilation-error.js";
import { CodeNode } from "../../model/code-node.js";
import { TokenType } from "../../types/token-types.js";
const constnatTokenTypes = [
    TokenType.DECIMAL,
    TokenType.INTEGER,
    TokenType.CHAR_CONST,
    TokenType.STRING_CONST,
];
export class ConstOrId extends CodeNode {
    constructor(token) {
        super(token.start, token.end);
        this.token = token;
    }
}
export const parseConstOrId = (tokens) => {
    const token = tokens.popForced();
    if (token.typeIsIncluded(constnatTokenTypes) || token.is(TokenType.IDENTIFIER)) {
        return new ConstOrId(token);
    }
    throw new CompilationError('Unexpected token', token.start);
};
