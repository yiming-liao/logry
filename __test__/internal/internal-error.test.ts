import { internalError } from "@/internal";
import * as utils from "@/shared/utils/is-dev-mode";

jest.mock("@/internal/utils/format-internal-message", () => ({
  formatInternalMessage: jest.fn().mockReturnValue("[formatted-message]"),
}));

describe("internalError", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.restoreAllMocks();
  });

  it("should throw error in dev mode", () => {
    jest.spyOn(utils, "isDevMode").mockReturnValue(true);

    expect(() => {
      internalError({
        message: "Dev error",
        tag: "DEV",
        error: new Error("test"),
      });
    }).toThrow("[formatted-message]");
  });
});
