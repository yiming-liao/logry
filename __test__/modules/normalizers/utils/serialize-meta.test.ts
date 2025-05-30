import { serializeMeta } from "@/modules/normalizers/utils/serialize-meta";

describe("serializeMeta", () => {
  it("should serialize direct Error instance", () => {
    const error = new Error("Direct error");
    const result = serializeMeta(error, 2);

    expect(result).toHaveProperty("error.message", "Direct error");
    expect(result?.error).toHaveProperty("stack");
  });

  it("should serialize Error inside 'error' property", () => {
    const error = new Error("Nested error");
    const result = serializeMeta({ error, info: 123 }, 2);

    expect(result).toHaveProperty("info", 123);
    expect(result?.error).toHaveProperty("message", "Nested error");
  });

  it("should return object as-is if no Error present", () => {
    const meta = { user: "Alice", age: 30 };
    const result = serializeMeta(meta, 2);

    expect(result).toEqual(meta);
  });

  it("should wrap primitive value in 'value' property", () => {
    const result = serializeMeta("test string", 2);
    expect(result).toEqual({ value: "test string" });
  });

  it("should wrap array in 'value' property", () => {
    const result = serializeMeta(["a", "b"], 2);
    expect(result).toEqual({ value: ["a", "b"] });
  });

  it("should return undefined if input is falsy", () => {
    const result = serializeMeta(undefined, 2);
    expect(result).toEqual({ value: undefined });
  });
});
