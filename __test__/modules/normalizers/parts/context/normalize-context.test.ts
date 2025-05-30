import { normalizeContext } from "@/modules/normalizers/parts/context";

describe("normalizeContext", () => {
  it("should return customized context if customNormalizer is provided", () => {
    const raw = { userId: "abc" };
    const normalized = { user: "abc" };

    const customNormalizer = () => normalized;

    const result = normalizeContext(raw, { customNormalizer });

    expect(result).toEqual(normalized);
  });

  it("should return original context if no customNormalizer is provided", () => {
    const raw = { ip: "127.0.0.1" };

    const result = normalizeContext(raw);

    expect(result).toEqual(raw);
  });

  it("should return original context if customNormalizer returns undefined", () => {
    const raw = { session: "xyz" };

    const customNormalizer = () => undefined;

    const result = normalizeContext(raw, { customNormalizer });

    expect(result).toEqual(raw);
  });

  it("should handle undefined context gracefully", () => {
    const result = normalizeContext(undefined);

    expect(result).toBeUndefined();
  });
});
