import type { LogContext, Normalized, Raw } from "@/shared/types/log-context";

export type BaseNormalizeOptions<Input = unknown, Output = unknown> = {
  customNormalizer?: (value: Input, ctx: LogContext) => Output;
};

/** Configuration for the `normalize` hook. */
export type NormalizeConfig = {
  meta?: BaseNormalizeOptions<Raw["meta"], Normalized["meta"]> & {
    /** Number of stack trace lines to keep when the meta value is an Error. */
    errorStackLines?: number;
  };
};
