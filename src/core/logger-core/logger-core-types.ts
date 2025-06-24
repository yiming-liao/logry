import type { HandlerManagerConfig } from "@/core/handler-manager";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";

export type LoggerCoreOptions = {
  id?: string;
  level?: Level;
  formatterConfig?: FormatterConfig;
  normalizerConfig?: NormalizerConfig;
  handlerManagerConfig?: HandlerManagerConfig;
};

export type LevelChangeCallback = (newLevel: Level) => void;
