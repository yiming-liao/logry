import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { getOrCreateLogger } from "@/core/factory/get-or-create-logger";
import { EdgeLogger } from "@/core/logger";

export const getOrCreateEdgeLogger = (
  options?: Omit<GetOrCreateLoggerOptions, "Logger">,
) => {
  return getOrCreateLogger({ ...options, Logger: EdgeLogger });
};
