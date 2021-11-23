export interface InputReader {
    peek(size: number): Promise<string>;
    consume(size: number): Promise<string>;
    isEOF(): boolean;
}
