export const mergeScopes = (
  baseScope: string[],
  additionalScope?: string | string[],
): string[] => {
  if (additionalScope === undefined) {
    // No additional scope, return base as-is
    return baseScope;
  }

  if (typeof additionalScope === "string") {
    return [...baseScope, additionalScope];
  } else {
    return [...baseScope, ...additionalScope];
  }
};
