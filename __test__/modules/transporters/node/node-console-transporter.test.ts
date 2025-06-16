import type { RawPayload } from "@/core/logger/types";
import { NodeConsoleTransporter } from "@/modules/transporters/node/node-console-transporter";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { appendProcessParts } from "@/shared/utils/append-process-parts";

jest.mock("@/modules/transporters/node/utils/print-log", () => ({
  printLog: jest.fn(),
}));

jest.mock("@/shared/utils/append-process-parts", () => ({
  appendProcessParts: jest.fn((fn, raw) => Promise.resolve(raw)),
}));

describe("NodeConsoleTransporter", () => {
  const normalizeMock = jest.fn();
  const formatMock = jest.fn();

  const transporter = new NodeConsoleTransporter({
    normalizer: { normalize: normalizeMock },
    formatter: {
      format: formatMock,
      platform: "node",
    },
  });

  const rawPayload = {
    timestamp: 111,
    id: "log-id",
    level: "info",
    scope: ["test"],
    message: "hello",
    raw: {},
    normalizerConfig: {},
    formatterConfig: {
      node: {},
    },
  } as RawPayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should normalize, format, and print a formatted log", async () => {
    const normalizedPayload = { foo: "bar" };
    const formattedPayload = { bar: "baz" };

    normalizeMock.mockReturnValue(normalizedPayload);
    formatMock.mockReturnValue(formattedPayload);

    await transporter.transport(rawPayload);

    expect(appendProcessParts).toHaveBeenCalledWith(
      expect.any(Function),
      rawPayload,
    );
    expect(normalizeMock).toHaveBeenCalledWith({
      platform: "node",
      rawPayload,
    });
    expect(formatMock).toHaveBeenCalledWith(normalizedPayload);
    expect(printLog).toHaveBeenCalledWith(
      formattedPayload,
      expect.any(Function),
    );
  });
});
