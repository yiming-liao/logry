import { normalizeMeta } from "@/modules/normalizers/parts";
import { serializeMeta } from "@/modules/normalizers/utils/serialize-meta";

jest.mock("@/modules/normalizers/utils/serialize-meta", () => ({
  serializeMeta: jest.fn(),
}));

describe("normalizeMeta", () => {
  it("should return undefined if meta is undefined", () => {
    const result = normalizeMeta(undefined);
    expect(result).toBeUndefined();
  });

  it("should return undefined if meta is null", () => {
    const result = normalizeMeta(null);
    expect(result).toBeUndefined();
  });

  it("should return customized meta if customNormalizer is provided", () => {
    const rawMeta = { foo: "bar" };
    const normalizedMeta = { custom: true };

    const customNormalizer = () => normalizedMeta;

    const result = normalizeMeta(rawMeta, { customNormalizer });

    expect(result).toBe(normalizedMeta);
  });

  it("should serialize meta using default stack lines if no options provided", () => {
    const rawMeta = { foo: "bar" };
    const serialized = { foo: "bar", serialized: true };

    (serializeMeta as jest.Mock).mockReturnValue(serialized);

    const result = normalizeMeta(rawMeta);

    expect(serializeMeta).toHaveBeenCalledWith(rawMeta, expect.any(Number));
    expect(result).toBe(serialized);
  });

  it("should serialize meta using provided errorStackLines option", () => {
    const rawMeta = new Error("test error");
    const serialized = { error: true };

    const errorStackLines = 5;

    (serializeMeta as jest.Mock).mockReturnValue(serialized);

    const result = normalizeMeta(rawMeta, { errorStackLines });

    expect(serializeMeta).toHaveBeenCalledWith(rawMeta, errorStackLines);
    expect(result).toBe(serialized);
  });

  it("should return original meta if customNormalizer returns undefined", () => {
    const rawMeta = { a: 1 };

    (serializeMeta as jest.Mock).mockReturnValue({ a: 1, serialized: true });

    const customNormalizer = () => undefined;

    const result = normalizeMeta(rawMeta, { customNormalizer });

    expect(result).toEqual({ a: 1, serialized: true });
  });
});
