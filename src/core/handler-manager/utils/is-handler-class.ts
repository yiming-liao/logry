import type { HandlerClass } from "@/core/handler-manager/types";

/**
 * Checks if the given object is a HandlerClass.
 *
 * A HandlerClass is an object with a "handle" method.
 *
 * @param obj - The object to check.
 * @returns True if obj has a "handle" function, false otherwise.
 */
export const isHandlerClass = (obj: unknown): obj is HandlerClass => {
  // Return false if not an object or null
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  // Type assertion for checking "handle" method existence
  const maybeHandler = obj as Record<string, unknown>;

  // Check if "handle" is a function
  return typeof maybeHandler.handle === "function";
};
