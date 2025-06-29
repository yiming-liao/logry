import type { RawPayload } from "@/shared/types/log-payload";

/** A handler can be a simple function or a class-based object. */
export type Handler = HandlerFunction | HandlerClass;

/** Function-based handler. Receives raw payload only. */
export type HandlerFunction = (payload: RawPayload) => void | Promise<void>;

/** Class-based handler with optional lifecycle and custom logic. */
export interface HandlerClass {
  /** Main payload handler. Type depends on normalization/formatting. */
  handle: (payload: RawPayload) => void | Promise<void>;
  init?(): void | Promise<void>;
  dispose?: () => void | Promise<void>;
  flush?: () => void | Promise<void>;
}

/** Where to insert the handler in the chain. */
export type AddHandlerPosition = "start" | "end";
