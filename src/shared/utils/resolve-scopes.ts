/**
 * Converts a string or string[] into an array.
 * Undefined becomes an empty array.
 */
const toArray = (v?: string[] | string): string[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

/**
 * Merges two scope inputs (string or string[]) into a single flat array.
 */
export const resolveScopes = (
  baseScope?: string[] | string,
  newScope?: string[] | string,
): string[] => {
  const base = toArray(baseScope);
  const next = toArray(newScope);
  return [...base, ...next];
};
