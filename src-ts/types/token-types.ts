export enum TokenType {

	// Reserved words
	AUTO,
	BREAK,
	CASE,
	CHAR_TYPE,
	CONST,
	CONTINUE,
	DEFAULT,
	DO,
	DOUBLE,
	ELSE,
	ENUM,
	EXTERN,
	FLOAT,
	FOR,
	GOTO,
	IF,
	INT,
	LONG,
	REGISTER,
	RETURN,
	SHORT,
	SIGNED,
	SIZEOF,
	STATIC,
	STRUCT,
	SWITCH,
	TYPEDEF,
	UNION,
	UNSIGNED,
	VOID,
	VOLATILE,
	WHILE,

	// Three-character operators
	ASSIGN_SHIFT_LEFT,
	ASSIGN_SHIFT_RIGHT,

	// Two-character operators
	ASSIGN_BITWISE_AND,
	ASSIGN_BITWISE_OR,
	ASSIGN_BITWISE_XOR,
	ASSIGN_DIFFERENCE,
	ASSIGN_DIVISION,
	ASSIGN_PRODUCT,
	ASSIGN_REMAINDER,
	ASSIGN_SUM,
	CMP_DIFFERENT,
	CMP_EQUALS,
	CMP_GREATER_OR_EQUAL,
	CMP_LESS_OR_EQUAL,
	DECREMENT,
	INCREMENT,
	LOGICAL_AND,
	LOGICAL_OR,
	MEMBER_PTR_ACC,
	SHIFT_LEFT,
	SHIFT_RIGHT,

	// One-character operators and symbols
	AMPERSAND,
	ASSIGN,
	ASTERISK,
	BITWISE_AND,
	BITWISE_NOT,
	BITWISE_OR,
	BITWISE_XOR,
	CMP_GREATER,
	CMP_LESS,
	COMMA,
	DIVISION,
	LOGICAL_NOT,
	MEMBER_ACC,
	MINUS,
	PLUS,
	REMAINDER,
	SEMICOLON,
	TERNARY_ELSE,
	TERNARY_IF,

	// Variable sized tokens
	DECIMAL,
	INTEGER,
	IDENTIFIER,
	CHAR_CONST,
	STRING_CONST,

	// Enclosing symbols
	OPEN_BRACKETS,
	CLOSE_BRACKETS,
	OPEN_SQUARE_BRACKETS,
	CLOSE_SQUARE_BRACKETS,
	OPEN_PARENTHESIS,
	CLOSE_PARENTHESIS,
};
