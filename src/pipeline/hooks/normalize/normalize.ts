import type { LogContext } from "@/shared/types/log-context";
import { rura } from "rura";
import { normalizeMeta } from "@/pipeline/hooks/normalize/fields/meta/normalize-meta";

const nullIfUndef = <T>(value: T | undefined | null): T | null => {
  return value === undefined ? null : value;
};

export const normalize = rura.createHook<LogContext, void>(
  "__normalize__",
  (ctx) => {
    const { meta } = ctx.raw;
    const normalizeConfig = ctx.configs.normalizeConfig || {};

    ctx.normalized = {
      timestamp: ctx.raw.timestamp,
      id: nullIfUndef(ctx.raw.id),
      level: ctx.raw.level,
      scope: ctx.raw.scope,
      message: nullIfUndef(ctx.raw.message),
      meta: normalizeMeta(meta, ctx, normalizeConfig.meta),
      context: nullIfUndef(ctx.raw.context),
    };
  },
  100,
);
