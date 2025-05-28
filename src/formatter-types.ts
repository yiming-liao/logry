import type { Context } from "./types";

/** Formatter function for Node.js log output */
export type NodeFormatter<TContext extends Context = Context> = (
  params: Readonly<{
    timestampRaw: Date;
    timestamp: string;
    id?: string;
    level: string;
    scope?: string;
    message: string;
    meta?: unknown;
    context?: TContext;
  }>,
) => string;

/** Formatter function for Browser log output, returns array of strings */
export type BrowserFormatter<TContext extends Context = Context> = (
  params: Readonly<{
    timestampRaw: Date;
    timestamp: string;
    id?: string;
    level: string;
    scope?: string;
    message: string;
    meta?: unknown;
    context?: TContext;
  }>,
) => string[];
