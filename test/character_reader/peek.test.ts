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
        `${InputReader.name}.peek() size should be a positive integer`,
        () => {
            const stringReader = initInputReader("ab");
            assertThrowsAsync(
                () => {
                    return stringReader.peek(-1);
                },
                RangeError,
                undefined,
                "Param size must be a positive integer."
            );
            assertThrowsAsync(
                () => {
                    return stringReader.peek(0);
                },
                RangeError,
                undefined,
                "Param size must be a positive integer."
            );
        }
    );

    Deno.test(`${InputReader.name}.peek() should return one char`, async () => {
        const stringReader = initInputReader("ab");
        assertEquals(await stringReader.peek(1), "a");
    });

    Deno.test(
        `${InputReader.name}.peek() multiple times should return the same char`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.peek(1), "a");
            assertEquals(await stringReader.peek(1), "a");
        }
    );

    Deno.test(
        `${InputReader.name}.peek() should return two chars`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.peek(2), "ab");
        }
    );

    Deno.test(
        `${InputReader.name}.peek() should return the same chars`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.peek(2), "ab");
            assertEquals(await stringReader.peek(2), "ab");
        }
    );

    Deno.test(
        `${InputReader.name}.peek() should return all chars if size exceed length`,
        async () => {
            const stringReader = initInputReader("ab");
            assertEquals(await stringReader.peek(3), "ab");
        }
    );
}
