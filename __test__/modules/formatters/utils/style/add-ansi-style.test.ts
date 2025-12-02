import { addAnsiStyle } from "@/modules/formatters/utils/style/add-ansi-style";

describe("addAnsiStyle", () => {
  it("should return empty string if input is empty", () => {
    expect(addAnsiStyle("", "\u001B[31m")).toBe("");
  });

  it("should return input if ansiStyle is not provided", () => {
    expect(addAnsiStyle("hello")).toBe("hello");
  });

  it("should wrap input with ansiStyle and reset", () => {
    const red = "\u001B[31m";
    expect(addAnsiStyle("hello", red)).toBe(`${red}hello\u001B[0m`);
  });
});
