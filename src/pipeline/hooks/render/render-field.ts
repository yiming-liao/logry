import type { RenderOptions } from "@/pipeline/hooks/render/types";
import type {
  LogContext,
  Formatted,
  Rendered,
  Raw,
} from "@/shared/types/log-context";
import { applyTextStyles } from "@/pipeline/hooks/render/utils/text-style";
import { PREFIX } from "@/shared/internal";

export function renderField<K extends keyof Raw>(
  fieldName: K,
  value: Formatted[K],
  ctx: LogContext,
  options: RenderOptions<K> = {},
): Rendered[K] {
  const { visible = true, cssStyle } = options;
  if (!visible || value === null) return { plain: null, ansi: null, cssStyle };

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

  return applyTextStyles<K>(value, ctx, options);
}
