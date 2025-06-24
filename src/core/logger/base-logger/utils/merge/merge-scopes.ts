/**
 * Merges base scope with additional scope.
 *
 * @param baseScope - Base scope list.
 * @param additionalScope - Extra scope(s) to append.
 * @returns Combined scope array.
 */
export const mergeScopes = (
  baseScope: string[] = [],
  additionalScope?: string | string[],
): string[] => {
  if (additionalScope === undefined) {
    return baseScope;
  }

  return Array.isArray(additionalScope)
    ? [...baseScope, ...additionalScope]
    : [...baseScope, additionalScope];
};
