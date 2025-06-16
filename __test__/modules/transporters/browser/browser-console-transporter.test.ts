import type { RawPayload } from "@/core/logger";
import type { BrowserFormatter } from "@/modules/formatters";
import { BrowserConsoleTransporter } from "@/modules/transporters";
import { printLog } from "@/modules/transporters/browser/utils/print-log";

jest.mock("@/modules/transporters/browser/utils/print-log", () => ({
  printLog: jest.fn(),
}));

describe("BrowserConsoleTransporter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockNormalizer = {
    normalize: jest.fn().mockImplementation(({ rawPayload }) => ({
      ...rawPayload,
      formatterConfig: {},
    })),
  };

  const mockFormatter = {
    format: jest.fn().mockImplementation((normalized) => ({
      ...normalized,
      formatterConfig: { browser: { disabled: false } },
    })) as jest.MockedFunction<BrowserFormatter["format"]>,
  };

  const transporter = new BrowserConsoleTransporter({
    normalizer: mockNormalizer,
    formatter: mockFormatter as unknown as BrowserFormatter,
  });

  const rawPayload = {
    level: "info",
    message: "Test message",
    timestamp: 123456789,
    scope: ["test"],
    context: {},
    meta: {},
  } as unknown as RawPayload;

  it("should use formatter and print formatted log", async () => {
    await transporter.transport(rawPayload);

    expect(mockNormalizer.normalize).toHaveBeenCalledWith({
      platform: "browser",
      rawPayload,
    });

    expect(mockFormatter.format).toHaveBeenCalled();

    expect(printLog).toHaveBeenCalled();
  });
});
