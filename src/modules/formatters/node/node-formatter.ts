import type { NodeFormattedPayload } from "@/modules/formatters/types";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Platform } from "@/shared/types";
import {
  formatTimestamp,
  formatId,
  formatLevel,
  formatPid,
  formatHostname,
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
   * @returns {NodeFormattedPayload} Formatted log parts
   */
  format({
    timestamp,
    id,
    level,
    pid = 0,
    hostname = "",
    scope,
    message,
    meta,
    context,
    normalizerConfig,
    formatterConfig,
    raw,
  }: NormalizedPayload): NodeFormattedPayload {
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
    } = formatterConfig.node || {};

    const {
      timestamp: formattedTimestamp,
      withAnsiStyle: timestampWithAnsiStyle,
    } = formatTimestamp(timestamp, raw.timestamp, timestampOptions);
    const { id: formattedId, withAnsiStyle: idWithAnsiStyle } = formatId(
      id,
      raw.id,
      idOptions,
    );
    const { level: formattedLevel, withAnsiStyle: levelWithAnsiStyle } =
      formatLevel(level, raw.level, levelOptions);
    const { pid: formattedPid, withAnsiStyle: pidWithAnsiStyle } = formatPid(
      pid,
      raw.pid ?? 0,
      pidOptions,
    );
    const {
      hostname: formattedHostname,
      withAnsiStyle: hostnameWithAnsiStyle,
    } = formatHostname(hostname, raw.hostname ?? "", hostnameOptions);
    const { scope: formattedScope, withAnsiStyle: scopeWithAnsiStyle } =
      formatScope(scope, raw.scope, scopeOptions);
    const { message: formattedMessage, withAnsiStyle: messageWithAnsiStyle } =
      formatMessage(message, raw.message, messageOptions);
    const { meta: formattedMeta, withAnsiStyle: metaWithAnsiStyle } =
      formatMeta(meta, metaOptions);
    const { context: formattedContext, withAnsiStyle: contextWithAnsiStyle } =
      formatContext(context, contextOptions);

    const withAnsiStyle = {
      timestamp: timestampWithAnsiStyle,
      id: idWithAnsiStyle,
      level: levelWithAnsiStyle,
      pid: pidWithAnsiStyle,
      hostname: hostnameWithAnsiStyle,
      scope: scopeWithAnsiStyle,
      message: messageWithAnsiStyle,
      meta: metaWithAnsiStyle,
      context: contextWithAnsiStyle,
    };

    return {
      timestamp: formattedTimestamp,
      id: formattedId,
      level: formattedLevel,
      pid: formattedPid,
      hostname: formattedHostname,
      scope: formattedScope,
      message: formattedMessage,
      meta: formattedMeta,
      context: formattedContext,
      normalizerConfig,
      formatterConfig,
      raw,
      withAnsiStyle,
    };
  }
}
