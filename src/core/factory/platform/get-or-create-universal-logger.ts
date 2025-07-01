import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { getOrCreateLogger } from "@/core/factory/get-or-create-logger";
import { UniversalLogger } from "@/core/logger";

export const getOrCreateUniversalLogger = (
  options?: Omit<GetOrCreateLoggerOptions, "Logger">,
) => {
  return getOrCreateLogger({ ...options, Logger: UniversalLogger });
};
