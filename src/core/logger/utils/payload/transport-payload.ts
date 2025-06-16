import type { RawPayload } from "@/core/logger/types";
import type { Transporter } from "@/modules/transporters/types";
import { isBrowser, isNode } from "@/shared/utils/platform";

type TransportPayloadOptions = {
  transporters: Transporter[];
  rawPayload: RawPayload;
};

/**
 * Dispatch the ready payload to all matching transporters
 * based on the current runtime environment.
 *
 * @param transporters - List of registered transporters.
 * @param rawPayload - The log payload to be sent.
 */
export const transportPayload = ({
  transporters,
  rawPayload,
}: TransportPayloadOptions): void => {
  const platform = isNode() ? "node" : isBrowser() ? "browser" : null;

  if (!platform) {
    return;
  }

  transporters.forEach((t) => {
    if (t.platform === platform) {
      void t.transport(rawPayload);
    }
  });
};
