/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDevMode } from "@/shared/utils/is-dev-mode";
import * as platformUtils from "@/shared/utils/platform";

describe("isDevMode", () => {
  afterEach(() => {
    delete (globalThis as any).process;
    delete (globalThis as any).__LOGRY_DEV__;
    jest.restoreAllMocks();
  });

  it("should return true when in Node and NODE_ENV is not 'production'", () => {
    jest.spyOn(platformUtils, "isNode").mockReturnValue(true);
    (globalThis as any).process = { env: { NODE_ENV: "development" } };

    expect(isDevMode()).toBe(true);
  });

  it("should return false when in Node and NODE_ENV is 'production'", () => {
    jest.spyOn(platformUtils, "isNode").mockReturnValue(true);
    (globalThis as any).process = { env: { NODE_ENV: "production" } };

    expect(isDevMode()).toBe(false);
  });

  it("should return true when in Node and NODE_ENV is undefined", () => {
    jest.spyOn(platformUtils, "isNode").mockReturnValue(true);
    (globalThis as any).process = { env: {} };

    expect(isDevMode()).toBe(true);
  });

  it("should return true when in browser and __LOGRY_DEV__ is true", () => {
    jest.spyOn(platformUtils, "isNode").mockReturnValue(false);
    (globalThis as any).__LOGRY_DEV__ = true;

    expect(isDevMode()).toBe(true);
  });

  it("should return false when in browser and __LOGRY_DEV__ is false", () => {
    jest.spyOn(platformUtils, "isNode").mockReturnValue(false);
    (globalThis as any).__LOGRY_DEV__ = false;

    expect(isDevMode()).toBe(false);
  });

  it("should return false when in browser and __LOGRY_DEV__ is not defined", () => {
    jest.spyOn(platformUtils, "isNode").mockReturnValue(false);

    expect(isDevMode()).toBe(false);
  });
});
