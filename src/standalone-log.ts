import type { Level } from "@/shared/level";
import type { LogFn } from "@/shared/types/log-fn";
import { logPipeline } from "@/pipeline";
import { DEFAULT_HOOKS } from "@/pipeline/hooks";
import { PRESETS } from "@/shared/presets";

const baseStandaloneLog = (level: Level, args: unknown[]): void => {
  logPipeline({
    hooks: DEFAULT_HOOKS,
    level,
    args,
    configs: { ...PRESETS.pretty },
  });
};

export const standaloneLog: Record<Exclude<Level, "silent">, LogFn> = {
  trace: (...args: unknown[]) => baseStandaloneLog("trace", args),
  debug: (...args: unknown[]) => baseStandaloneLog("debug", args),
  info: (...args: unknown[]) => baseStandaloneLog("info", args),
  warn: (...args: unknown[]) => baseStandaloneLog("warn", args),
  error: (...args: unknown[]) => baseStandaloneLog("error", args),
  fatal: (...args: unknown[]) => baseStandaloneLog("fatal", args),
};
