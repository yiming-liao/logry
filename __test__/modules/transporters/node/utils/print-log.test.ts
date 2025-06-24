/* eslint-disable @typescript-eslint/no-explicit-any */
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

jest.mock("@/modules/transporters/node/utils/compose-message", () => ({
  composeMessage: jest.fn(() => "formatted log message\n"),
}));

jest.mock("@/modules/transporters/node/utils/write-to-stream-async", () => ({
  writeToStreamAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock("@/modules/transporters/node/utils/print-object", () => ({
  printObject: jest.fn(() => Promise.resolve()),
}));

describe("printLog", () => {
  it("should write log to stdout with correct line breaks and fields", async () => {
    const payload = {
      raw: { level: "info" },
      meta: { user: "Amy" },
      context: { requestId: "abc123" },
      formatterConfig: {
        node: {
          lineBreaksBefore: 1,
          lineBreaksAfter: 1,
        },
      },
    } as any;

    const calls: string[] = [];

    await printLog(payload, async (fn) => {
      calls.push("queued");
      await fn();
    });

    expect(composeMessage).toHaveBeenCalledWith(payload, true);
    expect(writeToStreamAsync).toHaveBeenCalledWith("\n", process.stdout);
    expect(writeToStreamAsync).toHaveBeenCalledWith(
      "formatted log message\n",
      process.stdout,
    );
    expect(printObject).toHaveBeenCalledTimes(2);
    expect(writeToStreamAsync).toHaveBeenCalledWith("\n", process.stdout);
  });

  it("should write error-level logs to stderr", async () => {
    const payload = {
      raw: { level: "error" },
      meta: {},
      context: {},
      formatterConfig: {
        node: {},
      },
    } as any;

    await printLog(payload, async (fn) => await fn());

    expect(writeToStreamAsync).toHaveBeenCalledWith(
      "formatted log message\n",
      process.stderr,
    );
  });
});
