import type { InternalLogOptions } from "@/internal";
import { formatInternalMessage } from "@/internal";

describe("formatInternalMessage", () => {
  it("should format warning without tag or error", () => {
    const input: InternalLogOptions = {
      type: "warn",
      message: "This is a warning",
    };
    const result = formatInternalMessage(input);
    expect(result).toBe("⚠️ [logry] This is a warning");
  });

  it("should format error with tag", () => {
    const input: InternalLogOptions = {
      type: "error",
      message: "Something went wrong",
      tag: "core",
    };
    const result = formatInternalMessage(input);
    expect(result).toBe("❌ [logry/core] Something went wrong");
  });

  it("should include Error instance stack trace if available", () => {
    const err = new Error("Oops!");
    const input: InternalLogOptions = {
      type: "error",
      message: "Caught an error",
      error: err,
    };
    const result = formatInternalMessage(input);
    expect(result).toContain("❌ [logry] Caught an error");
    expect(result).toContain("Oops!");
    expect(result).toContain("at"); // part of stack trace
  });

  it("should include stringified non-Error error", () => {
    const input: InternalLogOptions = {
      type: "warn",
      message: "Received non-error object",
      error: { foo: "bar" },
    };
    const result = formatInternalMessage(input);
    expect(result).toContain("⚠️ [logry] Received non-error object");
    expect(result).toContain("[object Object]");
  });

  it("should include primitive error values", () => {
    const input: InternalLogOptions = {
      type: "warn",
      message: "Primitive error",
      error: 123,
    };
    const result = formatInternalMessage(input);
    expect(result).toContain("⚠️ [logry] Primitive error\n123");
  });
});
