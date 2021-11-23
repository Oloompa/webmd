export const LEXER_MODE = {
    DEFAULT: 0,
} as const;
export type LexerMode = typeof LEXER_MODE[keyof typeof LEXER_MODE];
