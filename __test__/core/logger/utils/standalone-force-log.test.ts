import type { RawPayload, ReadyPayload } from "@/core/logger/types";
import type { NodeFormattedPayload } from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { formatPayload } from "@/core/logger/utils/payload/format-payload";
import { normalizePayload } from "@/core/logger/utils/payload/normalize-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { standaloneForceLog } from "@/core/logger/utils/standalone-force-log";

jest.mock("@/modules/normalizers");
jest.mock("@/modules/transporters/node/node-console-transporter");
jest.mock("@/modules/transporters/browser/browser-console-transporter");
jest.mock("@/core/logger/utils/payload/build-payload");
jest.mock("@/core/logger/utils/payload/normalize-payload");
jest.mock("@/core/logger/utils/payload/format-payload");
jest.mock("@/core/logger/utils/payload/transport-payload");

describe("standaloneForceLog", () => {
  const mockBuildPayload = buildPayload as jest.MockedFunction<
    typeof buildPayload
  >;
  const mockNormalizePayload = normalizePayload as jest.MockedFunction<
    typeof normalizePayload
  >;
  const mockFormatPayload = formatPayload as jest.MockedFunction<
    typeof formatPayload
  >;
  const mockTransportPayload = transportPayload as jest.MockedFunction<
    typeof transportPayload
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should build the log payload with correct data", () => {
    mockBuildPayload.mockReturnValue({
      level: "info",
      message: "test",
    } as RawPayload);
    mockNormalizePayload.mockReturnValue({} as NormalizedPayload);
    mockFormatPayload.mockReturnValue({} as NodeFormattedPayload);

    standaloneForceLog({
      level: "info",
      message: "test message",
    });

    expect(mockBuildPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        message: "test message",
      }),
    );
  });

  it("should normalize the payload after building it", () => {
    mockBuildPayload.mockReturnValue({ level: "warn" } as RawPayload);
    mockNormalizePayload.mockReturnValue({
      normalized: true,
    } as unknown as NormalizedPayload);
    mockFormatPayload.mockReturnValue({} as ReadyPayload);

    standaloneForceLog({
      level: "warn",
      message: "warn message",
    });

    expect(mockNormalizePayload).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        level: "warn",
      }),
    );
  });

  it("should format the normalized payload", () => {
    const normalizedPayload = {
      formatterConfig: { color: true },
    } as unknown as NormalizedPayload;
    mockBuildPayload.mockReturnValue({ level: "error" } as RawPayload);
    mockNormalizePayload.mockReturnValue(normalizedPayload);
    mockFormatPayload.mockReturnValue({
      formatted: true,
    } as unknown as ReadyPayload);

    standaloneForceLog({
      level: "error",
      message: "error message",
    });

    expect(mockFormatPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        normalizedPayload,
        formatterConfig: normalizedPayload.formatterConfig,
        nodeFormatter: expect.any(Object),
        browserFormatter: expect.any(Object),
      }),
    );
  });

  it("should transport the formatted payload", () => {
    const formattedPayload = { transported: true } as unknown as Transporter;
    mockBuildPayload.mockReturnValue({ level: "debug" } as RawPayload);
    mockNormalizePayload.mockReturnValue({} as NormalizedPayload);
    mockFormatPayload.mockReturnValue(
      formattedPayload as unknown as ReadyPayload,
    );

    standaloneForceLog({
      level: "debug",
      message: "debug message",
    });

    expect(mockTransportPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        readyPayload: formattedPayload,
        transporters: expect.any(Array),
      }),
    );
  });
});
