import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { isBrowser } from "@/shared/utils/is-browser";
import { isEdge } from "@/shared/utils/is-edge";
import { isNode } from "@/shared/utils/is-node";

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
  let platform: Platform | null = null;

  if (isNode()) {
    platform = "node";
  } else if (isBrowser()) {
    platform = "browser";
  } else if (isEdge()) {
    platform = "edge";
  }

  if (!platform) {
    return;
  }

  for (const transporter of transporters) {
    if (transporter.platform === platform) {
      void transporter.transport(rawPayload);
    }
  }
};
