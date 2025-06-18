import type { HandlerErrorHandler } from "@/modules/handlers/handler-manager/handler-config-types";
import type { Handler } from "@/modules/handlers/types";
import { isHandlerClass } from "@/modules/handlers/handler-manager/utils/is-handler-class";

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
  onError?: HandlerErrorHandler;
}): void => {
  if (isHandlerClass(handler) && typeof handler.init === "function") {
    // Call init asynchronously, catch errors and report
    Promise.resolve()
      .then(() => handler.init?.())
      .catch((error) => onError?.({ error, id }));
  }
};
