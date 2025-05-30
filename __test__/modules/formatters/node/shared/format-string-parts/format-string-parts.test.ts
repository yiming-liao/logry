import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

describe("formatStringParts", () => {
  it("should return empty string if part is hidden", () => {
    const result = formatStringParts({
      label: "id",
      part: "abc123",
      rawPart: "abc123",
      options: { hide: true },
    });
    expect(result).toBe("");
  });

  it("should apply prefix and suffix", () => {
    const result = formatStringParts({
      label: "id",
      part: "abc",
      rawPart: "abc",
      options: { prefix: "[", suffix: "]" },
    });

    expect(result).toBe("[abc]");
  });

  it("should apply custom formatter if provided", () => {
    const result = formatStringParts({
      label: "custom",
      part: "test",
      rawPart: "test",
      options: {
        customFormatter: (input) => `**${input.part}**`,
      },
    });
    expect(result).toBe("**test**");
  });

  it("should resolve scope string with showOnlyLatest", () => {
    const result = formatStringParts({
      label: "scope",
      part: "user.auth.login",
      rawPart: ["user", "auth", "login"],
      options: { showOnlyLatest: true },
    });
    expect(result).toBe("login");
  });

  it("should resolve scope string with custom separator", () => {
    const result = formatStringParts({
      label: "scope",
      part: "user.auth.login",
      rawPart: ["user", "auth", "login"],
      options: { separator: " > " },
    });
    expect(result).toBe("user > auth > login");
  });

  it("should pad level with single space if 4 chars", () => {
    const result = formatStringParts({
      label: "level",
      part: "INFO",
      rawPart: "info",
      options: {},
    });
    expect(result).toBe("INFO ");
  });

  it("should apply ansi color if provided", () => {
    const result = formatStringParts({
      label: "id",
      part: "hello",
      rawPart: "hello",
      options: { ansiColor: "blue" },
    });
    expect(result).toContain("hello"); // Color codes tested elsewhere
  });

  it("should add line break prefix if set", () => {
    const result = formatStringParts({
      label: "message",
      part: "line",
      rawPart: "line",
      options: { lineBreaks: 2 },
    });
    expect(result.startsWith("\n\n")).toBe(true);
  });

  it("should add space after if enabled", () => {
    const result = formatStringParts({
      label: "message",
      part: "msg",
      rawPart: "msg",
      options: { spaceAfter: 1 },
    });
    expect(result).toBe("msg ");
  });
});
