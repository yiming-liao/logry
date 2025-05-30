/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNode, isBrowser } from "@/shared/utils/platform";

describe("isNode", () => {
  afterEach(() => {
    delete (globalThis as any).process;
  });

  it("should return true when process.versions.node exists", () => {
    (globalThis as any).process = {
      versions: { node: "20.0.0" },
    };
    expect(isNode()).toBe(true);
  });

  it("should return false when process.versions.node is missing", () => {
    (globalThis as any).process = {
      versions: {},
    };
    expect(isNode()).toBe(false);
  });

  it("should return false when process is not defined", () => {
    delete (globalThis as any).process;
    expect(isNode()).toBe(false);
  });
});

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
