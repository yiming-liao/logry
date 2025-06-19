import type { RawPayload } from "@/core/logger/types";

/**
 * Append process ID and hostname to a RawPayload.
 *
 * @param getOsFn - Async function returning the 'os' module or undefined
 * @param rawPayload - Original logging payload
 * @returns New payload with pid and hostname fields
 */
export const appendProcessParts = async (
  getOsFn: () => Promise<typeof import("node:os") | undefined>,
  rawPayload: RawPayload,
): Promise<RawPayload> => {
  const os = await getOsFn();

  // Use process.pid if available, otherwise fallback to 0
  const pid = typeof process?.pid === "number" ? process.pid : 0;

  // Use os.hostname() if available, otherwise fallback to "unknown-host"
  const hostname =
    typeof os?.hostname === "function" ? os.hostname() : "unknown-host";

  return {
    ...rawPayload,
    pid,
    hostname,
    raw: {
      ...rawPayload.raw,
      pid,
      hostname,
    },
  };
};
