import type { NodeFormatterConfig } from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type { NormalizedPayload } from "@/shared/types/log-payload";
import type { FormattedPayload } from "@/shared/types/log-payload";
import {
  formatTimestamp,
  formatId,
  formatLevel,
  formatScope,
  formatMessage,
  formatMeta,
  formatContext,
} from "@/modules/formatters/fields";
import { formatHostname } from "@/modules/formatters/fields/format-hostname";
import { formatPid } from "@/modules/formatters/fields/format-pid";

export class Formatter {
  format<P extends Platform>(
    platform: P,
    {
      timestamp,
      id,
      level,
      scope,
      message,
      meta,
      context,
      pid,
      hostname,
      normalizerConfig,
      formatterConfig,
      raw,
    }: NormalizedPayload,
  ): FormattedPayload {
    const {
      timestamp: timestampOptions,
      id: idOptions,
      level: levelOptions,
      scope: scopeOptions,
      message: messageOptions,
      meta: metaOptions,
      context: contextOptions,
    } = formatterConfig[platform] || {};

    const nodeConfig = formatterConfig[platform] as
      | NodeFormatterConfig
      | undefined;

    // Node-specific field options
    const pidOptions = platform === "node" ? nodeConfig?.pid : undefined;
    const hostnameOptions =
      platform === "node" ? nodeConfig?.hostname : undefined;

    const {
      fieldValue: formattedTimestamp,
      withAnsiStyle: timestampWithAnsiStyle,
      cssStyle: timestampCssStyle,
    } = formatTimestamp(platform, timestamp, raw, timestampOptions);
    const {
      fieldValue: formattedId,
      withAnsiStyle: idWithAnsiStyle,
      cssStyle: idCssStyle,
    } = formatId(platform, id, raw, idOptions);
    const {
      fieldValue: formattedLevel,
      withAnsiStyle: levelWithAnsiStyle,
      cssStyle: levelCssStyle,
    } = formatLevel(platform, level, raw, levelOptions);
    const {
      fieldValue: formattedScope,
      withAnsiStyle: scopeWithAnsiStyle,
      cssStyle: scopeCssStyle,
    } = formatScope(platform, scope, raw, scopeOptions);
    const {
      fieldValue: formattedMessage,
      withAnsiStyle: messageWithAnsiStyle,
      cssStyle: messageCssStyle,
    } = formatMessage(platform, message, raw, messageOptions);
    const {
      fieldValue: formattedMeta,
      withAnsiStyle: metaWithAnsiStyle,
      cssStyle: metaCssStyle,
    } = formatMeta(platform, meta, raw, metaOptions);
    const {
      fieldValue: formattedContext,
      withAnsiStyle: contextWithAnsiStyle,
      cssStyle: contextCssStyle,
    } = formatContext(platform, context, raw, contextOptions);

    // Node-specific fields
    const { fieldValue: formattedPid, withAnsiStyle: pidWithAnsiStyle } =
      platform === "node"
        ? formatPid(platform, pid, raw, pidOptions)
        : { fieldValue: undefined, withAnsiStyle: undefined };
    const {
      fieldValue: formattedHostname,
      withAnsiStyle: hostnameWithAnsiStyle,
    } =
      platform === "node"
        ? formatHostname(platform, hostname, raw, hostnameOptions)
        : { fieldValue: undefined, withAnsiStyle: undefined };

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

    const cssStyles = {
      timestamp: timestampCssStyle,
      id: idCssStyle,
      level: levelCssStyle,
      scope: scopeCssStyle,
      message: messageCssStyle,
      meta: metaCssStyle,
      context: contextCssStyle,
    };

    return {
      timestamp: formattedTimestamp,
      id: formattedId,
      level: formattedLevel,
      scope: formattedScope,
      message: formattedMessage,
      meta: formattedMeta,
      context: formattedContext,
      pid: formattedPid,
      hostname: formattedHostname,
      normalizerConfig,
      formatterConfig,
      raw,
      withAnsiStyle,
      cssStyles,
    };
  }
}
