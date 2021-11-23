export const TOKEN_CATEGORY = {
    KEYWORD: 0,
    IDENTIFIER: 0,
    LITERAL: 0,
    SYNTAX: 0,
} as const;
export type TokenCategory = typeof TOKEN_CATEGORY[keyof typeof TOKEN_CATEGORY];
