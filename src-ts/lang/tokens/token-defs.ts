import { TokenDef } from "../../model/token-def.js";

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

const reservedWord = (word: string): TokenDef => {
	const pattern = new RegExp(`^${word}\\b`);
	return new TokenDef(pattern, word[0]);
};

// Reserved words
export const AUTO =      reservedWord("auto");
export const BREAK =     reservedWord("break");
export const CASE =      reservedWord("case");
export const CHAR_TYPE = reservedWord("char");
export const CONST =     reservedWord("const");
export const CONTINUE =  reservedWord("continue");
export const DEFAULT =   reservedWord("default");
export const DO =        reservedWord("do");
export const DOUBLE =    reservedWord("double");
export const ELSE =      reservedWord("else");
export const ENUM =      reservedWord("enum");
export const EXTERN =    reservedWord("extern");
export const FLOAT =     reservedWord("float");
export const FOR =       reservedWord("for");
export const GOTO =      reservedWord("goto");
export const IF =        reservedWord("if");
export const INT =       reservedWord("int");
export const LONG =      reservedWord("long");
export const REGISTER =  reservedWord("register");
export const RETURN =    reservedWord("return");
export const SHORT =     reservedWord("short");
export const SIGNED =    reservedWord("signed");
export const SIZEOF =    reservedWord("sizeof");
export const STATIC =    reservedWord("static");
export const STRUCT =    reservedWord("struct");
export const SWITCH =    reservedWord("switch");
export const TYPEDEF =   reservedWord("typedef");
export const UNION =     reservedWord("union");
export const UNSIGNED =  reservedWord("unsigned");
export const VOID =      reservedWord("void");
export const VOLATILE =  reservedWord("volatile");
export const WHILE =     reservedWord("while");

// Three-character operators
export const ASSIGN_SHIFT_LEFT = new TokenDef( "<<=");
export const ASSIGN_SHIFT_RIGHT = new TokenDef(">>=");

// Two-character operators
export const ASSIGN_BITWISE_AND =   new TokenDef("&=");
export const ASSIGN_BITWISE_OR =    new TokenDef("|=");
export const ASSIGN_BITWISE_XOR =   new TokenDef("^=");
export const ASSIGN_DIFFERENCE =    new TokenDef("-=");
export const ASSIGN_DIVISION =      new TokenDef("/=");
export const ASSIGN_PRODUCT =       new TokenDef("*=");
export const ASSIGN_REMAINDER =     new TokenDef("%=");
export const ASSIGN_SUM =           new TokenDef("+=");
export const CMP_DIFFERENT =        new TokenDef("!=");
export const CMP_EQUALS =           new TokenDef("==");
export const CMP_GREATER_OR_EQUAL = new TokenDef(">=");
export const CMP_LESS_OR_EQUAL =    new TokenDef("<=");
export const DECREMENT =            new TokenDef("--");
export const INCREMENT =            new TokenDef("++");
export const LOGICAL_AND =          new TokenDef("&&");
export const LOGICAL_OR =           new TokenDef("||");
export const MEMBER_PTR_ACC =       new TokenDef("->");
export const SHIFT_LEFT =           new TokenDef("<<");
export const SHIFT_RIGHT =          new TokenDef(">>");

// One-character operators and symbols
export const AMPERSAND =    new TokenDef("&");
export const ASSIGN =       new TokenDef("=");
export const ASTERISK =     new TokenDef("*");
export const BITWISE_AND =  new TokenDef("&");
export const BITWISE_NOT =  new TokenDef("~");
export const BITWISE_OR =   new TokenDef("|");
export const BITWISE_XOR =  new TokenDef("^");
export const CMP_GREATER =  new TokenDef(">");
export const CMP_LESS =     new TokenDef("<");
export const COMMA =        new TokenDef(",");
export const DIVISION =     new TokenDef("/");
export const LOGICAL_NOT =  new TokenDef("!");
export const MEMBER_ACC =   new TokenDef(".");
export const MINUS =        new TokenDef("-");
export const PLUS =         new TokenDef("+");
export const REMAINDER =    new TokenDef("%");
export const SEMICOLON =    new TokenDef(";");
export const TERNARY_ELSE = new TokenDef(":");
export const TERNARY_IF =   new TokenDef("?");

// Numbers
export const DECIMAL = new TokenDef(/^(\d+\.\d+(e[\+\-]?\d+)?)/i, digits);
export const INTEGER = new TokenDef(/^(0|[1-9]\d*)/, digits);

// Id
export const IDENTIFIER = new TokenDef(/^[_A-Z]\w*/i, "_" + lowerCaseAlphabet + upperCaseAlphabet);

// Text constants
export const STRING_CONST = new TokenDef(/^"([^"\\]|\\.)*"/, '"');
export const CHAR_CONST   = new TokenDef(/^'([^'\\]|\\.)*'/, "'");

// Enclosing symbols
export const OPEN_BRACKETS =         new TokenDef('{');
export const CLOSE_BRACKETS =        new TokenDef('}');
export const OPEN_SQUARE_BRACKETS =  new TokenDef('[');
export const CLOSE_SQUARE_BRACKETS = new TokenDef(']');
export const OPEN_PARENTHESIS =      new TokenDef('(');
export const CLOSE_PARENTHESIS =     new TokenDef(')');
