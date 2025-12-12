import { describe, it, expect } from "vitest";
import {
  composeAnsi,
  composeBrowser,
  composePlain,
} from "@/pipeline/hooks/print/utils/compose";

describe("compose utilities", () => {
  it("composeAnsi concatenates ANSI segments", () => {
    const result = composeAnsi([
      { ansi: "\u001B[31mRED\u001B[0m" },
      { ansi: null },
      { ansi: "\u001B[32mGREEN\u001B[0m" },
    ]);

    expect(result).toBe("\u001B[31mRED\u001B[0m\u001B[32mGREEN\u001B[0m");
  });

  it("composeBrowser applies %c styling when css is present", () => {
    const result = composeBrowser([
      { plain: "A", cssStyle: "color:red" },
      { plain: "B" },
      { plain: "C", cssStyle: "font-weight:bold" },
    ]);

    expect(result.text).toBe("%cA%cB%cC%c");
    expect(result.cssStyle).toEqual(["color:red", "", "font-weight:bold", ""]);
  });

  it("composeBrowser skips null values", () => {
    const result = composeBrowser([
      { plain: null },
      { plain: "X", cssStyle: "blue" },
    ]);

    expect(result.text).toBe("%cX%c");
    expect(result.cssStyle).toEqual(["blue", ""]);
  });

  it("composePlain removes line breaks", () => {
    const result = composePlain([
      { plain: "Hello\n" },
      { plain: "World\r\n" },
      { plain: null },
    ]);

    expect(result).toBe("HelloWorld");
  });
});
