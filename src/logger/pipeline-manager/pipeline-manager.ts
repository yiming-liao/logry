import type { BaseLogger } from "@/logger/base-logger/base-logger";
import type { LogHook } from "@/shared/types/log-hook";
import type { LogPlugin } from "@/shared/types/log-plugin";
import { rura } from "rura";
import { DEFAULT_HOOKS } from "@/pipeline/hooks";
import { dispose, flush, init, remove } from "./utils";

export class PipelineManager {
  /** Active hook chain, starting with the default core hooks. */
  private hooks: (LogHook | LogPlugin)[] = [...DEFAULT_HOOKS];

  constructor(
    private logger: BaseLogger,
    private pipeline = rura,
  ) {}

  /** Returns the current hook list in execution order. */
  public getHooks(): (LogHook | LogPlugin)[] {
    return this.hooks;
  }

  /** Creates a shallow clone of this manager for a new logger */
  public clone(newLogger: BaseLogger): PipelineManager {
    const cloned = new PipelineManager(newLogger);
    cloned.hooks = [...this.hooks];
    return cloned;
  }

  /** Sorts hooks by their `order` value. */
  private sort(): void {
    this.hooks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  /** Adds a new hook or plugin to the pipeline. */
  public async use(plugin: LogHook | LogPlugin): Promise<void> {
    this.hooks.push(plugin);
    this.sort();
    init(plugin, this.logger);
  }

  /** Invokes the `flush()` lifecycle on all plugins. */
  public async flush(): Promise<void> {
    await flush(this.hooks);
  }

  /** Invokes the `dispose()` lifecycle on all plugins. */
  public async dispose(): Promise<void> {
    await dispose(this.hooks);
  }

  /** Removes a plugin by name, calling its `dispose()` if present. */
  public async remove(name: string): Promise<void> {
    await remove(name, this.hooks);
  }

  /** Outputs a debug overview of the pipeline structure. */
  public debug() {
    this.pipeline
      .createPipeline(this.hooks)
      .debugHooks((hooks) => `🌌 Logry pipeline (${hooks.length} hooks)`);
  }
}
