// eslint-disable-next-line import/order
import { internalLog, formatInternalMessage } from "@/internal";

jest.mock("@/shared/utils/is-dev-mode", () => ({
  isDevMode: jest.fn(),
}));

jest.mock("@/internal/utils/format-internal-message", () => ({
  formatInternalMessage: jest.fn().mockReturnValue("[formatted-log]"),
}));

import { isDevMode } from "@/shared/utils/is-dev-mode"; // 引入 mock 版本

describe("internalLog", () => {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  beforeEach(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    jest.clearAllMocks();
  });

  it("should log error with console.error in dev mode", () => {
    (isDevMode as jest.Mock).mockReturnValue(true);

    internalLog({ type: "error", message: "Something went wrong", tag: "DEV" });

    expect(formatInternalMessage).toHaveBeenCalledWith({
      type: "error",
      message: "Something went wrong",
      tag: "DEV",
    });

    expect(console.error).toHaveBeenCalledWith("[formatted-log]");
  });

  it("should log warn with console.warn in dev mode", () => {
    (isDevMode as jest.Mock).mockReturnValue(true);

    internalLog({ type: "warn", message: "Just a warning", tag: "DEV" });

    expect(console.warn).toHaveBeenCalledWith("[formatted-log]");
  });

  it("should do nothing in production mode", () => {
    (isDevMode as jest.Mock).mockReturnValue(false);

    internalLog({ type: "warn", message: "No log in prod", tag: "PROD" });

    expect(formatInternalMessage).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
