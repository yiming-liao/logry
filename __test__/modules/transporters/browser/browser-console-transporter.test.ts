import type { ReadyPayload } from "@/core/logger/types";
import type { BrowserFormattedPayload } from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import { BrowserConsoleTransporter } from "@/modules/transporters";

describe("BrowserConsoleTransporter", () => {
  let transporter: BrowserConsoleTransporter;

  beforeEach(() => {
    transporter = new BrowserConsoleTransporter();
    jest.restoreAllMocks();
  });

  describe("transport", () => {
    it("should call printUnformattedLog when formatter is disabled", async () => {
      const spy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(transporter as any, "printUnformattedLog")
        .mockImplementation(() => undefined);
      const payload = {
        formatterConfig: { browser: { disabled: true } },
      } as ReadyPayload;

      await transporter.transport(payload);

      expect(spy).toHaveBeenCalledWith(payload);
    });

    it("should call printLog when formatter is enabled", async () => {
      const spy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(transporter as any, "printLog")
        .mockImplementation(() => undefined);
      const payload = {
        formatterConfig: { browser: { disabled: false } },
      } as ReadyPayload;

      await transporter.transport(payload);

      expect(spy).toHaveBeenCalledWith(payload);
    });
  });

  describe("printLog", () => {
    it("should call console.log with formatted console arguments", () => {
      const payload = {
        meta: {},
        context: {},
        cssStyles: [],
        formatterConfig: {
          browser: {
            disabled: false,
            meta: {},
            context: {},
          },
        },
      } as unknown as BrowserFormattedPayload;

      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => undefined);

      transporter["printLog"](payload);

      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe("printUnformattedLog", () => {
    it("should call console.log with unformatted log object", () => {
      const payload = {
        timestamp: "2025-06-07T00:00:00Z",
        id: "abc123",
        level: "info",
        scope: "test",
        message: "test message",
        meta: { foo: "bar" },
        context: { baz: "qux" },
      } as unknown as NormalizedPayload;

      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => undefined);

      transporter["printUnformattedLog"](payload);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "",
        {
          timestamp: "2025-06-07T00:00:00Z",
          id: "abc123",
          level: "info",
          scope: "test",
          message: "test message",
          meta: { foo: "bar" },
          context: { baz: "qux" },
        },
        "",
      );
    });
  });
});
