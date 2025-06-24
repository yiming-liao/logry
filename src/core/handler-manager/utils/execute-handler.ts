import type { OnErrorCallback } from "@/core/handler-manager/handler-manager-config-types";
import type { Handler } from "@/core/handler-manager/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { isHandlerClass } from "@/core/handler-manager/utils/is-handler-class";

type ExecuteHandlerOptions = {
  handler: Handler;
  id: string;
  rawPayload: RawPayload;
  onError?: OnErrorCallback;
};

/**
 * Executes a logging handler with the provided payload.
 * Supports handlers defined as functions or as class instances with a `handle` method.
 * If the handler throws an error, it will be caught and passed to the optional error callback.
 *
 * @param handler - The handler to execute (function or class instance).
 * @param id - Identifier for the handler, used in error callback.
 * @param rawPayload - The raw log payload to be passed to the handler.
 * @param onError - Optional callback to handle errors thrown by the handler.
 */
export const executeHandler = async ({
  handler,
  id,
  rawPayload,
  onError,
}: ExecuteHandlerOptions): Promise<void> => {
  try {
    if (typeof handler === "function") {
      await handler(rawPayload);
    } else if (isHandlerClass(handler)) {
      await handler.handle(rawPayload);
    }
  } catch (error) {
    onError?.({ error, id });
  }
};
