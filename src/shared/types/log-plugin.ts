import type { BaseLogger } from "@/logger/base-logger/base-logger";
import type { LogHook } from "@/shared/types/log-hook";

export type LogPlugin = LogHook & {
  onInit?: (logger: BaseLogger) => void | Promise<void>;
  flush?: () => Promise<void>;
  dispose?: () => Promise<void>;
};
