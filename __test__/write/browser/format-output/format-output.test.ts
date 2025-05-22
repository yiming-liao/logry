import { LOG_LEVELS_UPPERCASE } from "../../../../src/constants";
import { formatOutput } from "../../../../src/write/browser/format-output";

jest.mock("../../../../src/write/utils/format-timestamp", () => ({
  formatTimestamp: () => "2025-01-01 12:00:00",
}));
jest.mock("../../../../src/write/utils/get-latest-context", () => ({
  getLatestContext: (ctx: string) => ctx?.split("/").pop() || "",
}));

describe("formatOutput", () => {
  const baseOptions = {
    id: "abc123",
    level: "info" as const,
    context: "src/components/Button.tsx",
    message: "Button clicked",
    hideDate: false,
    hideId: false,
    hideContext: false,
    showOnlyLatestContext: false,
  };

  it("formats full output with all tags visible", () => {
    const result = formatOutput(baseOptions);

    expect(result[0]).toContain("%c2025-01-01 12:00:00");
    expect(result[0]).toContain("%cabc123");
    expect(result[0]).toContain("%cINFO");
    expect(result[0]).toContain("%csrc/components/Button.tsx");
    expect(result[0]).toContain("Button clicked");

    expect(result).toHaveLength(6);
  });

  it("hides timestamp if hideDate is true", () => {
    const result = formatOutput({ ...baseOptions, hideDate: true });

    expect(result[0]).toContain("%c");
    expect(result[1]).toContain("padding");
  });

  it("hides ID if hideId is true", () => {
    const result = formatOutput({ ...baseOptions, hideId: true });

    expect(result[0]).not.toContain("abc123");
    expect(result[2]).toBe("");
  });

  it("hides context if hideContext is true", () => {
    const result = formatOutput({ ...baseOptions, hideContext: true });

    expect(result[0]).not.toContain("src/components/Button.tsx");
    expect(result[4]).toBe("");
  });

  it("shows only latest context when showOnlyLatestContext is true", () => {
    const result = formatOutput({
      ...baseOptions,
      showOnlyLatestContext: true,
    });

    expect(result[0]).toContain("Button.tsx");
    expect(result[0]).not.toContain("src/components");
  });

  it("applies fallback color if level is unknown", () => {
    const result = formatOutput({
      ...baseOptions,
      level: "unknown" as unknown as "error",
    });
    expect(result[3]).toBe(
      "font-family: 'Menlo', 'Consolas', 'Courier New', monospace;padding: 4px 8px;border: 1px solid gray;",
    );
  });

  it("omits ID and context styles when hidden", () => {
    const result = formatOutput({
      ...baseOptions,
      hideId: true,
      hideContext: true,
    });

    expect(result[2]).toBe("");
    expect(result[4]).toBe("");
  });

  it("returns the expected structure", () => {
    const result = formatOutput(baseOptions);

    expect(Array.isArray(result)).toBe(true);
    expect(typeof result[0]).toBe("string");
    for (let i = 1; i < result.length; i++) {
      expect(typeof result[i]).toBe("string");
    }
  });

  it("renders correct level tag", () => {
    const result = formatOutput(baseOptions);
    expect(result[0]).toContain(LOG_LEVELS_UPPERCASE["info"]);
  });
});
