import { Logger } from "@/core/logger";
import { LoggerCore } from "@/core/logger-core";

describe("Logger handler and lifecycle", () => {
  let logger: Logger;
  let core: LoggerCore;

  beforeEach(() => {
    core = new LoggerCore({ id: "test", level: "info" });
    logger = new Logger({ core });

    jest.clearAllMocks();
  });

  it("should delegate addHandler to handlerManager", () => {
    const handler = jest.fn();
    const spy = jest.spyOn(core.handlerManager, "addHandler");

    logger.addHandler(handler, "test-handler");

    expect(spy).toHaveBeenCalledWith(handler, "test-handler", undefined);
  });

  it("should delegate removeHandler to handlerManager", () => {
    const spy = jest.spyOn(core.handlerManager, "removeHandler");

    logger.removeHandler("test-handler");

    expect(spy).toHaveBeenCalledWith("test-handler");
  });

  it("should call flush on handlerManager and transporters", async () => {
    const handlerFlush = jest
      .spyOn(core.handlerManager, "flush")
      .mockResolvedValue(undefined);

    await logger.flush(1000);

    expect(handlerFlush).toHaveBeenCalledWith(1000);
  });

  it("should call dispose on handlerManager", () => {
    const spy = jest.spyOn(core.handlerManager, "dispose");

    logger.dispose();

    expect(spy).toHaveBeenCalled();
  });
});
