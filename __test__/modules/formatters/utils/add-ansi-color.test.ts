import { addAnsiColor } from "@/modules/formatters/utils/add-ansi-color";

describe("addAnsiColor", () => {
  it("should return empty string if input is empty", () => {
    expect(addAnsiColor("", "\x1b[31m")).toBe("");
  });

  it("should return input if ansiColor is not provided", () => {
    expect(addAnsiColor("hello")).toBe("hello");
  });

  it("should wrap input with ansiColor and reset", () => {
    const red = "\x1b[31m";
    expect(addAnsiColor("hello", red)).toBe(`${red}hello\x1b[0m`);
  });
});
