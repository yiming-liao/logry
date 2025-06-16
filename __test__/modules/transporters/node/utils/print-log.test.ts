import type { NodeFormattedPayload } from "@/modules/formatters";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

jest.mock("@/modules/transporters/node/utils/write-to-stream-async", () => ({
  writeToStreamAsync: jest.fn(),
}));

jest.mock("@/modules/transporters/node/utils/compose-message", () => ({
  composeMessage: jest.fn(),
}));

jest.mock("@/modules/transporters/node/utils/print-object", () => ({
  printObject: jest.fn(),
}));

describe("printLog", () => {
  const mockPayload = {
    timestamp: "2025-06-16 12:00:00",
    id: "abc123",
    level: "info",
    scope: "test",
    message: "Test log",
    meta: { foo: "bar" },
    context: { user: "yiming" },
    normalizerConfig: {},
    formatterConfig: {
      node: {
        lineBreaksBefore: 1,
        lineBreaksAfter: 2,
        meta: { lineBreaks: 1, depth: 3 },
        context: { lineBreaks: 2, depth: 2 },
      },
    },
    raw: {
      id: "abc123",
      level: "info",
      scope: ["test"],
      message: "Test log",
      timestamp: 123456789,
    },
  } as unknown as NodeFormattedPayload;

  const queueWrite = jest.fn((fn) => fn());

  beforeEach(() => {
    jest.clearAllMocks();
    (composeMessage as jest.Mock).mockReturnValue("COMPOSED_MESSAGE");
  });

  it("should call queueWrite and write all outputs in order", async () => {
    await printLog(mockPayload, queueWrite);

    expect(queueWrite).toHaveBeenCalledTimes(1);
    expect(writeToStreamAsync).toHaveBeenCalledWith("\n");
    expect(writeToStreamAsync).toHaveBeenCalledWith("COMPOSED_MESSAGE");

    expect(printObject).toHaveBeenCalledWith(mockPayload.meta, {
      lineBreaks: 1,
      depth: 3,
    });

    expect(printObject).toHaveBeenCalledWith(mockPayload.context, {
      lineBreaks: 2,
      depth: 2,
    });

    expect(writeToStreamAsync).toHaveBeenCalledWith("\n\n");
  });

  it("should not write line breaks if not configured", async () => {
    const payloadWithoutBreaks: NodeFormattedPayload = {
      ...mockPayload,
      formatterConfig: { node: {} },
    };

    await printLog(payloadWithoutBreaks, queueWrite);

    // No line break
    expect(writeToStreamAsync).not.toHaveBeenCalledWith("\n");
    expect(writeToStreamAsync).not.toHaveBeenCalledWith("\n\n");

    expect(writeToStreamAsync).toHaveBeenCalledWith("COMPOSED_MESSAGE");
  });
});
