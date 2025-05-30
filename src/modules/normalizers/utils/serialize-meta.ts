import { serializeError } from "@/modules/normalizers/utils/serialize-error";

/**
 * Serialize meta object by converting Error instances into serialized error objects.
 * @param {unknown} meta - The metadata to serialize.
 * @param {number} stackLines - Number of stack trace lines to keep for Error instances.
 * @returns {object} - Serialized meta object or undefined if meta is falsy.
 */
export const serializeMeta = (
  meta: unknown,
  stackLines: number,
): Record<string, unknown> | undefined => {
  // If meta itself is an Error instance, wrap it in an object with serialized error
  if (meta instanceof Error) {
    meta = { error: serializeError(meta, stackLines) };
  }

  // If meta is an object and has an 'error' property that's an Error
  if (
    typeof meta === "object" &&
    meta !== null &&
    "error" in meta &&
    (meta as { error: unknown }).error instanceof Error
  ) {
    const { error, ...rest } = meta;
    meta = {
      ...rest,
      error: serializeError(error as Error, stackLines),
    };
  }

  // If meta is an object, return it as is
  if (typeof meta === "object" && meta !== null && !Array.isArray(meta)) {
    return meta as Record<string, unknown>;
  }

  // If meta is not an object, make it a object with a 'value' property
  return { value: meta };
};
