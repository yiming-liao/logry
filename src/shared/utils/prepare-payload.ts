import type {
  RawContext,
  RawHostname,
  RawId,
  RawLevel,
  RawMessage,
  RawMeta,
  RawPayload,
  RawPid,
  RawScope,
  RawTimestamp,
} from "@/core/logger";
import type {
  NormalizedPayload,
  NormalizedTimestamp,
  NormalizedId,
  NormalizedLevel,
  NormalizedHostname,
  NormalizedPid,
  NormalizedScope,
  NormalizedMessage,
  NormalizedMeta,
  NormalizedContext,
  Normalizer,
} from "@/modules/normalizers";
import type { Platform } from "@/shared/types";
import { appendProcessParts } from "@/shared/utils/append-process-parts";
import { getOs } from "@/shared/utils/lazy-modules";
import { isNode } from "@/shared/utils/platform";

type FilteredPayload = {
  timestamp: RawTimestamp | NormalizedTimestamp;
  id: RawId | NormalizedId;
  level: RawLevel | NormalizedLevel;
  pid: RawPid | NormalizedPid;
  hostname: RawHostname | NormalizedHostname;
  scope: RawScope | NormalizedScope;
  message: RawMessage | NormalizedMessage;
  meta: RawMeta | NormalizedMeta;
  context: RawContext | NormalizedContext;
};

type PreparePayloadOptions<U extends boolean = true> = {
  platform?: Platform;
  rawPayload: RawPayload;
  useNormalizer?: U;
  normalizer: Normalizer;
  injectProcessParts?: boolean;
};

/**
 * Prepares the payload by optionally appending process info and normalizing it.
 * Returns both the full payload and a filtered subset.
 */
export const preparePayload = async <U extends boolean = true>({
  platform = "node",
  rawPayload,
  useNormalizer = true as U,
  normalizer,
  injectProcessParts = true,
}: PreparePayloadOptions<U>): Promise<{
  payload: U extends true ? NormalizedPayload : RawPayload;
  filteredPayload: FilteredPayload;
}> => {
  let preparedPayload: RawPayload | NormalizedPayload = rawPayload;

  if (injectProcessParts && isNode()) {
    preparedPayload = await appendProcessParts(getOs, preparedPayload);
  }

  if (useNormalizer) {
    preparedPayload = normalizer.normalize({
      platform,
      rawPayload: preparedPayload,
    });
  }

  const filteredPayload = {
    timestamp: preparedPayload.timestamp,
    id: preparedPayload.id,
    level: preparedPayload.level,
    pid: Number(preparedPayload.pid ?? 0),
    hostname: preparedPayload.hostname ?? "",
    scope: preparedPayload.scope,
    message: preparedPayload.message,
    meta: preparedPayload.meta,
    context: preparedPayload.context,
  };

  return {
    payload: preparedPayload as U extends true ? NormalizedPayload : RawPayload,
    filteredPayload,
  };
};
