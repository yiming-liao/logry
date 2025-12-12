import type { LogContext } from "@/shared/types/log-context";
import { rura } from "rura";
import {
  formatContext,
  formatLevel,
  formatMeta,
  formatScope,
  formatTimestamp,
} from "@/pipeline/hooks/format/fields";
import { PREFIX } from "@/shared/internal";

export const format = rura.createHook<LogContext, void>(
  "__format__",
  (ctx) => {
    if (!ctx.normalized) {
      throw new Error(
        `${PREFIX} format hook received an unnormalized context.`,
      );
    }

    const { timestamp, id, level, scope, message, meta, context } =
      ctx.normalized;
    const formatConfig = ctx.configs.formatConfig || {};

    ctx.formatted = {
      timestamp: formatTimestamp(timestamp, ctx, formatConfig.timestamp),
      id: formatConfig.id?.hide ? null : id,
      level: formatLevel(level, ctx, formatConfig.level),
      scope: formatScope(scope, ctx, formatConfig.scope),
      message: formatConfig.message?.hide ? null : message,
      meta: formatMeta(meta, ctx, formatConfig.meta),
      context: formatContext(context, ctx, formatConfig.context),
    };
  },
  200,
);
