import { formatOutput } from "../../../src/write/browser/format-output";
import { writeBrowser } from "../../../src/write/browser/write-browser";
import { normalizedWriteConfig } from "../../../src/write/utils/normalize-write-config";
import { validateWriteOptions } from "../../../src/write/utils/validate-write-options";

jest.mock("../../../src/write/browser/format-output", () => ({
  formatOutput: jest.fn(),
}));
jest.mock("../../../src/write/utils/validate-write-options", () => ({
  validateWriteOptions: jest.fn(),
}));
jest.mock("../../../src/write/utils/normalize-write-config", () => ({
  normalizedWriteConfig: jest.fn(),
}));

describe("writeBrowser", () => {
  const originalWindow = global.window;

  beforeEach(() => {
    global.window = {} as Window & typeof globalThis;
    jest.spyOn(console, "log").mockImplementation(() => {});
    (formatOutput as jest.Mock).mockReturnValue(["[formatted]", "style1"]);
    (validateWriteOptions as jest.Mock).mockImplementation(() => {});
    (normalizedWriteConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideContext: false,
      showOnlyLatestContext: false,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.window = originalWindow;
  });

  it("does nothing if not in browser", () => {
    delete (global as { window: unknown }).window;

    writeBrowser({
      id: "id",
      level: "info",
      context: "ctx",
      message: "hello",
      meta: undefined,
      writeConfig: {},
    });

    expect(console.log).not.toHaveBeenCalled();
  });

  it("logs output without meta", () => {
    writeBrowser({
      id: "id",
      level: "info",
      context: "ctx",
      message: "hello",
      meta: undefined,
      writeConfig: {},
    });

    expect(console.log).toHaveBeenCalledWith("[formatted]", "style1");
  });

  it("logs output with meta", () => {
    writeBrowser({
      id: "id",
      level: "info",
      context: "ctx",
      message: "hello",
      meta: { key: "value" },
      writeConfig: {},
    });

    expect(console.log).toHaveBeenCalledWith("[formatted]", "style1", {
      key: "value",
    });
  });

  it("calls validateWriteOptions and formatOutput", () => {
    (validateWriteOptions as jest.Mock).mockClear();
    (formatOutput as jest.Mock).mockClear();

    writeBrowser({
      id: "abc",
      level: "error",
      context: "mod",
      message: "fail",
      meta: undefined,
      writeConfig: {},
    });

    expect(validateWriteOptions).toHaveBeenCalledWith({
      level: "error",
      message: "fail",
    });
    expect(formatOutput).toHaveBeenCalled();
  });
});
