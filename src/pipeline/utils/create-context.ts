import type {
  NormalizeConfig,
  FormatConfig,
  RenderConfig,
  PrintConfig,
} from "@/pipeline";
import type { LogContext } from "@/shared/types/log-context";
import { getEnv } from "@/pipeline/utils/platform";
import { LEVEL_CONFIG, type Level } from "@/shared/level";

interface CreateContextInput {
  timestamp?: number;
  id?: string;
  level: Level;
  scope: string[];
  message?: string;
  meta?: Record<string, unknown> | Error;
  context?: Record<string, unknown>;
  normalizeConfig: NormalizeConfig;
  formatConfig: FormatConfig;
  renderConfig: RenderConfig;
  printConfig: PrintConfig;
}

/**
 * Creates a LogContext object from raw log input and configuration.
 */
export const createContext = ({
  timestamp = Date.now(),
  id,
  level,
  scope,
  message,
  meta,
  context,
  normalizeConfig,
  formatConfig,
  renderConfig,
  printConfig,
}: CreateContextInput): LogContext => {
  const levelConfig = LEVEL_CONFIG[level];

  return {
    raw: {
      timestamp,
      id,
      level,
      scope,
      message,
      meta,
      context,
    },
    configs: {
      normalizeConfig,
      formatConfig,
      renderConfig: {
        ...renderConfig,
        level: {
          ansiStyle: renderConfig.level?.ansiStyle || levelConfig.ansiStyle,
          cssStyle: renderConfig.level?.cssStyle ?? levelConfig.cssStyle,
          ...renderConfig.level,
        },
      },
      printConfig,
    },
    env: getEnv(),
  };
};
