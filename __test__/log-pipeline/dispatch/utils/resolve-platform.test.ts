import { resolvePlatform } from "../../../../src/log-pipeline/dispatch/utils/resolve-platform";

describe("resolvePlatform", () => {
  const originalWindow = (global as { window: unknown }).window;

  afterEach(() => {
    if (originalWindow === undefined) {
      delete (global as { window: unknown }).window;
    } else {
      (global as { window: unknown }).window = originalWindow;
    }
  });

  it("returns 'browser' when window is defined", () => {
    (global as { window: unknown }).window = {};
    expect(resolvePlatform()).toBe("browser");
  });

  it("returns 'node' when window is undefined", () => {
    delete (global as { window: unknown }).window;
    expect(resolvePlatform()).toBe("node");
  });
});
