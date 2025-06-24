import type { Formatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { RawPayload } from "@/shared/types/log-payload";
import { BrowserConsoleTransporter } from "@/modules/transporters/browser/browser-console-transporter";
import { printLog } from "@/modules/transporters/browser/utils/print-log";

jest.mock("@/modules/transporters/browser/utils/print-log", () => ({
  printLog: jest.fn(),
}));

describe("BrowserConsoleTransporter", () => {
  const mockNormalizer: Normalizer = {
    normalize: jest.fn(),
  } as Normalizer;

  const mockFormatter: Formatter = {
    format: jest.fn(),
  } as Formatter;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have platform set to 'browser'", () => {
    const transporter = new BrowserConsoleTransporter({
      normalizer: mockNormalizer,
      formatter: mockFormatter,
    });
    expect(transporter.platform).toBe("browser");
  });

  it("should normalize, format, and print the log", () => {
    const rawPayload: RawPayload = { message: "test" } as RawPayload;

    const normalizedPayload = { normalized: true };
    (mockNormalizer.normalize as jest.Mock).mockReturnValue(normalizedPayload);

    const formattedLog = {
      message: "[formatted log]",
      cssStyles: {
        level: "color: red;",
        timestamp: "color: gray;",
      },
      formatterConfig: {
        browser: {
          lineBreaksBefore: 0,
          lineBreaksAfter: 0,
          prefix: "",
          suffix: "",
          spaceAfterPrefix: false,
        },
      },
    };
    (mockFormatter.format as jest.Mock).mockReturnValue(formattedLog);

    const transporter = new BrowserConsoleTransporter({
      normalizer: mockNormalizer,
      formatter: mockFormatter,
    });

    transporter.transport(rawPayload);

    expect(mockNormalizer.normalize).toHaveBeenCalledWith(
      "browser",
      rawPayload,
    );
    expect(mockFormatter.format).toHaveBeenCalledWith(
      "browser",
      normalizedPayload,
    );
    expect(printLog).toHaveBeenCalledWith(formattedLog);
  });
});
