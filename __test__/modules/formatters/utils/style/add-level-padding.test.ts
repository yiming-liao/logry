import { addLevelPadding } from "@/modules/formatters/utils/style/add-level-padding";
import { LEVEL_CONFIG } from "@/shared/constants";

describe("addLevelPadding", () => {
  it("should add a space if rawLevel exists and level length is 4", () => {
    const level = "WARN";
    const rawLevel = "warn";
    expect(rawLevel in LEVEL_CONFIG).toBe(true);
    expect(addLevelPadding(level, rawLevel)).toBe("WARN ");
  });

  it("should not add space if level length is not 4", () => {
    expect(addLevelPadding("DEBUG", "debug")).toBe("DEBUG");
    expect(addLevelPadding("ERROR", "error")).toBe("ERROR");
  });

  it("should not add space if rawLevel is not in LEVEL_CONFIG", () => {
    const level = "TEST";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawLevel = "test" as any;
    expect(rawLevel in LEVEL_CONFIG).toBe(false);
    expect(addLevelPadding(level, rawLevel)).toBe("TEST");
  });
});
