import type { SnapshotLogFields } from "@/shared/types/log-fields";
import { DEFAULT_SCOPE_SEPARATOR } from "@/modules/normalizers/constants";
import { normalizeScope } from "@/modules/normalizers/fields";

describe("normalizeScope", () => {
  const raw = {} as SnapshotLogFields;

  it("should return customized scope if customNormalizer is provided", () => {
    const rawScope = ["core", "logger"];
    const normalizedScope = "custom/scope";

    const customNormalizer = () => normalizedScope;

    const result = normalizeScope(rawScope, raw, { customNormalizer });

    expect(result).toBe(normalizedScope);
  });

  it("should join scope with default separator if no customNormalizer is provided", () => {
    const rawScope = ["core", "utils"];
    const expected = rawScope.join(DEFAULT_SCOPE_SEPARATOR);

    const result = normalizeScope(rawScope, raw);

    expect(result).toBe(expected);
  });

  it("should join scope with custom separator if provided", () => {
    const rawScope = ["auth", "token"];
    const separator = ":";
    const expected = rawScope.join(separator);

    const result = normalizeScope(rawScope, raw, { separator });

    expect(result).toBe(expected);
  });

  it("should return joined scope if customNormalizer returns undefined", () => {
    const rawScope = ["db", "query"];
    const expected = rawScope.join(" > ");

    const customNormalizer = () => "";

    const result = normalizeScope(rawScope, raw, {
      separator: " > ",
      customNormalizer,
    });

    expect(result).toBe(expected);
  });
});
