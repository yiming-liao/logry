import type { ReadyPayload } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters";
import type { BrowserFormatter } from "@/modules/formatters/browser";
import type { NodeFormatter } from "@/modules/formatters/node";
import type { NormalizedPayload } from "@/modules/normalizers";
import { isBrowser, isNode } from "@/shared/utils/platform";

type FormatPayloadOptions = {
  normalizedPayload: NormalizedPayload;
  formatterConfig: FormatterConfig;
  nodeFormatter: NodeFormatter;
  browserFormatter: BrowserFormatter;
};

/**
 * Format a normalized payload depending on the runtime environment.
 * Uses node or browser formatter if enabled in config.
 */
export const formatPayload = ({
  normalizedPayload,
  formatterConfig,
  nodeFormatter,
  browserFormatter,
}: FormatPayloadOptions): ReadyPayload => {
  let readyPayload: ReadyPayload = normalizedPayload;
  const { node: nodeConfig = {}, browser: browserConfig = {} } =
    formatterConfig;

  // Prefer Node formatter if running in Node and it's enabled
  if (isNode() && !nodeConfig.disabled) {
    readyPayload = nodeFormatter.format(normalizedPayload);
  }

  // Prefer Browser formatter if running in Browser and it's enabled
  if (isBrowser() && !browserConfig.disabled) {
    readyPayload = browserFormatter.format(normalizedPayload);
  }

  return readyPayload;
};
