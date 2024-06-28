import { TokenDef } from "../../model/token-def.js";
import { TokenType } from "../../types/token-types.js";

const digits = [...new Array(10)]
	.map((_, i) => {
		return String.fromCharCode('0'.charCodeAt(0) + i);
	})
	.join('');

const lowerCaseAlphabet = [...new Array(26)]
	.map((_, i) => {
		return String.fromCharCode('a'.charCodeAt(0) + i);
	})
	.join('');

const upperCaseAlphabet = lowerCaseAlphabet.toUpperCase();

const reservedWord = (type: TokenType, word: string): TokenDef => {
	const pattern = new RegExp(`^${word}\\b`);
	return new TokenDef(type, pattern, word[0]);
};

export const tokenDefList = [

	// Reserved words
	reservedWord(TokenType.AUTO,      "auto"),
	reservedWord(TokenType.BREAK,     "break"),
	reservedWord(TokenType.CASE,      "case"),
	reservedWord(TokenType.CHAR_TYPE, "char"),
	reservedWord(TokenType.CONST,     "const"),
	reservedWord(TokenType.CONTINUE,  "continue"),
	reservedWord(TokenType.DEFAULT,   "default"),
	reservedWord(TokenType.DO,        "do"),
	reservedWord(TokenType.DOUBLE,    "double"),
	reservedWord(TokenType.ELSE,      "else"),
	reservedWord(TokenType.ENUM,      "enum"),
	reservedWord(TokenType.EXTERN,    "extern"),
	reservedWord(TokenType.FLOAT,     "float"),
	reservedWord(TokenType.FOR,       "for"),
	reservedWord(TokenType.GOTO,      "goto"),
	reservedWord(TokenType.IF,        "if"),
	reservedWord(TokenType.INT,       "int"),
	reservedWord(TokenType.LONG,      "long"),
	reservedWord(TokenType.REGISTER,  "register"),
	reservedWord(TokenType.RETURN,    "return"),
	reservedWord(TokenType.SHORT,     "short"),
	reservedWord(TokenType.SIGNED,    "signed"),
	reservedWord(TokenType.SIZEOF,    "sizeof"),
	reservedWord(TokenType.STATIC,    "static"),
	reservedWord(TokenType.STRUCT,    "struct"),
	reservedWord(TokenType.SWITCH,    "switch"),
	reservedWord(TokenType.TYPEDEF,   "typedef"),
	reservedWord(TokenType.UNION,     "union"),
	reservedWord(TokenType.UNSIGNED,  "unsigned"),
	reservedWord(TokenType.VOID,      "void"),
	reservedWord(TokenType.VOLATILE,  "volatile"),
	reservedWord(TokenType.WHILE,     "while"),

	// Three-character operators
	new TokenDef(TokenType.ASSIGN_SHIFT_LEFT,  "<<="),
	new TokenDef(TokenType.ASSIGN_SHIFT_RIGHT, ">>="),

	// Two-character operators
	new TokenDef(TokenType.ASSIGN_BITWISE_AND,   "&="),
	new TokenDef(TokenType.ASSIGN_BITWISE_OR,    "|="),
	new TokenDef(TokenType.ASSIGN_BITWISE_XOR,   "^="),
	new TokenDef(TokenType.ASSIGN_DIFFERENCE,    "-="),
	new TokenDef(TokenType.ASSIGN_DIVISION,      "/="),
	new TokenDef(TokenType.ASSIGN_PRODUCT,       "*="),
	new TokenDef(TokenType.ASSIGN_REMAINDER,     "%="),
	new TokenDef(TokenType.ASSIGN_SUM,           "+="),
	new TokenDef(TokenType.CMP_DIFFERENT,        "!="),
	new TokenDef(TokenType.CMP_EQUALS,           "=="),
	new TokenDef(TokenType.CMP_GREATER_OR_EQUAL, ">="),
	new TokenDef(TokenType.CMP_LESS_OR_EQUAL,    "<="),
	new TokenDef(TokenType.DECREMENT,            "--"),
	new TokenDef(TokenType.INCREMENT,            "++"),
	new TokenDef(TokenType.LOGICAL_AND,          "&&"),
	new TokenDef(TokenType.LOGICAL_OR,           "||"),
	new TokenDef(TokenType.MEMBER_PTR_ACC,       "->"),
	new TokenDef(TokenType.SHIFT_LEFT,           "<<"),
	new TokenDef(TokenType.SHIFT_RIGHT,          ">>"),

	// One-character operators and symbols
	new TokenDef(TokenType.AMPERSAND,    "&"),
	new TokenDef(TokenType.ASSIGN,       "="),
	new TokenDef(TokenType.ASTERISK,     "*"),
	new TokenDef(TokenType.BITWISE_AND,  "&"),
	new TokenDef(TokenType.BITWISE_NOT,  "~"),
	new TokenDef(TokenType.BITWISE_OR,   "|"),
	new TokenDef(TokenType.BITWISE_XOR,  "^"),
	new TokenDef(TokenType.CMP_GREATER,  ">"),
	new TokenDef(TokenType.CMP_LESS,     "<"),
	new TokenDef(TokenType.COMMA,        ","),
	new TokenDef(TokenType.DIVISION,     "/"),
	new TokenDef(TokenType.LOGICAL_NOT,  "!"),
	new TokenDef(TokenType.MEMBER_ACC,   "."),
	new TokenDef(TokenType.MINUS,        "-"),
	new TokenDef(TokenType.PLUS,         "+"),
	new TokenDef(TokenType.REMAINDER,    "%"),
	new TokenDef(TokenType.SEMICOLON,    ";"),
	new TokenDef(TokenType.TERNARY_ELSE, ":"),
	new TokenDef(TokenType.TERNARY_IF,   "?"),
	
	// Numbers
	new TokenDef(TokenType.DECIMAL, /^(\d+\.\d+(e[\+\-]?\d+)?)/i, digits),
	new TokenDef(TokenType.INTEGER, /^(0|[1-9]\d*)/, digits),

	// Id
	new TokenDef(
		TokenType.IDENTIFIER,
		/^[_A-Z]\w*/i,
		"_" + lowerCaseAlphabet + upperCaseAlphabet,
	),

	// Text const
	new TokenDef(TokenType.STRING_CONST, /^"([^"\\]|\\.)*"/, '"'),
	new TokenDef(TokenType.CHAR_CONST,   /^'([^'\\]|\\.)*'/, "'"),

	// Enclosing symbols
	new TokenDef(TokenType.OPEN_BRACKETS,         '{'),
	new TokenDef(TokenType.CLOSE_BRACKETS,        '}'),
	new TokenDef(TokenType.OPEN_SQUARE_BRACKETS,  '['),
	new TokenDef(TokenType.CLOSE_SQUARE_BRACKETS, ']'),
	new TokenDef(TokenType.OPEN_PARENTHESIS,      '('),
	new TokenDef(TokenType.CLOSE_PARENTHESIS,     ')'),
];
