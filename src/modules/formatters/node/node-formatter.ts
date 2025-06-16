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
      withAnsiColor: timestampWithAnsiColor,
    } = formatTimestamp(timestamp, raw.timestamp, timestampOptions);
    const { id: formattedId, withAnsiColor: idWithAnsiColor } = formatId(
      id,
      raw.id,
      idOptions,
    );
    const { level: formattedLevel, withAnsiColor: levelWithAnsiColor } =
      formatLevel(level, raw.level, levelOptions);
    const { pid: formattedPid, withAnsiColor: pidWithAnsiColor } = formatPid(
      pid,
      raw.pid ?? 0,
      pidOptions,
    );
    const {
      hostname: formattedHostname,
      withAnsiColor: hostnameWithAnsiColor,
    } = formatHostname(hostname, raw.hostname ?? "", hostnameOptions);
    const { scope: formattedScope, withAnsiColor: scopeWithAnsiColor } =
      formatScope(scope, raw.scope, scopeOptions);
    const { message: formattedMessage, withAnsiColor: messageWithAnsiColor } =
      formatMessage(message, raw.message, messageOptions);
    const { meta: formattedMeta, withAnsiColor: metaWithAnsiColor } =
      formatMeta(meta, metaOptions);
    const { context: formattedContext, withAnsiColor: contextWithAnsiColor } =
      formatContext(context, contextOptions);

    const withAnsiColor = {
      timestamp: timestampWithAnsiColor,
      id: idWithAnsiColor,
      level: levelWithAnsiColor,
      pid: pidWithAnsiColor,
      hostname: hostnameWithAnsiColor,
      scope: scopeWithAnsiColor,
      message: messageWithAnsiColor,
      meta: metaWithAnsiColor,
      context: contextWithAnsiColor,
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
      withAnsiColor,
    };
  }
}
