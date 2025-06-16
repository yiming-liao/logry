import type { RawPayload } from "@/core/logger";
import { appendProcessParts } from "@/shared/utils/append-process-parts";
import { preparePayload } from "@/shared/utils/prepare-payload";

jest.mock("@/shared/utils/append-process-parts");

const mockAppendProcessParts = appendProcessParts as jest.MockedFunction<
  typeof appendProcessParts
>;

describe("preparePayload", () => {
  const mockNormalizer = {
    normalize: jest.fn(({ rawPayload }) => ({
      ...rawPayload,
      normalized: true,
      pid: "1234",
    })),
  };

  const rawPayload = {
    timestamp: 123456,
    id: "abc",
    level: "info",
    pid: undefined,
    hostname: undefined,
    scope: "test",
    message: "hello",
    meta: {},
    context: {},
  } as unknown as RawPayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return normalized payload and filteredPayload when useNormalizer is true", async () => {
    mockAppendProcessParts.mockResolvedValue(rawPayload);

    const { payload, filteredPayload } = await preparePayload({
      platform: "node",
      rawPayload,
      useNormalizer: true,
      normalizer: mockNormalizer,
      injectProcessParts: false,
    });

    expect(mockNormalizer.normalize).toHaveBeenCalled();
    expect(payload).toHaveProperty("normalized", true);
    expect(filteredPayload.pid).toBe(1234);
  });

  it("should return raw payload and filteredPayload when useNormalizer is false", async () => {
    mockAppendProcessParts.mockResolvedValue(rawPayload);

    const { payload, filteredPayload } = await preparePayload({
      platform: "node",
      rawPayload,
      useNormalizer: false,
      normalizer: mockNormalizer,
      injectProcessParts: false,
    });

    expect(mockNormalizer.normalize).not.toHaveBeenCalled();
    expect(payload).toBe(rawPayload);
    expect(filteredPayload.pid).toBe(0);
    expect(filteredPayload.hostname).toBe("");
  });

  it("should append process parts if injectProcessParts is true", async () => {
    const appendedPayload = {
      ...rawPayload,
      pid: "9999",
      hostname: "host",
    } as unknown as RawPayload;
    mockAppendProcessParts.mockResolvedValue(appendedPayload);

    const { filteredPayload } = await preparePayload({
      platform: "node",
      rawPayload,
      useNormalizer: false,
      normalizer: mockNormalizer,
      injectProcessParts: true,
    });

    expect(mockAppendProcessParts).toHaveBeenCalled();
    expect(filteredPayload.pid).toBe(9999);
    expect(filteredPayload.hostname).toBe("host");
  });
});
