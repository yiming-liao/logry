import { BROWSER_LEVEL_COLOR_STRING } from "../../../../../src/constants";
import { composeLogStyles } from "../../../../../src/log-pipeline/format/browser/utils/compose-log-styles";

describe("composeLogStyles", () => {
  const baseFont =
    "font-family: 'Menlo', 'Consolas', 'Courier New', monospace;";
  const padding = "padding: 4px 8px;";
  const border = "border: 1px solid gray;";

  it("should return full style array when showId and showContext are true", () => {
    const level = "info";
    const color = BROWSER_LEVEL_COLOR_STRING[level];

    const styles = composeLogStyles({ level, showId: true, showContext: true });

    expect(styles[0]).toContain(`border-left: 8px solid ${color};`);
    expect(styles[1]).toContain("font-style: italic");
    expect(styles[2]).toContain(`background:${color}`);
    expect(styles[3]).toBe(`${baseFont}${padding}${border}`);
    expect(styles[4]).toBe(`${baseFont}${padding}`);
  });

  it("should omit ID and context styles when flags are false", () => {
    const level = "error";

    const styles = composeLogStyles({
      level,
      showId: false,
      showContext: false,
    });

    expect(styles[1]).toBe("");
    expect(styles[3]).toBe("");
  });

  it("should fallback to empty color if level is not in map", () => {
    const fakeLevel = "unknown" as "error";

    const styles = composeLogStyles({
      level: fakeLevel,
      showId: true,
      showContext: true,
    });

    expect(styles[0]).toContain("border-left: 8px solid ;"); // No color fallback
    expect(styles[2]).toContain("background:"); // empty background
  });
});
