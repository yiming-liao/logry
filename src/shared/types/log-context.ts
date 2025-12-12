import type {
  NormalizeConfig,
  FormatConfig,
  RenderConfig,
  PrintConfig,
} from "@/pipeline";
import type { Level } from "@/shared/level";

export type LogContext = {
  raw: {
    timestamp: number;
    id?: string;
    level: Level;
    scope: string[];
    message?: string;
    meta?: Record<string, unknown> | Error; // Accept Error
    context?: Record<string, unknown>;
  };
  normalized?: {
    timestamp: number;
    id: string | null;
    level: Level;
    scope: string[];
    message: string | null;
    meta: Record<string, unknown> | null;
    context: Record<string, unknown> | null;
  };
  formatted?: {
    timestamp: string | null;
    id: string | null;
    level: string | null;
    scope: string | null;
    message: string | null;
    meta: string | null;
    context: string | null;
  };
  rendered?: {
    timestamp: { plain: string | null; ansi: string | null; cssStyle?: string };
    id: { plain: string | null; ansi: string | null; cssStyle?: string };
    level: { plain: string | null; ansi: string | null; cssStyle?: string };
    scope: { plain: string | null; ansi: string | null; cssStyle?: string };
    message: { plain: string | null; ansi: string | null; cssStyle?: string };
    meta: { plain: string | null; ansi: string | null; cssStyle?: string };
    context: { plain: string | null; ansi: string | null; cssStyle?: string };
  };
  configs: {
    normalizeConfig: NormalizeConfig;
    formatConfig: FormatConfig;
    renderConfig: RenderConfig;
    printConfig: PrintConfig;
  };
  env: { isServer: boolean; isBrowser: boolean; isPlain: boolean };
};

export type Raw = NonNullable<LogContext["raw"]>;
export type Normalized = NonNullable<LogContext["normalized"]>;
export type Formatted = NonNullable<LogContext["formatted"]>;
export type Rendered = NonNullable<LogContext["rendered"]>;
