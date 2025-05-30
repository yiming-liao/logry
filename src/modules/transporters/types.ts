import type { ReadyPayload } from "@/core/logger/types";
import type { Platform } from "@/shared/types";

export interface Transporter {
  platform: Platform;
  transport(payload: ReadyPayload): void | Promise<void>;
}
