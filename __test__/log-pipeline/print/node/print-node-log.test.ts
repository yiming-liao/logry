import type { NodeFormatter } from "../../../../src/formatter-types";
import { printNodeLog } from "../../../../src/log-pipeline/print/node/print-node-log";

describe("printNodeLog", () => {
  const originalLog = console.log;
  const originalDir = console.dir;

  beforeEach(() => {
    console.log = jest.fn();
    console.dir = jest.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    console.dir = originalDir;
    jest.clearAllMocks();
  });

  it("prints top and bottom borders", () => {
    printNodeLog({
      logLine: "log line",
      meta: {},
      topBorder: 5,
      bottomBorder: 6,
      metaDepth: 1,
      useColor: false,
      stringifyMeta: "compact",
      metaLineBreaks: 0,
      topLineBreaks: 0,
      bottomLineBreaks: 0,
    });

    expect(console.log).toHaveBeenCalledWith("─".repeat(5));
    expect(console.log).toHaveBeenCalledWith("log line", "");
    expect(console.log).toHaveBeenCalledWith("─".repeat(6));
  });

  it("prints top and bottom line breaks", () => {
    printNodeLog({
      logLine: "log line",
      meta: {},
      topLineBreaks: 2,
      bottomLineBreaks: 3,
      metaDepth: 1,
      useColor: false,
      stringifyMeta: "compact",
      metaLineBreaks: 0,
      topBorder: 0,
      bottomBorder: 0,
    });

    expect(console.log).toHaveBeenCalledWith("\n\n");
    expect(console.log).toHaveBeenCalledWith("log line", "");
    expect(console.log).toHaveBeenCalledWith("\n\n\n");
  });

  it("uses formatter and skips meta", () => {
    printNodeLog({
      logLine: "custom log",
      meta: { a: 1 },
      formatter: true as unknown as NodeFormatter,
      stringifyMeta: false,
      metaDepth: 2,
      useColor: true,
      metaLineBreaks: 1,

      topLineBreaks: 2,
      bottomLineBreaks: 3,
      topBorder: 0,
      bottomBorder: 0,
    });

    expect(console.log).toHaveBeenCalledWith("custom log");
    expect(console.dir).not.toHaveBeenCalled();
  });

  it("prints meta with console.dir when not stringified", () => {
    const meta = { test: "value" };

    printNodeLog({
      logLine: "basic log",
      meta,
      stringifyMeta: false,
      metaDepth: 3,
      useColor: true,
      metaLineBreaks: 1,

      topLineBreaks: 2,
      bottomLineBreaks: 3,
      topBorder: 0,
      bottomBorder: 0,
    });

    expect(console.log).toHaveBeenCalledWith("basic log", "\n");
    expect(console.dir).toHaveBeenCalledWith(meta, {
      depth: 3,
      colors: true,
    });
  });
});
