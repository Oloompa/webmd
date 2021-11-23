import { assertEquals, assertThrowsAsync } from "../../src/deps.ts";

import { StreamInputReader } from "../../src/parser/reader/class.stream_input_reader.ts";
import { StringInputReader } from "../../src/parser/reader/class.string_input_reader.ts";

for (const InputReader of [StringInputReader, StreamInputReader]) {
    const initInputReader = (chars: string) => {
        if (InputReader === StringInputReader) return new InputReader(chars);
        if (InputReader === StreamInputReader) {
            return new InputReader(
                new ReadableStream({
                    start(controller) {
                        controller.enqueue(chars);
                    },
                    pull(_controller) {},
                    cancel() {},
                })
            );
        }
        throw new Error("Not implemented !");
    };

    Deno.test(
        `${InputReader.name}.consume() size should be a positive integer`,
        () => {
            const stringReader = initInputReader("ab");
            assertThrowsAsync(
                () => {
                    return stringReader.consume(-1);
                },
                RangeError,
                undefined,
                "Param size must be a positive integer."
            );
            assertThrowsAsync(
                () => {
                    return stringReader.consume(0);
                },
                RangeError,
                undefined,
                "Param size must be a positive integer."
            );
        }
    );

    Deno.test(
        `${InputReader.name}.consume() should return one char`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.consume(1), "a");
        }
    );

    Deno.test(
        `${InputReader.name}.consume() multiple times should return followings char`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.consume(1), "a");
            assertEquals(await stringReader.consume(1), "b");
        }
    );

    Deno.test(
        `${InputReader.name}.consume() should return two chars`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.consume(2), "ab");
        }
    );

    Deno.test(
        `${InputReader.name}.consume() should return all chars if size exceed length`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.consume(3), "ab");
        }
    );
}
