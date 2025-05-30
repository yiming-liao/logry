import { internalError } from "@/internal";

type TryCustomFormatterOptions<TInput, TResult> = {
  label: string;
  input: TInput;
  customFormatter: ((input: TInput) => TResult) | undefined;
};

/**
 * Safely executes a custom formatter if provided.
 *
 * @param label - Label for error reporting.
 * @param input - Input to pass into the custom formatter.
 * @param customFormatter - Optional custom formatter function.
 * @returns Result of the custom formatter or undefined on failure.
 */
export function tryCustomFormatter<TInput, TResult>({
  label,
  input,
  customFormatter,
}: TryCustomFormatterOptions<TInput, TResult>): TResult | undefined {
  if (typeof customFormatter === "function") {
    try {
      return customFormatter(input);
    } catch (error) {
      internalError({ error, message: `custom ${label} formatter failed.` });
    }
  }
}
