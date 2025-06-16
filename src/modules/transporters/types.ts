import type { RawPayload } from "@/core/logger/types";
import type { Platform } from "@/shared/types";

export interface Transporter {
  platform: Platform;
  transport(payload: RawPayload): void | Promise<void>;
}
