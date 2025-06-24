import type { Level } from "@/shared/types/level";

// Raw log field types
export type RawTimestamp = number;
export type RawId = string;
export type RawLevel = Level;
export type RawScope = string[];
export type RawMessage = string;
export type RawMeta = unknown;
export type RawContext = Record<string, unknown> | undefined;
export type RawPid = number; // Node only
export type RawHostname = string; // Node only
// export type RawUserAgent = string; // Browser only (unused)

/**
 * Full set of raw log fields.
 * Fields like `pid` and `hostname` are lazily loaded at runtime (in transporters or handlers).
 */
export type RawLogFields = {
  timestamp: RawTimestamp;
  id: RawId;
  level: RawLevel;
  scope: RawScope;
  message: RawMessage;
  meta?: RawMeta;
  context?: RawContext;
  pid?: RawPid;
  hostname?: RawHostname;
};
