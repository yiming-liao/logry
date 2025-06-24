import type { Platform } from "@/shared/types";
import type {
  FormattedPayload,
  NormalizedPayload,
} from "@/shared/types/log-payload";

/**
 * Formatter interface responsible for converting
 * a normalized log payload into a platform-specific formatted output.
 */
export interface Formatter {
  platform: Platform;
  format(payload: NormalizedPayload): FormattedPayload;
}
