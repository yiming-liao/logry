import type { LogContext } from "@/shared/types/log-context";
import { rura } from "rura";
import { renderField } from "@/pipeline/hooks/render/render-field";
import { PREFIX } from "@/shared/internal";

export const render = rura.createHook<LogContext, void>(
  "__render__",
  (ctx) => {
    if (!ctx.formatted) {
      throw new Error(`${PREFIX} render hook received an unformatted context.`);
    }

    const { timestamp, id, level, scope, message, meta, context } =
      ctx.formatted;
    const renderConfig = ctx.configs.renderConfig || {};

    ctx.rendered = {
      timestamp: renderField(
        "timestamp",
        timestamp,
        ctx,
        renderConfig.timestamp,
      ),
      id: renderField("id", id, ctx, renderConfig.id),
      level: renderField("level", level, ctx, renderConfig.level),
      scope: renderField("scope", scope, ctx, renderConfig.scope),
      message: renderField("message", message, ctx, renderConfig.message),
      meta: renderField("meta", meta, ctx, renderConfig.meta),
      context: renderField("context", context, ctx, renderConfig.context),
    };
  },
  300,
);
