import { internalError } from "@/internal";

type TryCustomNormalizerOptions<TInput, TResult> = {
  label: string;
  input: TInput;
  customNormalizer?: (input: TInput) => TResult;
};

/**
 * Safely executes a custom normalizer if provided.
 *
 * @param label - Label for error reporting.
 * @param input - Input to pass into the custom normalizer.
 * @param customNormalizer - Optional custom normalizer function.
 * @returns Result of the custom normalizer or undefined on failure.
 */
export const tryCustomNormalizer = <TInput, TResult>({
  label,
  input,
  customNormalizer,
}: TryCustomNormalizerOptions<TInput, TResult>): TResult | undefined => {
  if (typeof customNormalizer === "function") {
    try {
      return customNormalizer(input);
    } catch (error) {
      internalError({ error, message: `custom ${label} normalizer failed.` });
    }
  }
};
