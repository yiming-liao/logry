import type { BaseLogger } from "@/logger/base-logger";
import type { LogHook } from "@/shared/types/log-hook";
import type { LogPlugin } from "@/shared/types/log-plugin";
import { DEFAULT_HOOK_NAMES } from "@/pipeline/hooks";
import { PREFIX } from "@/shared/internal";

/** Returns true if the given object is a plugin rather than a hook. */
export const isPlugin = (p: LogHook | LogPlugin): p is LogPlugin =>
  "run" in p || "onInit" in p || "flush" in p || "dispose" in p;

/** Runs a plugin’s initialization lifecycle. */
export const init = async (plugin: LogHook | LogPlugin, logger: BaseLogger) => {
  if (isPlugin(plugin) && plugin.onInit) {
    try {
      await plugin.onInit(logger);
    } catch (error) {
      console.error(
        `${PREFIX} Plugin "${plugin.name ?? "(anonymous)"}" init error:`,
        error,
      );
    }
  }
};

/** Executes the `flush` method of all plugins in sequence. */
export const flush = async (hooks: (LogHook | LogPlugin)[]) => {
  for (const plugin of hooks) {
    if (isPlugin(plugin) && plugin.flush) {
      try {
        await plugin.flush();
      } catch (error) {
        console.error(
          `${PREFIX} Plugin "${plugin.name ?? "(anonymous)"}" flush error:`,
          error,
        );
      }
    }
  }
};

/** Executes the `dispose` method of all plugins. */
export const dispose = async (hooks: (LogHook | LogPlugin)[]) => {
  for (const plugin of hooks) {
    if (isPlugin(plugin) && plugin.dispose) {
      try {
        await plugin.dispose();
      } catch (error) {
        console.error(
          `${PREFIX} Plugin "${plugin.name ?? "(anonymous)"}" dispose error:`,
          error,
        );
      }
    }
  }
};

/** Removes a plugin by name and invokes its `dispose` method if provided. */
export const remove = async (name: string, hooks: (LogHook | LogPlugin)[]) => {
  if (DEFAULT_HOOK_NAMES.includes(name)) return; // Default hooks cannot be removed.
  for (const p of hooks) {
    if (p.name === name && isPlugin(p) && p.dispose) await p.dispose();
  }
  hooks.splice(0, hooks.length, ...hooks.filter((p) => p.name !== name));
};
