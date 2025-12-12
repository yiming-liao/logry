import { format } from "@/pipeline/hooks/format";
import { normalize } from "@/pipeline/hooks/normalize";
import { print } from "@/pipeline/hooks/print";
import { render } from "@/pipeline/hooks/render";

// normalize
export type { NormalizeConfig } from "./normalize";

// format
export {
  type FormatConfig,
  formatTimestamp,
  formatLevel,
  formatScope,
  formatMeta,
  formatContext,
} from "./format";

// render
export { type RenderConfig, type RenderOptions, renderField } from "./render";

// print
export { type PrintConfig } from "./print";

// default hooks
export const DEFAULT_HOOKS = [normalize, format, render, print];
export const DEFAULT_HOOK_NAMES = DEFAULT_HOOKS.map((h) => h.name);
