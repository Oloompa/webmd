import { LEXER_MODE, LexerMode } from "./enum.lexer_mode.ts";

import { InputReader } from "../interface.input_reader.ts";

export class Lexer {
    private mode: LexerMode = LEXER_MODE.DEFAULT;

    constructor(private inputReader: InputReader) {}

    /** Get the next token /next k-th token. */
    peek(size: number) {
        if (this.mode === LEXER_MODE.DEFAULT) {

        }
    }

    /** Get the next token /next k-th token, and remove it from the token stream.  */
    consume(size: number) {}
}
