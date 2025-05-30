import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";

describe("addSpaceAfter", () => {
  it("should return empty string if input is empty", () => {
    const result = addSpaceAfter("");
    expect(result).toBe("");
  });

  it("should add no trailing space by default", () => {
    const result = addSpaceAfter("hello");
    expect(result).toBe("hello");
  });

  it("should add multiple trailing spaces", () => {
    const result = addSpaceAfter("hello", 3);
    expect(result).toBe("hello   ");
  });

  it("should return the input unchanged if spaceCount is 0", () => {
    const result = addSpaceAfter("hello", 0);
    expect(result).toBe("hello");
  });

  it("should handle spaceCount as negative gracefully", () => {
    const result = addSpaceAfter("hello", -2);
    expect(result).toBe("hello");
  });
});
