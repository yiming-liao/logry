import { parseLogArgs } from "@/core/logger/base-logger/utils/parse-log-args";

describe("parseLogArgs", () => {
  it("should extract message from string only", () => {
    const result = parseLogArgs(["hello"]);
    expect(result).toEqual({ message: "hello" });
  });

  it("should extract meta from object only", () => {
    const meta = { userId: 123 };
    const result = parseLogArgs([meta]);
    expect(result).toEqual({ meta });
  });

  it("should extract message and meta", () => {
    const result = parseLogArgs(["msg", { a: 1 }]);
    expect(result).toEqual({ message: "msg", meta: { a: 1 } });
  });

  it("should extract meta and message when order is reversed", () => {
    const result = parseLogArgs([{ a: 1 }, "msg"]);
    expect(result).toEqual({ meta: { a: 1 }, message: "msg" });
  });

  it("should extract message and options", () => {
    const options = { scope: "user" };
    const result = parseLogArgs(["msg", options]);
    expect(result).toEqual({ message: "msg", options });
  });

  it("should extract meta and options", () => {
    const meta = { userId: 1 };
    const options = { context: { foo: "bar" } };
    const result = parseLogArgs([meta, options]);
    expect(result).toEqual({ meta, options });
  });

  it("should extract meta, message and options", () => {
    const meta = { a: 1 };
    const message = "hello";
    const options = { scope: "test" };
    const result = parseLogArgs([meta, message, options]);
    expect(result).toEqual({ meta, message, options });
  });

  it("should extract message, meta and options", () => {
    const meta = { b: 2 };
    const message = "msg";
    const options = { formatterConfig: { lineBreak: true } };
    const result = parseLogArgs([message, meta, options]);
    expect(result).toEqual({ message, meta, options });
  });

  it("should ignore additional args beyond expected three", () => {
    const result = parseLogArgs(["msg", { a: 1 }, { scope: "x" }, "extra"]);
    expect(result).toEqual({
      message: "msg",
      meta: { a: 1 },
      options: { scope: "x" },
    });
  });

  it("should return empty object when args is empty", () => {
    const result = parseLogArgs([]);
    expect(result).toEqual({});
  });
});
