import type { SnapshotLogFields } from "@/shared/types/log-fields";
import { normalizeId } from "@/modules/normalizers/fields";

describe("normalizeId", () => {
  const raw = {} as SnapshotLogFields;

  it("should return customized id if customNormalizer is provided", () => {
    const rawId = "123";
    const normalizedId = "ID-123";

    const customNormalizer = () => normalizedId;

    const result = normalizeId(rawId, raw, { customNormalizer });

    expect(result).toBe(normalizedId);
  });

  it("should return original id if no customNormalizer is provided", () => {
    const rawId = "abc-456";

    const result = normalizeId(rawId, raw);

    expect(result).toBe(rawId);
  });

  it("should return original id if customNormalizer returns undefined", () => {
    const rawId = "789";

    const customNormalizer = () => "";

    const result = normalizeId(rawId, raw, { customNormalizer });

    expect(result).toBe(rawId);
  });
});
