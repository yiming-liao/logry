import type { NodeFormatterConfig } from "@/modules/formatters/types";
import type {
  FieldKey,
  FormattedStructuredField,
} from "@/shared/types/log-fields";
import type { FormattedPayload } from "@/shared/types/log-payload";

/**
 * Returns formatted log fields with or without ANSI styles.
 *
 * @param payload - Formatted log data with optional styled fields.
 * @param nodeConfig - Per-field formatter config for ANSI output.
 * @param useAnsiStyle - Global toggle for ANSI styling (default: true).
 * @returns A map of field keys to formatted string or structured data.
 */
export function extractStyledFields(
  payload: FormattedPayload,
  nodeConfig: NodeFormatterConfig,
  useAnsiStyle?: boolean,
): Record<FieldKey, string | FormattedStructuredField | undefined> {
  const result = {} as Record<
    FieldKey,
    string | FormattedStructuredField | undefined
  >;

  const fields: FieldKey[] = [
    "timestamp",
    "id",
    "level",
    "scope",
    "message",
    "meta",
    "context",
    "pid",
    "hostname",
  ];

  for (const field of fields) {
    const useAnsi = nodeConfig[field]?.useAnsiStyle ?? true;
    const plain = payload[field];
    const styled = payload.withAnsiStyle?.[field];

    if (!useAnsiStyle) {
      result[field] = plain;
      continue;
    }

    result[field] = useAnsi && styled ? styled : plain;
  }

  return result;
}
