import type { ReadyPayload } from "@/core/logger/types";
import type { Transporter } from "@/modules/transporters/types";
import { isBrowser, isNode } from "@/shared/utils/platform";

type TransportPayloadOptions = {
  transporters: Transporter[];
  readyPayload: ReadyPayload;
};

/**
 * Dispatch the ready payload to all matching transporters
 * based on the current runtime environment.
 *
 * @param transporters - List of registered transporters.
 * @param readyPayload - The log payload to be sent.
 */
export const transportPayload = ({
  transporters,
  readyPayload,
}: TransportPayloadOptions): void => {
  const platform = isNode() ? "node" : isBrowser() ? "browser" : null;

  if (!platform) {
    return;
  }

  transporters.forEach((t) => {
    if (t.platform === platform) {
      void t.transport(readyPayload);
    }
  });
};
