/**
 * Adds optional prefix and suffix around a string.
 *
 * @param input - The string to wrap.
 * @param prefix - Optional string to prepend.
 * @param suffix - Optional string to append.
 * @returns Wrapped string, or empty string if input is empty.
 */
export const addPrefixAndSuffix = (
  input: string,
  prefix?: string,
  suffix?: string,
): string => {
  if (!input) {
    return "";
  }

  return `${prefix ?? ""}${input}${suffix ?? ""}`;
};
