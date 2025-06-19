import { lazyImport } from "@/shared/utils/lazy-import";

/** Lazily import Node.js 'os' module. */
export const getOs = lazyImport(() => import("node:os"));

/** Interface for Node.js 'util' module with inspect function. */
export interface UtilModule {
  inspect(obj: unknown, options?: InspectOptions): string;
}

/**
 * Options for Node.js util.inspect.
 * See: https://nodejs.org/api/util.html#utilinspectobject-options
 */
export interface InspectOptions {
  showHidden?: boolean | undefined;
  depth?: number | null | undefined;
  colors?: boolean | undefined;
  customInspect?: boolean | undefined;
  showProxy?: boolean | undefined;
  maxArrayLength?: number | null | undefined;
  maxStringLength?: number | null | undefined;
  breakLength?: number | undefined;
  compact?: boolean | number | undefined;
  sorted?: boolean | ((a: string, b: string) => number) | undefined;
  getters?: "get" | "set" | boolean | undefined;
  numericSeparator?: boolean | undefined;
}

/** Lazily import Node.js 'util.inspect'. */
export const getUtil: () => Promise<UtilModule | undefined> = lazyImport(() =>
  import("node:util").then((mod) => ({ inspect: mod.inspect })),
);
