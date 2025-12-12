import { describe, it, expect } from "vitest";
import { buildTimestampString } from "@/pipeline/hooks/format/utils/build-timestamp-string";

describe("buildTimestampString", () => {
  const ts = Date.UTC(2025, 0, 2, 3, 4, 5, 6); // 2025-01-02 03:04:05.006 UTC

  it("formats with date in UTC", () => {
    const result = buildTimestampString({
      timestamp: ts,
      useUTC: true,
      withDate: true,
    });
    expect(result).toBe("2025-01-02 03:04:05.006");
  });

  it("formats without date in UTC", () => {
    const result = buildTimestampString({
      timestamp: ts,
      useUTC: true,
      withDate: false,
    });
    expect(result).toBe("03:04:05.006");
  });

  it("formats with date in local time", () => {
    const local = new Date(ts);
    const expected =
      `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(
        2,
        "0",
      )}-${String(local.getDate()).padStart(2, "0")} ` +
      `${String(local.getHours()).padStart(2, "0")}:${String(
        local.getMinutes(),
      ).padStart(2, "0")}:${String(local.getSeconds()).padStart(
        2,
        "0",
      )}.${String(local.getMilliseconds()).padStart(3, "0")}`;

    const result = buildTimestampString({
      timestamp: ts,
      useUTC: false,
      withDate: true,
    });

    expect(result).toBe(expected);
  });

  it("formats without date in local time", () => {
    const local = new Date(ts);
    const expected =
      `${String(local.getHours()).padStart(2, "0")}:` +
      `${String(local.getMinutes()).padStart(2, "0")}:` +
      `${String(local.getSeconds()).padStart(2, "0")}.` +
      `${String(local.getMilliseconds()).padStart(3, "0")}`;

    const result = buildTimestampString({
      timestamp: ts,
      useUTC: false,
      withDate: false,
    });

    expect(result).toBe(expected);
  });
});
