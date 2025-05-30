import type { FormattedPayload } from "@/modules/formatters/types";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Platform } from "@/shared/types";
import {
  formatTimestamp,
  formatId,
  formatLevel,
  formatScope,
  formatMessage,
  formatMeta,
  formatContext,
} from "@/modules/formatters/node/parts";

export class NodeFormatter {
  public platform: Platform = "node";

  /**
   * Format normalized log payload into formatted output
   * @param {NormalizedPayload} payload - Input normalized log data
   * @returns {FormattedPayload} Formatted log parts
   */
  format({
    timestamp,
    id,
    level,
    scope,
    message,
    meta,
    context,
    normalizerConfig,
    formatterConfig,
    raw,
  }: NormalizedPayload): FormattedPayload {
    const {
      timestamp: timestampOptions,
      id: idOptions,
      level: levelOptions,
      scope: scopeOptions,
      message: messageOptions,
      meta: metaOptions,
      context: contextOptions,
    } = formatterConfig.node || {};

    const formattedTimestamp = formatTimestamp(
      timestamp,
      raw.timestamp,
      timestampOptions,
    );
    const formattedId = formatId(id, raw.id, idOptions);
    const formattedLevel = formatLevel(level, raw.level, levelOptions);
    const formattedScope = formatScope(scope, raw.scope, scopeOptions);
    const formattedMessage = formatMessage(
      message,
      raw.message,
      messageOptions,
    );
    const formattedMeta = formatMeta(meta, metaOptions);
    const formattedContext = formatContext(context, contextOptions);

    return {
      timestamp: formattedTimestamp,
      id: formattedId,
      level: formattedLevel,
      scope: formattedScope,
      message: formattedMessage,
      meta: formattedMeta,
      context: formattedContext,
      normalizerConfig,
      formatterConfig,
      raw,
    };
  }
}
