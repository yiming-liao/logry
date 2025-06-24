import { internalError } from "@/internal";

type TryCustomFormatterOptions<Input, Result> = {
  fieldKey: string;
  input: Input;
  customFormatter: ((input: Input) => Result) | undefined;
};

/**
 * Safely executes a custom formatter if provided.
 *
 * @param fieldKey - Field key for error reporting.
 * @param input - Input to pass into the custom formatter.
 * @param customFormatter - Optional custom formatter function.
 * @returns Result of the custom formatter or undefined on failure.
 */
export function tryCustomFormatter<Input, Result>({
  fieldKey,
  input,
  customFormatter,
}: TryCustomFormatterOptions<Input, Result>): Result | undefined {
  if (typeof customFormatter === "function") {
    try {
      return customFormatter(input);
    } catch (error) {
      internalError({ error, message: `custom ${fieldKey} formatter failed.` });
    }
  }
}
