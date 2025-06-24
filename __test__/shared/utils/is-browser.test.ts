/* eslint-disable @typescript-eslint/no-explicit-any */
import { isBrowser } from "@/shared/utils/is-browser";

describe("isBrowser", () => {
  afterEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).document;
  });

  it("should return true when window and document exist", () => {
    (globalThis as any).window = {};
    (globalThis as any).document = {};
    expect(isBrowser()).toBe(true);
  });

  it("should return false when window is missing", () => {
    delete (globalThis as any).window;
    (globalThis as any).document = {};
    expect(isBrowser()).toBe(false);
  });

  it("should return false when document is missing", () => {
    (globalThis as any).window = {};
    delete (globalThis as any).document;
    expect(isBrowser()).toBe(false);
  });
});
