import { CompilationError } from "../../errors/compilation-error.js";
import { CodeNode } from "../../model/code-node.js";
import { TokenProducer } from "../../model/token-producer.js";
import { Token } from "../../model/token.js";
import { TokenType } from "../../types/token-types.js";

const constnatTokenTypes = [
	TokenType.DECIMAL,
	TokenType.INTEGER,
	TokenType.CHAR_CONST,
	TokenType.STRING_CONST,
];

export class ConstOrId extends CodeNode {

	token: Token;
	
	constructor(token: Token) {
		super(token.start, token.end);
		this.token = token;
	}
}

export const parseConstOrId = (tokens: TokenProducer): ConstOrId => {
	const token = tokens.popForced();
	if (token.typeIsIncluded(constnatTokenTypes) || token.is(TokenType.IDENTIFIER)) {
		return new ConstOrId(token);
	}
	throw new CompilationError('Unexpected token', token.start);
};
