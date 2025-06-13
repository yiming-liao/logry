import { internalError } from "@/internal";

type TryCustomFormatterOptions<Input, Result> = {
  label: string;
  input: Input;
  customFormatter: ((input: Input) => Result) | undefined;
};

/**
 * Safely executes a custom formatter if provided.
 *
 * @param label - Label for error reporting.
 * @param input - Input to pass into the custom formatter.
 * @param customFormatter - Optional custom formatter function.
 * @returns Result of the custom formatter or undefined on failure.
 */
export function tryCustomFormatter<Input, Result>({
  label,
  input,
  customFormatter,
}: TryCustomFormatterOptions<Input, Result>): Result | undefined {
  if (typeof customFormatter === "function") {
    try {
      return customFormatter(input);
    } catch (error) {
      internalError({ error, message: `custom ${label} formatter failed.` });
    }
  }
}
