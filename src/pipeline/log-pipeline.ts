import type { LoggerCore } from "@/logger/logger-core";
import type {
  NormalizeConfig,
  FormatConfig,
  RenderConfig,
  PrintConfig,
} from "@/pipeline";
import type { Level } from "@/shared/level";
import type { LogContext } from "@/shared/types/log-context";
import type { LogHook } from "@/shared/types/log-hook";
import type { RuraResult } from "rura";
import { rura } from "rura";
import { createContext } from "@/pipeline/utils/create-context";
import { parseLogArgs } from "@/pipeline/utils/parse-log-args";
import { PREFIX } from "@/shared/internal";
import { deepMerge } from "@/shared/utils/deep-merge";
import { resolveScopes } from "@/shared/utils/resolve-scopes";

/**
 * Runs the log pipeline by executing sync hooks first,
 * then async hooks in the background.
 *
 * - Merges per-call configs and context.
 * - Builds a LogContext for downstream hooks.
 * - Ensures async hook failures do not break the pipeline.
 */
export const logPipeline = ({
  hooks,
  level,
  core,
  configs,
  args,
}: {
  hooks: LogHook[];
  level: Level;
  core?: LoggerCore;
  configs?: {
    normalizeConfig?: NormalizeConfig;
    formatConfig?: FormatConfig;
    renderConfig?: RenderConfig;
    printConfig?: PrintConfig;
  };
  args: unknown[];
}): RuraResult<LogContext, void> | undefined => {
  const { normalizeConfig, formatConfig, renderConfig, printConfig } =
    configs || {};

  // Parse log arguments
  const { message, meta, options } = parseLogArgs(...args);

  // Create log context
  const logContext = createContext({
    id: core?.id,
    level,
    scope: resolveScopes(core?.scope, options?.scope),
    message,
    meta,
    context: deepMerge(core?.context, options?.context),
    timestamp: Date.now(),
    normalizeConfig: deepMerge(normalizeConfig, options?.normalizeConfig) || {},
    formatConfig: deepMerge(formatConfig, options?.formatConfig) || {},
    renderConfig: deepMerge(renderConfig, options?.renderConfig) || {},
    printConfig: deepMerge(printConfig, options?.printConfig) || {},
  });

  // Split sync and async hooks
  const asyncHooks = hooks.filter((h) => rura.isAsyncHook(h));
  const syncHooks = hooks.filter((h) => !rura.isAsyncHook(h));

  // Run sync pipeline
  rura.createPipeline(syncHooks).run(logContext);

  // Run async hooks (fire & forget)
  for (const hook of asyncHooks) {
    Promise.resolve(hook.run(logContext)).catch((error) => {
      console.error(`${PREFIX} async hook failed:`, error);
    });
  }
  return;
};
