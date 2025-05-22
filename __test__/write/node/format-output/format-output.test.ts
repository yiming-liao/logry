import {
  CONTEXT_SEPARATOR,
  DEFAULT_NODE_LEVEL_COLOR_CODE,
} from "../../../../src/constants";
import { formatOutput } from "../../../../src/write/node/format-output";

describe("formatOutput", () => {
  const baseOptions = {
    id: "abc123",
    level: "info",
    context: `my-app${CONTEXT_SEPARATOR}utils${CONTEXT_SEPARATOR}logger`,
    message: "Something happened",
    useColor: false,
    hideDate: true,
    hideId: false,
    hideContext: false,
    showOnlyLatestContext: false,
  } as const;

  it("includes all parts by default", () => {
    const result = formatOutput(baseOptions);

    expect(result).toContain("[abc123]");
    expect(result).toContain("[INFO]");
    expect(result).toContain(
      `(my-app${CONTEXT_SEPARATOR}utils${CONTEXT_SEPARATOR}logger)`,
    );
    expect(result).toContain("• Something happened");
  });

  it("hides id when hideId is true", () => {
    const result = formatOutput({ ...baseOptions, hideId: true });
    expect(result).not.toContain("[abc123]");
  });

  it("hides context when hideContext is true", () => {
    const result = formatOutput({ ...baseOptions, hideContext: true });
    expect(result).not.toContain(
      `(my-app${CONTEXT_SEPARATOR}utils${CONTEXT_SEPARATOR}logger)`,
    );
  });

  it("shows only latest context when showOnlyLatestContext is true", () => {
    const result = formatOutput({
      ...baseOptions,
      showOnlyLatestContext: true,
    });
    expect(result).toContain("(logger)");
  });

  it("omits date but keeps time when hideDate is true", () => {
    const result = formatOutput({ ...baseOptions, hideDate: true });
    const timeOnlyPattern = /^\[\d{2}:\d{2}:\d{2}\]/;
    expect(result).toMatch(timeOnlyPattern);
  });

  it("includes ANSI color codes when useColor is true", () => {
    const result = formatOutput({ ...baseOptions, useColor: true });
    expect(result).toContain("\x1b[38;5;");
    expect(result).toContain("\x1b[0m");
  });

  it("does not include ANSI color when useColor is false", () => {
    const result = formatOutput({ ...baseOptions, useColor: false });
    expect(result).not.toContain("\x1b[38;5;");
    expect(result).not.toContain("\x1b[0m");
  });

  it("uses default color code when level is unknown", () => {
    const result = formatOutput({
      ...baseOptions,
      level: "custom" as "error",
      useColor: true,
      hideDate: true,
    });
    const defaultColorCode = "\x1b[38;5;" + DEFAULT_NODE_LEVEL_COLOR_CODE + "m";
    expect(result).toContain(defaultColorCode);
  });
});
