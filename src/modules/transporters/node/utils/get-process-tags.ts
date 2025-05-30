import type { ReadyPayload } from "@/core/logger/types";
import type { FormattedPid } from "@/modules/formatters";
import { formatHostname } from "@/modules/formatters/node/parts/format-hostname";
import { formatPid } from "@/modules/formatters/node/parts/format-pid";

/**
 * Returns formatted process ID and hostname.
 *
 * @param getOsFn - Function that resolves to the OS module.
 * @param payload - Formatting configuration payload.
 * @returns Formatted pid and hostname.
 */
export const getProcessTags = async (
  getOsFn: () => Promise<typeof import("os") | undefined>,
  payload?: ReadyPayload,
): Promise<{ pid: FormattedPid; hostname: string }> => {
  const os = await getOsFn();

  let pid: string | number = typeof process?.pid === "number" ? process.pid : 0;

  let hostname =
    typeof os?.hostname === "function" ? os.hostname() : "unknown-host";

  if (!payload?.formatterConfig.node?.disabled) {
    pid = formatPid(String(pid), pid, payload?.formatterConfig.node?.pid);

    hostname = formatHostname(
      hostname,
      hostname,
      payload?.formatterConfig.node?.hostname,
    );
  }

  return { pid: String(pid), hostname };
};
