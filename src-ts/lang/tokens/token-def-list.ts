import * as Tokens from './token-defs.js';

export const tokenDefList = [

	// Reserved words
	Tokens.AUTO,
	Tokens.BREAK,
	Tokens.CASE,
	Tokens.CHAR_TYPE,
	Tokens.CONST,
	Tokens.CONTINUE,
	Tokens.DEFAULT,
	Tokens.DO,
	Tokens.DOUBLE,
	Tokens.ELSE,
	Tokens.ENUM,
	Tokens.EXTERN,
	Tokens.FLOAT,
	Tokens.FOR,
	Tokens.GOTO,
	Tokens.IF,
	Tokens.INT,
	Tokens.LONG,
	Tokens.REGISTER,
	Tokens.RETURN,
	Tokens.SHORT,
	Tokens.SIGNED,
	Tokens.SIZEOF,
	Tokens.STATIC,
	Tokens.STRUCT,
	Tokens.SWITCH,
	Tokens.TYPEDEF,
	Tokens.UNION,
	Tokens.UNSIGNED,
	Tokens.VOID,
	Tokens.VOLATILE,
	Tokens.WHILE,

	// Three-character operators
	Tokens.ASSIGN_SHIFT_LEFT,
	Tokens.ASSIGN_SHIFT_RIGHT,

	// Two-character operators
	Tokens.ASSIGN_BITWISE_AND,
	Tokens.ASSIGN_BITWISE_OR,
	Tokens.ASSIGN_BITWISE_XOR,
	Tokens.ASSIGN_DIFFERENCE,
	Tokens.ASSIGN_DIVISION,
	Tokens.ASSIGN_PRODUCT,
	Tokens.ASSIGN_REMAINDER,
	Tokens.ASSIGN_SUM,
	Tokens.CMP_DIFFERENT,
	Tokens.CMP_EQUALS,
	Tokens.CMP_GREATER_OR_EQUAL,
	Tokens.CMP_LESS_OR_EQUAL,
	Tokens.DECREMENT,
	Tokens.INCREMENT,
	Tokens.LOGICAL_AND,
	Tokens.LOGICAL_OR,
	Tokens.MEMBER_PTR_ACC,
	Tokens.SHIFT_LEFT,
	Tokens.SHIFT_RIGHT,
	
	// One-character operators and symbols
	Tokens.AMPERSAND,
	Tokens.ASSIGN,
	Tokens.ASTERISK,
	Tokens.BITWISE_AND,
	Tokens.BITWISE_NOT,
	Tokens.BITWISE_OR,
	Tokens.BITWISE_XOR,
	Tokens.CMP_GREATER,
	Tokens.CMP_LESS,
	Tokens.COMMA,
	Tokens.DIVISION,
	Tokens.LOGICAL_NOT,
	Tokens.MEMBER_ACC,
	Tokens.MINUS,
	Tokens.PLUS,
	Tokens.REMAINDER,
	Tokens.SEMICOLON,
	Tokens.TERNARY_ELSE,
	Tokens.TERNARY_IF,
	
	// Numbers
	Tokens.DECIMAL,
	Tokens.INTEGER,
	
	// Id
	Tokens.IDENTIFIER,
	
	// Text constants
	Tokens.STRING_CONST,
	Tokens.CHAR_CONST,
	
	// Enclosing symbols
	Tokens.OPEN_BRACKETS,
	Tokens.CLOSE_BRACKETS,
	Tokens.OPEN_SQUARE_BRACKETS,
	Tokens.CLOSE_SQUARE_BRACKETS,
	Tokens.OPEN_PARENTHESIS,
	Tokens.CLOSE_PARENTHESIS,
];
