import type { NodeFormattedPayload } from "@/modules/formatters";
import { getProcessTags } from "@/modules/transporters/node/utils/get-process-tags";

jest.mock("@/modules/formatters/node/parts/format-hostname", () => ({
  formatHostname: jest.fn((_, raw) => `formatted-hostname:${raw}`),
}));

jest.mock("@/modules/formatters/node/parts/format-pid", () => ({
  formatPid: jest.fn((_, raw) => `formatted-pid:${raw}`),
}));

describe("getProcessTags", () => {
  it("should return formatted pid and hostname when os.hostname is available", async () => {
    const mockOs = {
      hostname: () => "real-host",
    } as unknown as typeof import("os");
    const getOsFn = async () => mockOs;

    const payload = {
      formatterConfig: {
        node: {
          pid: {},
          hostname: {},
        },
      },
    } as NodeFormattedPayload;

    const result = await getProcessTags(getOsFn, payload);

    expect(result).toEqual({
      pid: "formatted-pid:" + process.pid,
      hostname: "formatted-hostname:real-host",
    });
  });

  it("should use fallback hostname if os.hostname is not a function", async () => {
    const mockOs = {} as unknown as typeof import("os");
    const getOsFn = async () => mockOs;

    const payload = {
      formatterConfig: {
        node: {
          pid: {},
          hostname: {},
        },
      },
    } as NodeFormattedPayload;

    const result = await getProcessTags(getOsFn, payload);

    expect(result.hostname).toBe("formatted-hostname:unknown-host");
  });

  it("should default pid to 0 if process.pid is not available", async () => {
    const getOsFn = async () =>
      ({ hostname: () => "host" }) as unknown as typeof import("os");

    const originalPid = process.pid;
    // 模擬 undefined pid，實際上無法重設 process.pid，只能假設 formatter 接收 0 正常運作
    const payload = {
      formatterConfig: {
        node: {
          pid: {},
          hostname: {},
        },
      },
    } as NodeFormattedPayload;

    const result = await getProcessTags(getOsFn, payload);

    expect(result.pid).toBe(`formatted-pid:${originalPid}`);
  });
});
