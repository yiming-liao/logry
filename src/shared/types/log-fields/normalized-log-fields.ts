export type NormalizedStructuredField = Record<string, unknown> | undefined;

// Normalized log field types
export type NormalizedTimestamp = string | number;
export type NormalizedId = string;
export type NormalizedLevel = string;
export type NormalizedScope = string;
export type NormalizedMessage = string;
export type NormalizedMeta = NormalizedStructuredField;
export type NormalizedContext = NormalizedStructuredField;
export type NormalizedPid = number; // Node only
export type NormalizedHostname = string; // Node only
