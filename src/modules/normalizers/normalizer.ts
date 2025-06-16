import type { RawPayload } from "@/core/logger/types";
import type { BaseNormalizerConfig } from "@/modules/normalizers/normalizer-config-types";
import type { NormalizedPayload } from "@/modules/normalizers/types";
import type { Platform } from "@/shared/types";
import {
  normalizeTimestamp,
  normalizeId,
  normalizeLevel,
  normalizeScope,
  normalizeMessage,
  normalizeMeta,
  normalizeContext,
} from "@/modules/normalizers/parts";
import { normalizeHostname } from "@/modules/normalizers/parts/normalize-hostname";
import { normalizePid } from "@/modules/normalizers/parts/normalize-pid";

export class Normalizer {
  /**
   * Normalize raw log payload according to platform config.
   * Returns a standardized log object for further processing.
   * @param platform Platform type, e.g. "node" or "browser"
   * @param payload Raw log payload with all possible fields
   * @returns Normalized log payload
   */
  normalize({
    platform = "node",
    rawPayload: {
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
    },
  }: {
    platform?: Platform;
    rawPayload: RawPayload;
  }): NormalizedPayload {
    let config: BaseNormalizerConfig = {};

    if (platform === "node") {
      config = normalizerConfig.node || {};
    } else if (platform === "browser") {
      config = normalizerConfig.browser || {};
    }

    const {
      timestamp: timestampOptions,
      id: idOptions,
      level: levelOptions,
      pid: pidOptions,
      hostname: hostnameOptions,
      scope: scopeOptions,
      message: messageOptions,
      meta: metaOptions,
      context: contextOptions,
    } = config;

    return {
      timestamp: normalizeTimestamp(timestamp, timestampOptions),
      id: normalizeId(id, idOptions),
      level: normalizeLevel(level, levelOptions),
      ...(pid ? { pid: normalizePid(pid, pidOptions) } : {}),
      ...(hostname
        ? { hostname: normalizeHostname(hostname, hostnameOptions) }
        : {}),
      scope: normalizeScope(scope, scopeOptions),
      message: normalizeMessage(message, messageOptions),
      meta: normalizeMeta(meta, metaOptions),
      context: normalizeContext(context, contextOptions),
      normalizerConfig,
      formatterConfig,
      raw,
    };
  }
}
