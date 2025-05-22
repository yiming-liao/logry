import type { LogMeta } from "../../types";
import { formatError } from "./format-error";

/**
 * Pretty-print log meta with error support.
 */
export const printMeta = (
  meta: LogMeta,
  metaDepth: number,
  useColor: boolean,
): void => {
  let output = meta;

  // meta is a instanceof Error
  if (meta instanceof Error) {
    output = { error: formatError(meta) };
  }
  // meta is { ..., error }
  else if (
    meta &&
    typeof meta === "object" &&
    "error" in meta &&
    meta.error instanceof Error
  ) {
    const { error, ...rest } = meta;
    output = {
      ...rest,
      error: formatError(error),
    };
  }

  console.dir(output, {
    depth: metaDepth,
    colors: useColor,
  });
};
