import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";

describe("addLineBreakPrefix", () => {
  it("should return empty string if input is empty", () => {
    const result = addLineBreakPrefix("", 2);
    expect(result).toBe("");
  });

  it("should return original input if lineBreaks is zero", () => {
    const result = addLineBreakPrefix("hello", 0);
    expect(result).toBe("hello");
  });

  it("should return original input if lineBreaks is negative", () => {
    const result = addLineBreakPrefix("hello", -1);
    expect(result).toBe("hello");
  });

  it("should prepend one line break to the input", () => {
    const result = addLineBreakPrefix("hello", 1);
    expect(result).toBe("\nhello");
  });

  it("should prepend multiple line breaks to the input", () => {
    const result = addLineBreakPrefix("hello", 3);
    expect(result).toBe("\n\n\nhello");
  });

  it("should default to zero line breaks if lineBreaks is undefined", () => {
    const result = addLineBreakPrefix("hello");
    expect(result).toBe("hello");
  });
});
