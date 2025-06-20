import type { FormatterConfig } from "@/modules/formatters";
import type { NormalizerConfig } from "@/modules/normalizers";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { standaloneForceLog } from "@/core/logger/utils/standalone-force-log";

jest.mock("@/core/logger/utils/payload/build-payload");
jest.mock("@/core/logger/utils/payload/transport-payload");

describe("standaloneForceLog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should build payload with correct parameters", () => {
    const mockBuildPayload = buildPayload as jest.Mock;
    mockBuildPayload.mockReturnValue({ fake: "payload" });

    standaloneForceLog({
      level: "info",
      message: "test message",
      meta: { key: "value" },
      options: {
        scope: ["scope1"],
        context: { user: "tester" },
        normalizerConfig: { someConfig: true } as NormalizerConfig,
        formatterConfig: { someFormatter: true } as FormatterConfig,
      },
    });

    expect(mockBuildPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        message: "test message",
        meta: { key: "value" },
        scope: ["scope1"],
        context: { user: "tester" },
        normalizerConfig: { someConfig: true },
        formatterConfig: { someFormatter: true },
      }),
    );
  });

  it("should transport payload after building", () => {
    const fakePayload = { fake: "payload" };
    (buildPayload as jest.Mock).mockReturnValue(fakePayload);
    const mockTransportPayload = transportPayload as jest.Mock;

    standaloneForceLog({
      level: "error",
      message: "error message",
    });

    expect(mockTransportPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        rawPayload: fakePayload,
      }),
    );
  });

  it("should convert scope to array if given a string", () => {
    (buildPayload as jest.Mock).mockReturnValue({ fake: "payload" });

    standaloneForceLog({
      level: "warn",
      message: "warning message",
      options: {
        scope: "singleScope",
      },
    });

    expect(buildPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        scope: ["singleScope"],
      }),
    );
  });

  it("should handle undefined or missing options gracefully", () => {
    (buildPayload as jest.Mock).mockReturnValue({ fake: "payload" });

    expect(() =>
      standaloneForceLog({
        level: "debug",
        message: "debug message",
      }),
    ).not.toThrow();
  });
});
