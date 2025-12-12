import type { PluginLoggerConstructorOptions } from "@/logger/plugin-logger/types";
import type { LogHook } from "@/shared/types/log-hook";
import type { LogPlugin } from "@/shared/types/log-plugin";
import { BaseLogger } from "@/logger/base-logger/base-logger";
import { PipelineManager } from "@/logger/pipeline-manager/pipeline-manager";

export class PluginLogger extends BaseLogger {
  /** Manages all pipeline hooks and plugin lifecycles. */
  protected pluginManager: PipelineManager;

  constructor(options?: PluginLoggerConstructorOptions) {
    super(options);
    this.pluginManager = new PipelineManager(this);
  }

  /** Creates a child logger while inheriting and cloning the plugin pipeline. */
  child(options = {}) {
    const child = super.child(options);
    child["pluginManager"] = this.pluginManager.clone(child);
    return child;
  }

  /** Registers a new plugin or hook into the pipeline. */
  use(plugin: LogHook | LogPlugin) {
    return this.pluginManager.use(plugin);
  }

  /** Flushes all plugins that expose a `flush()` lifecycle. */
  flush() {
    return this.pluginManager.flush();
  }

  /** Disposes all plugins that expose a `dispose()` lifecycle. */
  dispose() {
    return this.pluginManager.dispose();
  }

  /** Removes a plugin by name and runs its cleanup logic. */
  remove(name: string) {
    return this.pluginManager.remove(name);
  }

  /** Outputs a debug overview of the active pipeline. */
  debugHooks() {
    return this.pluginManager.debug();
  }
}
