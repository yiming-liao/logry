import { formatTimestamp } from "../../../src/write/utils/format-timestamp";

describe("formatTimestamp", () => {
  const mockDate = new Date("2025-05-21T14:30:00Z");

  it("should format full timestamp by default", () => {
    const result = formatTimestamp(false, "UTC", mockDate);
    expect(result).toBe("2025-05-21 14:30:00");
  });

  it("should format time only when hideDate is true", () => {
    const result = formatTimestamp(true, "UTC", mockDate);
    expect(result).toBe("14:30:00");
  });

  it("should respect timeZone when provided", () => {
    const result = formatTimestamp(false, "Asia/Taipei", mockDate);
    // Taipei is UTC+8, so 14:30 UTC = 22:30 Taipei
    expect(result).toBe("2025-05-21 22:30:00");
  });

  it("should use system time if no date is provided", () => {
    const result = formatTimestamp();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(5);
  });
});
