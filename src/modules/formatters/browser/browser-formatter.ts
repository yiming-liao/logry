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
} from "@/modules/formatters/browser/parts";

export class BrowserFormatter {
  public platform: Platform = "browser";

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
    } = formatterConfig.browser || {};

    const formattedTimestamp = formatTimestamp(
      timestamp,
      raw.timestamp,
      timestampOptions,
      raw.level, // For generating border color
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

    const cssStyles = {
      timestamp: formattedTimestamp.cssStyle,
      id: formattedId.cssStyle,
      level: formattedLevel.cssStyle,
      scope: formattedScope.cssStyle,
      message: formattedMessage.cssStyle,
      meta: formattedMeta.cssStyle,
      context: formattedContext.cssStyle,
    };

    return {
      timestamp: formattedTimestamp.timestamp,
      id: formattedId.id,
      level: formattedLevel.level,
      scope: formattedScope.scope,
      message: formattedMessage.message,
      meta: formattedMeta.meta,
      context: formattedContext.context,
      normalizerConfig: normalizerConfig,
      formatterConfig: formatterConfig,
      raw,
      cssStyles,
    };
  }
}
