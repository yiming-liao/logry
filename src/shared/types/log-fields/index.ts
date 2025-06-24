import type { RawLogFields } from "@/shared/types/log-fields/raw-log-fields";

/** Snapshot of raw log fields with meta/context presence flags */
export type SnapshotLogFields = Omit<RawLogFields, "meta" | "context"> & {
  hasMeta: boolean;
  hasContext: boolean;
};

/**
 * Key type for each log field.
 * This type is aliased as `K` in generic parameters.
 */
export type FieldKey = keyof RawLogFields;

export type {
  RawTimestamp,
  RawId,
  RawLevel,
  RawScope,
  RawMessage,
  RawMeta,
  RawContext,
  RawPid,
  RawHostname,
  RawLogFields,
} from "./raw-log-fields";

export type {
  NormalizedStructuredField,
  NormalizedTimestamp,
  NormalizedId,
  NormalizedLevel,
  NormalizedScope,
  NormalizedMessage,
  NormalizedMeta,
  NormalizedContext,
  NormalizedPid,
  NormalizedHostname,
} from "./normalized-log-fields";

export type {
  FormattedStructuredField,
  FormattedTimestamp,
  FormattedId,
  FormattedLevel,
  FormattedScope,
  FormattedMessage,
  FormattedMeta,
  FormattedContext,
  FormattedPid,
  FormattedHostname,
} from "./formatted-log-fields";
