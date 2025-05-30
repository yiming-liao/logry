import { internalLog } from "@/internal";
import { DEFAULT_LEVEL_STYLE } from "@/modules/normalizers/constants";
import { normalizeLevel } from "@/modules/normalizers/parts/level";

// mock internalLog
jest.mock("@/internal/internal-log", () => ({
  internalLog: jest.fn(),
}));

describe("normalizeLevel", () => {
  it("should return customized level if customNormalizer is provided", () => {
    const rawLevel = "info";
    const normalizedLevel = "CUSTOM";

    const customNormalizer = () => normalizedLevel;

    const result = normalizeLevel(rawLevel, { customNormalizer });

    expect(result).toBe(normalizedLevel);
  });

  it("should return level as-is when style is 'lower'", () => {
    const rawLevel = "warn";

    const result = normalizeLevel(rawLevel, { style: "lower" });

    expect(result).toBe("warn");
  });

  it("should return level in title case when style is 'title'", () => {
    const rawLevel = "error";

    const result = normalizeLevel(rawLevel, { style: "title" });

    expect(result).toBe("Error");
  });

  it("should return level in upper case when style is 'upper'", () => {
    const rawLevel = "debug";

    const result = normalizeLevel(rawLevel, { style: "upper" });

    expect(result).toBe("DEBUG");
  });

  it("should return upper case level and log warning when style is unknown", () => {
    const rawLevel = "info";

    const result = normalizeLevel(rawLevel, {
      style: "weird-style" as unknown as "upper",
    });

    expect(result).toBe("INFO");
    expect(internalLog).toHaveBeenCalledWith({
      type: "warn",
      message: 'Unknown level style "weird-style", using "upper" as fallback.',
    });
  });

  it("should use default style when no style is provided", () => {
    const rawLevel = "error";

    const result = normalizeLevel(rawLevel);

    if (DEFAULT_LEVEL_STYLE === "lower") {
      expect(result).toBe("error");
    } else if (DEFAULT_LEVEL_STYLE === "title") {
      expect(result).toBe("Error");
    } else if (DEFAULT_LEVEL_STYLE === "upper") {
      expect(result).toBe("ERROR");
    }
  });
});
