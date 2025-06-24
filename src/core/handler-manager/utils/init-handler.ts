import type { OnErrorCallback } from "@/core/handler-manager/handler-manager-config-types";
import type { Handler } from "@/core/handler-manager/types";
import { isHandlerClass } from "@/core/handler-manager/utils/is-handler-class";

/**
 * Initialize the handler by calling its init method asynchronously if present.
 *
 * If the handler is a class with an init function, invoke it and
 * handle any initialization errors by calling onError callback.
 *
 * @param params.handler - The handler instance or object.
 * @param params.id - Identifier for the handler, passed to onError if any.
 * @param params.onError - Optional callback to handle errors during init.
 */
export const initHandler = ({
  handler,
  id,
  onError,
}: {
  handler: Handler;
  id: string;
  onError?: OnErrorCallback;
}): void => {
  if (isHandlerClass(handler) && typeof handler.init === "function") {
    // Call init asynchronously, catch errors and report
    Promise.resolve()
      .then(() => handler.init?.())
      .catch((error) => onError?.({ error, id }));
  }
};
