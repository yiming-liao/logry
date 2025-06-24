import type { SnapshotLogFields } from "@/shared/types/log-fields";
import { normalizeMeta } from "@/modules/normalizers/fields";
import { serializeMeta } from "@/modules/normalizers/utils/serialize-meta";

jest.mock("@/modules/normalizers/utils/serialize-meta", () => ({
  serializeMeta: jest.fn(),
}));

describe("normalizeMeta", () => {
  const raw = {} as SnapshotLogFields;

  it("should return undefined if meta is undefined", () => {
    const result = normalizeMeta(undefined, raw);
    expect(result).toBeUndefined();
  });

  it("should return undefined if meta is null", () => {
    const result = normalizeMeta(null, raw);
    expect(result).toBeUndefined();
  });

  it("should return customized meta if customNormalizer is provided", () => {
    const rawMeta = { foo: "bar" };
    const normalizedMeta = { custom: true };

    const customNormalizer = () => normalizedMeta;

    const result = normalizeMeta(rawMeta, raw, { customNormalizer });

    expect(result).toBe(normalizedMeta);
  });

  it("should serialize meta using default stack lines if no options provided", () => {
    const rawMeta = { foo: "bar" };
    const serialized = { foo: "bar", serialized: true };

    (serializeMeta as jest.Mock).mockReturnValue(serialized);

    const result = normalizeMeta(rawMeta, raw);

    expect(serializeMeta).toHaveBeenCalledWith(rawMeta, expect.any(Number));
    expect(result).toBe(serialized);
  });

  it("should serialize meta using provided errorStackLines option", () => {
    const rawMeta = new Error("test error");
    const serialized = { error: true };

    const errorStackLines = 5;

    (serializeMeta as jest.Mock).mockReturnValue(serialized);

    const result = normalizeMeta(rawMeta, raw, { errorStackLines });

    expect(serializeMeta).toHaveBeenCalledWith(rawMeta, errorStackLines);
    expect(result).toBe(serialized);
  });

  it("should return original meta if customNormalizer returns undefined", () => {
    const rawMeta = { a: 1 };

    (serializeMeta as jest.Mock).mockReturnValue({ a: 1, serialized: true });

    const customNormalizer = () => undefined;

    const result = normalizeMeta(rawMeta, raw, { customNormalizer });

    expect(result).toEqual({ a: 1, serialized: true });
  });
});
