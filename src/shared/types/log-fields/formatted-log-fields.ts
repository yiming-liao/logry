export type FormattedStructuredField = Record<string, unknown> | string;

// Formatted log field types
export type FormattedTimestamp = string;
export type FormattedId = string;
export type FormattedLevel = string;
export type FormattedScope = string;
export type FormattedMessage = string;
export type FormattedMeta = FormattedStructuredField;
export type FormattedContext = FormattedStructuredField;
export type FormattedPid = string; // Node only
export type FormattedHostname = string; // Node only
