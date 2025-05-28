import { composeLogLine } from "../../../../../src/log-pipeline/format/node/utils/compose-log-line";

describe("composeLogLine", () => {
  const parts = {
    timestampTag: "[2025-05-25] ",
    idTag: "[abc123] ",
    levelTag: "[INFO]  ",
    scopeTag: "(main) ",
    linesBeforeMessage: "\n\n",
    messageLine: "Hello world! ",
  };

  test("returns plain string when useColor is false", () => {
    const result = composeLogLine(parts, false, 34);
    expect(result).toBe(
      "[2025-05-25] [abc123] [INFO]  (main) \n\nHello world! ",
    );
  });

  test("returns colored string when useColor is true", () => {
    const colorCode = 34; // blue for example
    const result = composeLogLine(parts, true, colorCode);

    // Expect the result to contain ANSI color codes for timestamp, level, context
    expect(result).toContain("\x1b[38;5;245m[2025-05-25] \x1b[0m");
    expect(result).toContain(`\x1b[38;5;${colorCode}m[INFO]  \x1b[0m`);
    expect(result).toContain("\x1b[38;5;245m(main) \x1b[0m");

    // Also expect idTag, linesBeforeMessage, messageLine intact (no color codes)
    expect(result).toContain("[abc123] ");
    expect(result).toContain("\n\n");
    expect(result).toContain("Hello world! ");
  });
});
