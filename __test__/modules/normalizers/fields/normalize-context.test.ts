import type { SnapshotLogFields } from "@/shared/types/log-fields";
import { normalizeContext } from "@/modules/normalizers/fields";

describe("normalizeContext", () => {
  const raw = {} as SnapshotLogFields;

  it("should return customized context if customNormalizer is provided", () => {
    const context = { userId: "abc" };
    const normalized = { user: "abc" };

    const customNormalizer = () => normalized;

    const result = normalizeContext(context, raw, { customNormalizer });

    expect(result).toEqual(normalized);
  });

  it("should return original context if no customNormalizer is provided", () => {
    const context = { ip: "127.0.0.1" };

    const result = normalizeContext(context, raw);

    expect(result).toEqual(context);
  });

  it("should return original context if customNormalizer returns undefined", () => {
    const context = { session: "xyz" };

    const customNormalizer = () => undefined;

    const result = normalizeContext(context, raw, { customNormalizer });

    expect(result).toEqual(context);
  });

  it("should handle undefined context gracefully", () => {
    const result = normalizeContext(undefined, raw);

    expect(result).toBeUndefined();
  });
});
