import { describe, it, expect } from "vitest";
import { parseLogArgs } from "@/pipeline/utils/parse-log-args";

describe("parseLogArgs", () => {
  it("parses single string as message", () => {
    const result = parseLogArgs("hello");
    expect(result).toEqual({ message: "hello" });
  });

  it("parses single meta object", () => {
    const result = parseLogArgs({ a: 1 });
    expect(result).toEqual({ meta: { a: 1 } });
  });

  it("parses single options object", () => {
    const result = parseLogArgs({ scope: "x" });
    expect(result).toEqual({ options: { scope: "x" } });
  });

  it("parses (message, meta)", () => {
    const result = parseLogArgs("msg", { a: 1 });
    expect(result).toEqual({ message: "msg", meta: { a: 1 } });
  });

  it("parses (message, options)", () => {
    const result = parseLogArgs("msg", { scope: ["x"] });
    expect(result).toEqual({ message: "msg", options: { scope: ["x"] } });
  });

  it("parses (meta, options)", () => {
    const meta = { foo: 1 };
    const opts = { context: { a: 2 } };

    const result = parseLogArgs(meta, opts);
    expect(result).toEqual({ meta, options: opts });
  });

  it("parses (message, meta, options)", () => {
    const result = parseLogArgs("msg", { m: 1 }, { scope: "x" });

    expect(result).toEqual({
      message: "msg",
      meta: { m: 1 },
      options: { scope: "x" },
    });
  });

  it("parses (meta, message, options)", () => {
    const result = parseLogArgs({ m: 1 }, "msg", { scope: "x" });

    expect(result).toEqual({
      message: "msg",
      meta: { m: 1 },
      options: { scope: "x" },
    });
  });

  it("parses (options, meta, message)", () => {
    const result = parseLogArgs({ scope: "y" }, { m: 1 }, "msg");

    expect(result).toEqual({
      message: "msg",
      meta: { m: 1 },
      options: { scope: "y" },
    });
  });

  it("ignores array args", () => {
    const result = parseLogArgs("msg", [1, 2, 3], { a: 1 });
    expect(result).toEqual({
      message: "msg",
      meta: { a: 1 },
    });
  });

  it("does not override earlier message/meta/options", () => {
    const result = parseLogArgs(
      "msg1",
      "msg2",
      { a: 1 },
      { b: 2 },
      { scope: "x" },
      { context: { ignored: true } },
    );

    expect(result).toEqual({
      message: "msg1",
      meta: { a: 1 },
      options: { scope: "x" },
    });
  });
});
