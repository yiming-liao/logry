import { normalizeId } from "@/modules/normalizers/parts";

describe("normalizeId", () => {
  it("should return customized id if customNormalizer is provided", () => {
    const rawId = "123";
    const normalizedId = "ID-123";

    const customNormalizer = () => normalizedId;

    const result = normalizeId(rawId, { customNormalizer });

    expect(result).toBe(normalizedId);
  });

  it("should return original id if no customNormalizer is provided", () => {
    const rawId = "abc-456";

    const result = normalizeId(rawId);

    expect(result).toBe(rawId);
  });

  it("should return original id if customNormalizer returns undefined", () => {
    const rawId = "789";

    const customNormalizer = () => "";

    const result = normalizeId(rawId, { customNormalizer });

    expect(result).toBe(rawId);
  });
});
