import { printBrowserLog } from "../../../../src/log-pipeline/print/browser/print-browser-log";

describe("printBrowserLog", () => {
  const originalLog = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    jest.clearAllMocks();
  });

  it("calls console.log with all logArgs", () => {
    const args = ["Hello", { user: "yiming" }, 42];

    printBrowserLog({ logArgs: args });

    expect(console.log).toHaveBeenCalledWith(...args);
  });

  it("calls console.log with empty array", () => {
    printBrowserLog({ logArgs: [] });

    expect(console.log).toHaveBeenCalledWith();
  });
});
