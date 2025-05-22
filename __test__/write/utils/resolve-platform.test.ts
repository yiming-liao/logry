import { resolvePlatform } from "../../../src/write/utils/resolve-platform";

describe("resolvePlatform", () => {
  it("should return 'browser' if platform is 'browser'", () => {
    expect(resolvePlatform("browser")).toBe("browser");
  });

  it("should return 'node' if platform is 'node'", () => {
    expect(resolvePlatform("node")).toBe("node");
  });

  describe("when platform is 'auto'", () => {
    const originalWindow = global.window;

    afterEach(() => {
      // Reset environment
      if (originalWindow === undefined) {
        delete (global as { window: unknown }).window;
      } else {
        global.window = originalWindow;
      }
    });

    it("should return 'browser' if 'window' is defined", () => {
      (global as { window: unknown }).window = {};
      expect(resolvePlatform("auto")).toBe("browser");
    });

    it("should return 'node' if 'window' is undefined", () => {
      delete (global as { window: unknown }).window;
      expect(resolvePlatform("auto")).toBe("node");
    });
  });
});
