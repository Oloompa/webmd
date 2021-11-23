import { InputReader } from "./interface.input_reader.ts";

export class StringInputReader implements InputReader {
    constructor(private inputString: string) {}

    /** Get the next character /next k-th character from the input. */
    peek(size = 1) {
        if (size < 1)
            throw new RangeError("Param size must be a positive integer.");
        return Promise.resolve(this.inputString.slice(0, size));
    }

    /** Get the next character /next k-th token from the input, and remove it from the input. */
    consume(size = 1) {
        const next = this.peek(size);
        this.inputString = this.inputString.slice(size);
        return Promise.resolve(next);
    }

    /** Checks whether the reader has reached the end of the input. */
    isEOF() {
        return this.inputString.length === 0;
    }
}
