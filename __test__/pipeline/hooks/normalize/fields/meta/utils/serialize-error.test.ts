/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { serializeError } from "@/pipeline/hooks/normalize/fields/meta/utils/serialize-error";

describe("serializeError", () => {
  it("returns message and trimmed stack trace", () => {
    const error = new Error("something went wrong");

    const result = serializeError(error, 2);

    expect(result.message).toBe("something went wrong");
    expect(typeof result.stack).toBe("string");
    expect(result.stack!.split("\n").length).toBeLessThanOrEqual(2);
  });

  it("returns undefined stack when error.stack is missing", () => {
    const error = new Error("oops");
    error.stack = undefined as any;

    const result = serializeError(error, 5);

    expect(result.stack).toBeUndefined();
  });

  it("cuts stack to the requested number of lines", () => {
    const error = new Error("test");
    const result = serializeError(error, 1);

    expect(result.stack!.split("\n").length).toBe(1);
  });
});
