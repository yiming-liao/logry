import type { Context } from "../../types";

export const mergeContexts = <A extends Context, B extends Context>(
  baseContext?: A,
  additionalContext?: B,
): (A & B) | undefined => {
  if (!baseContext && !additionalContext) {
    return undefined;
  }
  return {
    ...(baseContext ?? {}),
    ...(additionalContext ?? {}),
  } as A & B;
};
