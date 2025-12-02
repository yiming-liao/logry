import type { RawPayload } from "@/shared/types/log-payload";
import type * as NodeOs from "node:os";
import { appendProcessFields } from "@/shared/utils/node/append-process-fields";

describe("appendProcessFields", () => {
  it("should append pid and hostname from os module", async () => {
    const fakeOs = { hostname: () => "mock-host" };
    const getOsFn = async () => fakeOs as typeof NodeOs;

    const input = {
      level: "info",
      message: "test",
      context: { test: "test-case" },
      raw: {},
    } as unknown as RawPayload;

    const result = await appendProcessFields(getOsFn, input);

    expect(result.pid).toBe(process.pid);
    expect(result.hostname).toBe("mock-host");
    expect(result.raw.pid).toBe(process.pid);
    expect(result.raw.hostname).toBe("mock-host");
  });

  it("should fallback when os module is undefined", async () => {
    const getOsFn = async () => undefined;

    const input = {
      level: "info",
      message: "test",
      context: { test: "test-case" },
      raw: {},
    } as unknown as RawPayload;

    const result = await appendProcessFields(getOsFn, input);

    expect(result.hostname).toBe("unknown-host");
    expect(result.raw.hostname).toBe("unknown-host");
  });

  it("should fallback pid to 0 when process.pid is unavailable", async () => {
    const originalPid = process.pid;
    Object.defineProperty(process, "pid", {
      value: undefined,
      configurable: true,
    });

    const fakeOs = { hostname: () => "another-host" };
    const getOsFn = async () => fakeOs as typeof NodeOs;

    const input = {
      level: "info",
      message: "test",
      context: { test: "test-case" },
      raw: {},
    } as unknown as RawPayload;

    const result = await appendProcessFields(getOsFn, input);

    expect(result.pid).toBe(0);
    expect(result.raw.pid).toBe(0);

    // Restore
    Object.defineProperty(process, "pid", {
      value: originalPid,
    });
  });
});
