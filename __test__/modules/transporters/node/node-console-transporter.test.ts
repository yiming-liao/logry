import type { Formatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { RawPayload } from "@/shared/types/log-payload";
import { NodeConsoleTransporter } from "@/modules/transporters/node/node-console-transporter";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { appendProcessFields } from "@/shared/utils/node/append-process-fields";
import { getOs } from "@/shared/utils/node/lazy-modules";

jest.mock("@/shared/utils/node/append-process-fields", () => ({
  appendProcessFields: jest.fn(),
}));
jest.mock("@/modules/transporters/node/utils/print-log", () => ({
  printLog: jest.fn(),
}));
jest.mock("@/shared/utils/node/lazy-modules", () => ({
  getOs: jest.fn(),
}));

describe("NodeConsoleTransporter", () => {
  const mockNormalizer: Normalizer = {
    normalize: jest.fn(),
  } as Normalizer;

  const mockFormatter: Formatter = {
    format: jest.fn(),
  } as Formatter;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have platform set to 'node'", () => {
    const transporter = new NodeConsoleTransporter({
      normalizer: mockNormalizer,
      formatter: mockFormatter,
    });
    expect(transporter.platform).toBe("node");
  });

  it("should normalize, format, and print the log in order", async () => {
    const rawPayload: RawPayload = { message: "test" } as RawPayload;

    (appendProcessFields as jest.Mock).mockResolvedValue({
      ...rawPayload,
      processId: 1234,
    });

    const normalizedPayload = { normalized: true };
    (mockNormalizer.normalize as jest.Mock).mockReturnValue(normalizedPayload);

    const formattedLog = "[formatted log]";
    (mockFormatter.format as jest.Mock).mockReturnValue(formattedLog);

    (printLog as jest.Mock).mockResolvedValue(undefined);

    const transporter = new NodeConsoleTransporter({
      normalizer: mockNormalizer,
      formatter: mockFormatter,
    });

    await transporter.transport(rawPayload);

    expect(appendProcessFields).toHaveBeenCalledWith(getOs, rawPayload);

    expect(mockNormalizer.normalize).toHaveBeenCalledWith("node", {
      ...rawPayload,
      processId: 1234,
    });

    expect(mockFormatter.format).toHaveBeenCalledWith(
      "node",
      normalizedPayload,
    );

    expect(printLog).toHaveBeenCalledWith(formattedLog, expect.any(Function));
  });
});
