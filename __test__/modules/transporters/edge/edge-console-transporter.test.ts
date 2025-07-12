import type { Formatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { RawPayload } from "@/shared/types/log-payload";
import { EdgeConsoleTransporter } from "@/modules/transporters";

describe("EdgeConsoleTransporter", () => {
  it("should transport normalized and formatted log to console", async () => {
    const mockNormalize = jest.fn().mockImplementation(() => {
      return {
        timestamp: "[time]",
        id: "[id]",
        level: "[INFO]",
        scope: "[scope]",
        message: " message",
        meta: "",
        context: "",
        formatterConfig: {
          edge: { lineBreaksBefore: 0, lineBreaksAfter: 0 },
        },
      };
    });

    const mockFormat = jest.fn().mockImplementation((platform, payload) => {
      return {
        ...payload,
        message: payload.message.toUpperCase(),
      };
    });

    const mockConsoleLog = jest
      .spyOn(console, "info")
      .mockImplementation(() => {});

    const normalizer: Normalizer = {
      normalize: mockNormalize,
    } as unknown as Normalizer;
    const formatter: Formatter = { format: mockFormat } as unknown as Formatter;

    const transporter = new EdgeConsoleTransporter({ normalizer, formatter });

    const rawPayload: RawPayload = {
      level: "info",
      message: "test",
      scope: [],
      timestamp: Date.now(),
    } as unknown as RawPayload;

    await transporter.transport(rawPayload);

    expect(mockNormalize).toHaveBeenCalledWith("edge", expect.any(Object));
    expect(mockFormat).toHaveBeenCalledWith("edge", expect.any(Object));
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining("MESSAGE"),
    );

    mockConsoleLog.mockRestore();
  });
});
