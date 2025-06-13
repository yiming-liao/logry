import { internalError } from "@/internal";

type TryCustomNormalizerOptions<Input, Result> = {
  label: string;
  input: Input;
  customNormalizer?: (input: Input) => Result;
};

/**
 * Safely executes a custom normalizer if provided.
 *
 * @param label - Label for error reporting.
 * @param input - Input to pass into the custom normalizer.
 * @param customNormalizer - Optional custom normalizer function.
 * @returns Result of the custom normalizer or undefined on failure.
 */
export const tryCustomNormalizer = <Input, Result>({
  label,
  input,
  customNormalizer,
}: TryCustomNormalizerOptions<Input, Result>): Result | undefined => {
  if (typeof customNormalizer === "function") {
    try {
      return customNormalizer(input);
    } catch (error) {
      internalError({ error, message: `custom ${label} normalizer failed.` });
    }
  }
};
