import type { BrowserFormattedPayload } from "@/modules/formatters";
import { composeConsoleArgs } from "@/modules/transporters/browser/utils/compose-console-args";
import { composeMessage } from "@/modules/transporters/browser/utils/compose-message";
import { printLog } from "@/modules/transporters/browser/utils/print-log";

jest.mock("@/modules/transporters/browser/utils/compose-console-args");
jest.mock("@/modules/transporters/browser/utils/compose-message");

describe("printLog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should compose message and console args then log with line breaks", () => {
    const fakePayload = {
      formatterConfig: { browser: { lineBreaksAfter: 2 } },
    } as BrowserFormattedPayload;
    const fakeMessage = "formatted message";
    const fakeArgs = ["arg1", "arg2"];

    (composeMessage as jest.Mock).mockReturnValue(fakeMessage);
    (composeConsoleArgs as jest.Mock).mockReturnValue(fakeArgs);

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    printLog(fakePayload);

    expect(composeMessage).toHaveBeenCalledWith(fakePayload);
    expect(composeConsoleArgs).toHaveBeenCalledWith(fakePayload, fakeMessage);
    expect(logSpy).toHaveBeenCalledWith(...fakeArgs, "\n\n");

    logSpy.mockRestore();
  });

  it("should log without line breaks if lineBreaksAfter is 0 or undefined", () => {
    const fakePayload = {
      formatterConfig: { browser: { lineBreaksAfter: 0 } },
    } as BrowserFormattedPayload;
    const fakeMessage = "msg";
    const fakeArgs = ["arg"];

    (composeMessage as jest.Mock).mockReturnValue(fakeMessage);
    (composeConsoleArgs as jest.Mock).mockReturnValue(fakeArgs);

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    printLog(fakePayload);

    expect(logSpy).toHaveBeenCalledWith(...fakeArgs);

    logSpy.mockRestore();
  });

  it("should handle missing formatterConfig gracefully", () => {
    const fakePayload = {} as BrowserFormattedPayload;
    const fakeMessage = "msg";
    const fakeArgs = ["arg"];

    (composeMessage as jest.Mock).mockReturnValue(fakeMessage);
    (composeConsoleArgs as jest.Mock).mockReturnValue(fakeArgs);

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    printLog(fakePayload);

    expect(logSpy).toHaveBeenCalledWith(...fakeArgs);

    logSpy.mockRestore();
  });
});
