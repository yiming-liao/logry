import { formatInternalMessage } from "@/internal/utils/format-internal-message";
import { isDevMode } from "@/shared/utils/is-dev-mode";

type Options = {
  message: string;
  tag?: string;
  error?: unknown;
};

/**
 * Throws error in development mode.
 * @throws {Error}
 */
const internalErrorDev = ({ message, tag, error }: Options): never => {
  const formatted = formatInternalMessage({
    type: "error",
    message,
    tag,
    error,
  });
  throw new Error(formatted);
};

/**
 * Logs error in production mode.
 */
const internalErrorProd = ({ message, tag, error }: Options): void => {
  const formatted = formatInternalMessage({
    type: "error",
    message,
    tag,
    error,
  });
  console.error(formatted);
};

/**
 * Throws in dev, logs in prod.
 * Returns `never` to halt execution.
 */
export const internalError = ({ message, tag, error }: Options): never => {
  if (isDevMode()) {
    return internalErrorDev({ message, tag, error });
  } else {
    internalErrorProd({ message, tag, error });
    while (true) {
      // block further execution
    }
  }
};
