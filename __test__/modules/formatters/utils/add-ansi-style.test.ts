import { addAnsiStyle } from "@/modules/formatters/utils/add-ansi-style";

describe("addAnsiStyle", () => {
  it("should return empty string if input is empty", () => {
    expect(addAnsiStyle("", "\x1b[31m")).toBe("");
  });

  it("should return input if ansiStyle is not provided", () => {
    expect(addAnsiStyle("hello")).toBe("hello");
  });

  it("should wrap input with ansiStyle and reset", () => {
    const red = "\x1b[31m";
    expect(addAnsiStyle("hello", red)).toBe(`${red}hello\x1b[0m`);
  });
});
