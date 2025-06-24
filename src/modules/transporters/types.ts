import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";

export interface Transporter {
  platform: Platform;
  transport(payload: RawPayload): void | Promise<void>;
}
