/* eslint-disable @typescript-eslint/no-explicit-any */
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

jest.mock("@/modules/transporters/node/utils/compose-message", () => ({
  composeMessage: jest.fn(),
}));

jest.mock("@/modules/transporters/node/utils/print-object", () => ({
  printObject: jest.fn(),
}));

jest.mock("@/modules/transporters/node/utils/write-to-stream-async", () => ({
  writeToStreamAsync: jest.fn(),
}));

describe("printLog", () => {
  const queueWriteMock = jest.fn(async (fn) => fn());

  const defaultPayload = {
    meta: { foo: "bar" },
    context: { baz: "qux" },
    formatterConfig: {
      node: {
        lineBreaksBefore: 1,
        lineBreaksAfter: 2,
        meta: { lineBreaks: 3, depth: 4 },
        context: { lineBreaks: 5, depth: 6 },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (composeMessage as jest.Mock).mockReturnValue("COMPOSED_MESSAGE");
  });

  it("should call queueWrite with a function", async () => {
    await printLog(defaultPayload as any, queueWriteMock);
    expect(queueWriteMock).toHaveBeenCalled();
    expect(typeof queueWriteMock.mock.calls[0][0]).toBe("function");
  });

  it("should write lineBreaksBefore before message", async () => {
    await printLog(defaultPayload as any, queueWriteMock);
    expect(writeToStreamAsync).toHaveBeenCalledWith("\n");
  });

  it("should write composed message", async () => {
    await printLog(defaultPayload as any, queueWriteMock);
    expect(composeMessage).toHaveBeenCalledWith(defaultPayload, true);
    expect(writeToStreamAsync).toHaveBeenCalledWith("COMPOSED_MESSAGE");
  });

  it("should print meta and context objects with configured options", async () => {
    await printLog(defaultPayload as any, queueWriteMock);
    expect(printObject).toHaveBeenCalledWith(
      expect.any(Function),
      defaultPayload.meta,
      expect.objectContaining({
        lineBreaks: 3,
        depth: 4,
      }),
    );

    expect(printObject).toHaveBeenCalledWith(
      expect.any(Function),
      defaultPayload.context,
      expect.objectContaining({
        lineBreaks: 5,
        depth: 6,
      }),
    );
  });

  it("should write lineBreaksAfter after all", async () => {
    await printLog(defaultPayload as any, queueWriteMock);
    expect(writeToStreamAsync).toHaveBeenCalledWith("\n\n");
  });

  it("should use default meta/context line breaks and depth if not configured", async () => {
    const payload = {
      meta: { foo: "bar" },
      context: { baz: "qux" },
      formatterConfig: {
        node: {},
      },
    };
    await printLog(payload as any, queueWriteMock);

    expect(printObject).toHaveBeenCalledWith(
      expect.any(Function),
      payload.meta,
      expect.objectContaining({
        lineBreaks: expect.any(Number),
        depth: expect.any(Number),
      }),
    );

    expect(printObject).toHaveBeenCalledWith(
      expect.any(Function),
      payload.context,
      expect.objectContaining({
        lineBreaks: expect.any(Number),
        depth: expect.any(Number),
      }),
    );
  });
});
