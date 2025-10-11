import type { LogOptions } from "@/core/logger/types";
import type { LoggerCore } from "@/core/logger-core";
import type { Level } from "@/shared/types";
import { parseLogArgs } from "@/core/logger/base-logger/utils/parse-log-args";
import { shouldLog } from "@/core/logger/utils/should-log";

export const logAtLevel = ({
  level,
  log,
  core,
  args,
}: {
  level: Exclude<Level, "silent">;
  log: (logOptions: LogOptions) => void;
  core: LoggerCore;
  args: unknown[];
}) => {
  const { message, meta, options } = parseLogArgs(...args);
  if (shouldLog({ effectiveLevel: core.level, level })) {
    log({ level, message, meta, options, id: core.id });
  }
};
