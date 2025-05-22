import type { WriteNodeOptions } from "../../../src/write/node/write-node-types";
import { CONTEXT_SEPARATOR } from "../../../src/constants";
import { writeNode } from "../../../src/write/node";
import { formatOutput } from "../../../src/write/node/format-output";
import { normalizedWriteConfig } from "../../../src/write/utils/normalize-write-config";
import { printMeta } from "../../../src/write/utils/print-meta";
import { validateWriteOptions } from "../../../src/write/utils/validate-write-options";

jest.mock("../../../src/write/node/format-output");
jest.mock("../../../src/write/utils/normalize-write-config");
jest.mock("../../../src/write/utils/print-meta");
jest.mock("../../../src/write/utils/validate-write-options");

describe("writeNode", () => {
  const baseOptions: WriteNodeOptions = {
    id: "abc123",
    level: "info",
    context: `app${CONTEXT_SEPARATOR}utils${CONTEXT_SEPARATOR}logger`,
    message: "Hello World",
    meta: { key: "value" },
    writeConfig: { node: { borderWidth: 3, useColor: false } },
  };

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();

    (normalizedWriteConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideContext: false,
      showOnlyLatestContext: false,
      metaDepth: 1,
      borderWidth: 3,
      useColor: false,
    });
    (validateWriteOptions as jest.Mock).mockImplementation(() => {});
    (formatOutput as jest.Mock).mockReturnValue("[formatted output]");
    (printMeta as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("does nothing in browser environment", () => {
    (global as { window: unknown }).window = {};
    writeNode(baseOptions);
    expect(console.log).not.toHaveBeenCalled();
    delete (global as { window: unknown }).window;
  });

  it("logs output with borders and meta in node environment", () => {
    writeNode(baseOptions);

    expect(normalizedWriteConfig).toHaveBeenCalledWith(baseOptions.writeConfig);
    expect(validateWriteOptions).toHaveBeenCalledWith({
      level: baseOptions.level,
      message: baseOptions.message,
      borderWidth: 3,
    });
    expect(formatOutput).toHaveBeenCalledWith({
      id: baseOptions.id,
      level: baseOptions.level,
      context: baseOptions.context,
      message: baseOptions.message,
      hideDate: false,
      hideId: false,
      hideContext: false,
      showOnlyLatestContext: false,
      useColor: false,
    });

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(1, "───");
    expect(console.log).toHaveBeenNthCalledWith(2, "[formatted output]");
    expect(printMeta).toHaveBeenCalledWith(baseOptions.meta, 1, false);
    expect(console.log).toHaveBeenNthCalledWith(3, "───");
  });

  it("logs output without border when borderWidth is 0", () => {
    const customOptions: WriteNodeOptions = {
      ...baseOptions,
      writeConfig: {
        ...baseOptions.writeConfig,
        node: { borderWidth: 0 },
      },
      meta: { key: "value" },
    };

    (normalizedWriteConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideContext: false,
      showOnlyLatestContext: false,
      metaDepth: 1,
      borderWidth: 0,
      useColor: false,
    });

    writeNode(customOptions);

    expect(console.log).toHaveBeenNthCalledWith(1, "");
    expect(console.log).toHaveBeenNthCalledWith(2, "[formatted output]");
    expect(printMeta).toHaveBeenCalledWith({ key: "value" }, 1, false);
    expect(console.log).toHaveBeenCalledTimes(2);
  });

  it("does not call printMeta if no meta provided", () => {
    writeNode({ ...baseOptions, meta: undefined });
    expect(printMeta).not.toHaveBeenCalled();
  });
});
