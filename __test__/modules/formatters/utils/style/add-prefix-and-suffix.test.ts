import { addPrefixAndSuffix } from "@/modules/formatters/utils/style/add-prefix-and-suffix";

describe("addPrefixAndSuffix", () => {
  it("should return empty string if input is empty", () => {
    expect(addPrefixAndSuffix("")).toBe("");
    expect(addPrefixAndSuffix("")).toBe("");
  });

  it("should add leading and trailing characters", () => {
    expect(addPrefixAndSuffix("text", "[", "]")).toBe("[text]");
  });

  it("should add only leading character if trailingChar is not provided", () => {
    expect(addPrefixAndSuffix("text", "<")).toBe("<text");
  });

  it("should add only trailing character if leadingChar is not provided", () => {
    expect(addPrefixAndSuffix("text", undefined, ">")).toBe("text>");
  });

  it("should return input unchanged if no leading or trailing characters provided", () => {
    expect(addPrefixAndSuffix("text")).toBe("text");
  });
});
