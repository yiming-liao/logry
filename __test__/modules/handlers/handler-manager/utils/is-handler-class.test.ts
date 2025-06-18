import { isHandlerClass } from "@/modules/handlers/handler-manager/utils/is-handler-class";

describe("isHandlerClass", () => {
  it("should return false for null", () => {
    expect(isHandlerClass(null)).toBe(false);
  });

  it("should return false for primitive types", () => {
    expect(isHandlerClass(42)).toBe(false);
    expect(isHandlerClass("string")).toBe(false);
    expect(isHandlerClass(true)).toBe(false);
    expect(isHandlerClass(undefined)).toBe(false);
  });

  it("should return false for object without handle method", () => {
    expect(isHandlerClass({})).toBe(false);
    expect(isHandlerClass({ handle: 123 })).toBe(false);
    expect(isHandlerClass({ handle: "not a function" })).toBe(false);
  });

  it("should return true for object with handle method", () => {
    const obj = { handle: () => "handled" };
    expect(isHandlerClass(obj)).toBe(true);
  });

  it("should return true for class instance with handle method", () => {
    class Handler {
      handle() {
        return "handled";
      }
    }
    const instance = new Handler();
    expect(isHandlerClass(instance)).toBe(true);
  });

  it("should return false when typeof obj !== 'object' but not null", () => {
    expect(isHandlerClass(Symbol("sym"))).toBe(false);
  });
});
