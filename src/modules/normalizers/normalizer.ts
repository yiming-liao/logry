import type { NodeNormalizerConfig } from "@/modules/normalizers/types";
import type { Platform } from "@/shared/types";
import type { NormalizedPayload, RawPayload } from "@/shared/types/log-payload";
import {
  normalizeTimestamp,
  normalizeId,
  normalizeLevel,
  normalizeScope,
  normalizeMessage,
  normalizeMeta,
  normalizeContext,
} from "@/modules/normalizers/fields";
import { normalizeHostname } from "@/modules/normalizers/fields/normalize-hostname";
import { normalizePid } from "@/modules/normalizers/fields/normalize-pid";

export class Normalizer {
  normalize<P extends Platform>(
    platform: P,
    {
      timestamp,
      id,
      level,
      pid,
      hostname,
      scope,
      message,
      meta,
      context,
      normalizerConfig,
      formatterConfig,
      raw,
    }: RawPayload,
  ): NormalizedPayload {
    const {
      timestamp: timestampOptions,
      id: idOptions,
      level: levelOptions,
      scope: scopeOptions,
      message: messageOptions,
      meta: metaOptions,
      context: contextOptions,
    } = normalizerConfig[platform] || {};

    const nodeConfig = normalizerConfig[platform] as
      | NodeNormalizerConfig
      | undefined;

    // Node-specific field options
    const pidOptions = platform === "node" ? nodeConfig?.pid : undefined;
    const hostnameOptions =
      platform === "node" ? nodeConfig?.hostname : undefined;

    return {
      timestamp: normalizeTimestamp(timestamp, raw, timestampOptions),
      id: normalizeId(id, raw, idOptions),
      level: normalizeLevel(level, raw, levelOptions),
      scope: normalizeScope(scope, raw, scopeOptions),
      message: normalizeMessage(message, raw, messageOptions),
      meta: normalizeMeta(meta, raw, metaOptions),
      context: normalizeContext(context, raw, contextOptions),
      ...(pid ? { pid: normalizePid(pid, raw, pidOptions) } : {}),
      ...(hostname
        ? { hostname: normalizeHostname(hostname, raw, hostnameOptions) }
        : {}),
      normalizerConfig,
      formatterConfig,
      raw,
    };
  }
}
