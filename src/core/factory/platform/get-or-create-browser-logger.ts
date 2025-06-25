import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { getOrCreateLogger } from "@/core/factory/get-or-create-logger";
import { BrowserLogger } from "@/core/logger";

export const getOrCreateBrowserLogger = (
  options?: GetOrCreateLoggerOptions,
) => {
  return getOrCreateLogger({ ...options, Logger: BrowserLogger });
};
