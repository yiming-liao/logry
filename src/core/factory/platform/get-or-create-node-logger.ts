import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { getOrCreateLogger } from "@/core/factory/get-or-create-logger";
import { NodeLogger } from "@/core/logger";

export const getOrCreateNodeLogger = (
  options?: Omit<GetOrCreateLoggerOptions, "Logger">,
) => {
  return getOrCreateLogger({ ...options, Logger: NodeLogger });
};
