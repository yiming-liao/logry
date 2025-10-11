import type { LogRuntimeOptions } from "@/core/logger/types";
import type { RawMeta } from "@/shared/types/log-fields";
import { parseLogArgs } from "@/core/logger/base-logger/utils/parse-log-args";

describe("parseLogArgs", () => {
  it("should return false for invalid LogRuntimeOptions", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parseLogArgs(null as any)).toEqual({
      message: undefined,
      meta: undefined,
      options: undefined,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parseLogArgs([] as any)).toEqual({
      message: undefined,
      meta: undefined,
      options: undefined,
    });
  });

  it("should parse [string] tuple", () => {
    const result = parseLogArgs("Hello");
    expect(result).toEqual({
      message: "Hello",
      meta: undefined,
      options: undefined,
    });
  });

  it("should parse [string, LogRuntimeOptions] tuple", () => {
    const options: LogRuntimeOptions = { scope: ["app"] };
    const result = parseLogArgs("Hello", options);
    expect(result).toEqual({ message: "Hello", meta: undefined, options });
  });

  it("should parse [Record<string, unknown>] tuple", () => {
    const meta: RawMeta = { user: "test" };
    const result = parseLogArgs(meta);
    expect(result).toEqual({ message: undefined, meta, options: undefined });
  });

  it("should parse [Record<string, unknown>, LogRuntimeOptions] tuple", () => {
    const meta: RawMeta = { user: "test" };
    const options: LogRuntimeOptions = { scope: ["app"] };
    const result = parseLogArgs(meta, options);
    expect(result).toEqual({ message: undefined, meta, options });
  });

  it("should parse [string, Record<string, unknown>] tuple", () => {
    const meta: RawMeta = { user: "test" };
    const result = parseLogArgs("Hello", meta);
    expect(result).toEqual({ message: "Hello", meta, options: undefined });
  });

  it("should parse [Record<string, unknown>, string] tuple", () => {
    const meta: RawMeta = { user: "test" };
    const result = parseLogArgs(meta, "Hello");
    expect(result).toEqual({ message: "Hello", meta, options: undefined });
  });

  it("should parse [string, Record<string, unknown>, LogRuntimeOptions] tuple", () => {
    const meta: RawMeta = { user: "test" };
    const options: LogRuntimeOptions = { scope: ["app"] };
    const result = parseLogArgs("Hello", meta, options);
    expect(result).toEqual({ message: "Hello", meta, options });
  });

  it("should parse [Record<string, unknown>, string, LogRuntimeOptions] tuple", () => {
    const meta: RawMeta = { user: "test" };
    const options: LogRuntimeOptions = { scope: ["app"] };
    const result = parseLogArgs(meta, "Hello", options);
    expect(result).toEqual({ message: "Hello", meta, options });
  });
});
