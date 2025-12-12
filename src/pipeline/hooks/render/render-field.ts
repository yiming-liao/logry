import type { RenderConfig } from "@/pipeline/hooks/render/types";
import type {
  LogContext,
  Formatted,
  Rendered,
} from "@/shared/types/log-context";
import { applyTextStyles } from "@/pipeline/hooks/render/utils/text-style";
import { PREFIX } from "@/shared/internal";

export function renderField<Field extends keyof Rendered>(
  fieldName: Field,
  value: Formatted[Field],
  ctx: LogContext,
  options: RenderConfig[Field] = {},
): Rendered[Field] {
  if (value === null)
    return { plain: null, ansi: null, cssStyle: options.cssStyle };

  const { customRenderer } = options;
  if (typeof customRenderer === "function") {
    try {
      const result = customRenderer(value, ctx);
      if (result !== undefined) return result;
    } catch (error) {
      throw new Error(
        `${PREFIX} custom "${String(fieldName)}" renderer failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  return applyTextStyles<Field>(value, ctx, options);
}
