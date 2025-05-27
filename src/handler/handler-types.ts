import type { LogPayload } from "../types";

export type Handler = (options: LogPayload) => void | Promise<void>;

export type FlushStrategy = (
  flush: () => Promise<void>,
) => (() => void) | undefined;
export type ErrorCallback = (error: unknown, handlerId: string) => void;

/** Config */
export type HandlerConfig = {
  flushStrategy?: FlushStrategy;
  onError?: ErrorCallback;
  flushTimeout?: number;
};
