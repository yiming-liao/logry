import { getNewLinesString } from "../../../../src/log-pipeline/print/utils/get-new-lines-string";

describe("getNewLinesString", () => {
  it("returns empty string when count is 0", () => {
    expect(getNewLinesString(0)).toBe("");
  });

  it("returns empty string when count is negative", () => {
    expect(getNewLinesString(-3)).toBe("");
  });

  it("returns single newline when count is 1", () => {
    expect(getNewLinesString(1)).toBe("\n");
  });

  it("returns multiple newlines when count > 1", () => {
    expect(getNewLinesString(3)).toBe("\n\n\n");
  });

  it("returns empty string when count is undefined", () => {
    expect(getNewLinesString()).toBe("");
  });
});
