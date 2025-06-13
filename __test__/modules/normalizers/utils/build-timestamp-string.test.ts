import { buildTimestampString } from "@/modules/normalizers/utils/build-timestamp-string";

describe("buildTimestampString", () => {
  const baseDate = new Date("2024-06-04T12:30:45Z");
  const baseMs = baseDate.getTime();

  it("should return full UTC date and time when useUTC is true", () => {
    const result = buildTimestampString({
      timestamp: baseMs,
      useUTC: true,
      showTimeOnly: false,
    });
    expect(result).toBe("2024-06-04 12:30:45");
  });

  it("should return full local date and time when useUTC is false", () => {
    const result = buildTimestampString({
      timestamp: baseMs,
      useUTC: false,
      showTimeOnly: false,
    });

    const local = new Date(baseMs);
    const expected = `${local.getFullYear()}-${(local.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${local.getDate().toString().padStart(2, "0")} ${local
      .getHours()
      .toString()
      .padStart(2, "0")}:${local
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${local.getSeconds().toString().padStart(2, "0")}`;

    expect(result).toBe(expected);
  });

  it("should return only UTC time when showTimeOnly is true", () => {
    const result = buildTimestampString({
      timestamp: baseMs,
      useUTC: true,
      showTimeOnly: true,
    });
    expect(result).toBe("12:30:45");
  });

  it("should return only local time when showTimeOnly is true and useUTC is false", () => {
    const result = buildTimestampString({
      timestamp: baseMs,
      useUTC: false,
      showTimeOnly: true,
    });

    const local = new Date(baseMs);
    const expected = `${local.getHours().toString().padStart(2, "0")}:${local
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${local.getSeconds().toString().padStart(2, "0")}`;

    expect(result).toBe(expected);
  });
});
