import type { SnapshotLogFields } from "@/shared/types/log-fields";
import { internalLog } from "@/internal";
import { normalizeTimestamp } from "@/modules/normalizers/fields";
import { buildTimestampString } from "@/modules/normalizers/utils/build-timestamp-string";

jest.mock("@/modules/normalizers/utils/build-timestamp-string", () => ({
  buildTimestampString: jest.fn(() => "mocked-pretty-string"),
}));

jest.mock("@/internal/internal-log", () => ({
  internalLog: jest.fn(),
}));

describe("normalizeTimestamp", () => {
  const timestamp = new Date("2024-06-04T12:34:56Z").getTime();
  const raw = {} as SnapshotLogFields;

  it("should return raw timestamp when style is 'raw'", () => {
    const result = normalizeTimestamp(timestamp, raw, { style: "raw" });
    expect(result).toBe(timestamp);
  });

  it("should return ISO string when style is 'iso'", () => {
    const result = normalizeTimestamp(timestamp, raw, { style: "iso" });
    expect(result).toBe(new Date(timestamp).toISOString());
  });

  it("should return epoch seconds when style is 'epoch'", () => {
    const result = normalizeTimestamp(timestamp, raw, { style: "epoch" });
    expect(result).toBe(Math.floor(timestamp / 1000));
  });

  it("should return pretty formatted string when style is 'pretty'", () => {
    const result = normalizeTimestamp(timestamp, raw, { style: "pretty" });
    expect(buildTimestampString).toHaveBeenCalledWith({
      timestamp,
      useUTC: false,
      showTimeOnly: true,
    });
    expect(result).toBe("mocked-pretty-string");
  });

  it("should fallback to 'pretty' when style is unknown", () => {
    const result = normalizeTimestamp(timestamp, raw, {
      style: "unknown-style" as unknown as "iso",
    });
    expect(internalLog).toHaveBeenCalledWith({
      type: "warn",
      message: `Unknown timestamp style "unknown-style", using "pretty" as fallback.`,
    });
    expect(buildTimestampString).toHaveBeenCalledWith({
      timestamp,
      useUTC: false,
      showTimeOnly: true,
    });
    expect(result).toBe("mocked-pretty-string");
  });

  it("should use customNormalizer when provided", () => {
    const custom = jest.fn(() => "customized");
    const result = normalizeTimestamp(timestamp, raw, {
      customNormalizer: () => custom(),
    });
    expect(custom).toHaveBeenCalled();
    expect(result).toBe("customized");
  });
});
