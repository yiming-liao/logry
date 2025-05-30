import type { ReadyPayload } from "@/core/logger/types";
import type { NodeFormattedPayload } from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import { formatObject } from "@/modules/formatters/utils/format-object";
import { NodeConsoleTransporter } from "@/modules/transporters";
import { composeConsoleMessage } from "@/modules/transporters/node/utils/compose-console-message";
import { getProcessTags } from "@/modules/transporters/node/utils/get-process-tags";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

jest.mock("@/modules/transporters/node/utils/write-to-stream-async");
jest.mock("@/modules/transporters/node/utils/compose-console-message");
jest.mock("@/modules/formatters/utils/format-object");
jest.mock("@/modules/transporters/node/utils/get-process-tags");

describe("NodeConsoleTransporter", () => {
  let transporter: NodeConsoleTransporter;

  beforeEach(() => {
    transporter = new NodeConsoleTransporter();
    (getProcessTags as jest.Mock).mockResolvedValue({
      pid: "12345",
      hostname: "localhost",
    });
    (writeToStreamAsync as jest.Mock).mockResolvedValue(undefined);
  });

  describe("getOs", () => {
    it("should cache and return the os module", async () => {
      const osModule = await transporter["getOs"]();
      const osAgain = await transporter["getOs"]();
      expect(osModule).toBe(osAgain);
    });
  });

  describe("chainWrite", () => {
    it("should execute async callbacks in sequence", async () => {
      const order: string[] = [];
      await Promise.all([
        transporter["chainWrite"](async () => {
          order.push("1");
        }),
        transporter["chainWrite"](async () => {
          order.push("2");
        }),
        transporter["chainWrite"](async () => {
          order.push("3");
        }),
      ]);
      expect(order).toEqual(["1", "2", "3"]);
    });

    it("should catch and log errors", async () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      await transporter["chainWrite"](async () => {
        throw new Error("fail");
      });
      expect(spy).toHaveBeenCalledWith(
        "Transport logging error:",
        expect.any(Error),
      );
      spy.mockRestore();
    });
  });

  describe("transport", () => {
    let printUnformattedLogSpy: jest.SpyInstance;
    let printLogSpy: jest.SpyInstance;

    beforeEach(() => {
      printUnformattedLogSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(transporter as any, "printUnformattedLog")
        .mockResolvedValue(undefined);
      printLogSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(transporter as any, "printLog")
        .mockResolvedValue(undefined);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should delegate to printUnformattedLog when formatter is disabled", async () => {
      const payload = {
        formatterConfig: { node: { disabled: true } },
      } as ReadyPayload;

      await transporter.transport(payload);

      expect(printUnformattedLogSpy).toHaveBeenCalledTimes(1);
      expect(printLogSpy).not.toHaveBeenCalled();
    });

    it("should delegate to printLog when formatter is enabled", async () => {
      const payload = {
        formatterConfig: { node: { disabled: false } },
      } as ReadyPayload;

      await transporter.transport(payload);

      expect(printLogSpy).toHaveBeenCalledTimes(1);
      expect(printUnformattedLogSpy).not.toHaveBeenCalled();
    });

    it("should delegate to printLog when formatter config is undefined", async () => {
      const payload = {
        formatterConfig: {},
      } as ReadyPayload;

      await transporter.transport(payload);

      expect(printLogSpy).toHaveBeenCalledTimes(1);
      expect(printUnformattedLogSpy).not.toHaveBeenCalled();
    });
  });

  describe("printLog", () => {
    it("should write formatted log and call printObject", async () => {
      (composeConsoleMessage as jest.Mock).mockReturnValue("formatted-log");

      const meta = { foo: "bar" };
      const context = { bar: "baz" };

      await transporter["printLog"](
        {
          meta,
          context,
          formatterConfig: {
            node: { meta: {}, context: {} },
          },
        } as unknown as NodeFormattedPayload,
        "12345",
        "localhost",
      );

      expect(writeToStreamAsync).toHaveBeenCalledWith("formatted-log");
    });
  });

  describe("printUnformattedLog", () => {
    it("should stringify and write raw log payload", async () => {
      (formatObject as jest.Mock).mockReturnValue("json-log");

      await transporter["printUnformattedLog"](
        {
          timestamp: 123,
          id: "log-id",
          level: "INFO",
          scope: "test",
          message: "Hello",
          meta: {},
          context: {},
        } as NormalizedPayload,
        "12345",
        "localhost",
      );

      expect(writeToStreamAsync).toHaveBeenCalledWith("json-log\n");
    });
  });
});
