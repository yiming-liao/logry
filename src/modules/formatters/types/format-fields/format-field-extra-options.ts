import type { FieldKey } from "@/shared/types/log-fields";

/** Extra format options for the 'scope' field. */
type FormatScopeExtraOptions = {
  /** Show only the last scope segment if true. Default to false */
  showOnlyLatest?: boolean;
  /** Custom separator used to replace the default scope delimiter. */
  separator?: string;
};

/** Conditionally adds 'scope' field options to the given type. */
type WithScopeExtraOptions<T, K extends FieldKey> = K extends "scope"
  ? T & FormatScopeExtraOptions
  : T;

/** Extra format options for the 'level' field. */
type FormatLevelExtraOptions = {
  /** Enables alignment of log level text. */
  enableAlignment?: boolean;
};

/** Conditionally adds 'level' field options to the given type. */
type WithLevelExtraOptions<T, K extends FieldKey> = K extends "level"
  ? T & FormatLevelExtraOptions
  : T;

/** Adds field-specific options based on the log field key. */
export type WithExtraOption<T, K extends FieldKey> = WithLevelExtraOptions<
  WithScopeExtraOptions<T, K>,
  K
>;
