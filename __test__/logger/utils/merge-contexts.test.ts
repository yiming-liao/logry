import { mergeContexts } from "../../../src/logger/utils/merge-contexts";
import { contextEncoder } from "../../../src/utils/context-encoder";

jest.mock("../../../src/utils/context-encoder", () => ({
  contextEncoder: {
    splitContext: jest.fn(),
    joinContext: jest.fn(),
  },
}));

describe("mergeContexts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns baseContext if additionalContext is undefined", () => {
    expect(mergeContexts("base")).toBe("base");
    expect(mergeContexts(undefined)).toBeUndefined();
  });

  it("calls splitContext and joinContext correctly when additionalContext is given", () => {
    (contextEncoder.splitContext as jest.Mock).mockReturnValue([
      "part1",
      "part2",
    ]);
    (contextEncoder.joinContext as jest.Mock).mockReturnValue("merged-context");

    const result = mergeContexts("base-context", "extra");

    expect(contextEncoder.splitContext).toHaveBeenCalledWith("base-context");
    expect(contextEncoder.joinContext).toHaveBeenCalledWith([
      "part1",
      "part2",
      "extra",
    ]);
    expect(result).toBe("merged-context");
  });

  it("handles undefined baseContext correctly", () => {
    (contextEncoder.splitContext as jest.Mock).mockReturnValue([]);
    (contextEncoder.joinContext as jest.Mock).mockReturnValue("extra-only");

    const result = mergeContexts(undefined, "extra");

    expect(contextEncoder.splitContext).toHaveBeenCalledWith(undefined);
    expect(contextEncoder.joinContext).toHaveBeenCalledWith(["extra"]);
    expect(result).toBe("extra-only");
  });
});
