import { InputReader } from "./interface.input_reader.ts";

export class StreamInputReader implements InputReader {
    private inputString = "";
    private streamReader: ReadableStreamDefaultReader<string>;
    private isStreamConsumed = false;

    constructor(private inputStream: ReadableStream) {
        this.streamReader = inputStream.getReader();
    }

    /** Get the next character /next k-th character from the input. */
    async peek(size = 1) {
        if (size < 1)
            throw new RangeError("Param size must be a positive integer.");
        if (this.inputString.length < size && !this.isStreamConsumed) {
            const { done, value } = await this.streamReader.read();
            if (value !== undefined) this.inputString += value;
            if (done) this.isStreamConsumed = true;
        }
        return this.inputString.slice(0, size);
    }

    /** Get the next character /next k-th token from the input, and remove it from the input. */
    consume(size = 1) {
        const next = this.peek(size);
        this.inputString = this.inputString.slice(size);
        return next;
    }

    /** Checks whether the reader has reached the end of the input. */
    isEOF() {
        return this.isStreamConsumed && this.inputString.length === 0;
    }
}
