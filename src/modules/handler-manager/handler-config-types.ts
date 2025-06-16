/** Cancels a flush strategy (e.g., clears a timer). */
export type CancelFlushStrategy = () => void;

/**
 * Defines when and how to trigger flush().
 * Should return a cancel function if cleanup is needed.
 */
export type FlushStrategy = (
  flush: () => Promise<void>,
) => CancelFlushStrategy | undefined;

/**
 * Called when an error occurs in a handler.
 * isFlushError is true if triggered during flush().
 */
export type HandlerErrorHandler = ({
  error,
  id,
  isFlushError,
}: {
  error: unknown;
  id: string;
  isFlushError?: boolean;
}) => void;

/** Optional config for handler manager behavior. */
export type HandlerConfig = {
  /** Custom flush trigger strategy (e.g. interval-based). */
  flushStrategy?: FlushStrategy;
  /** Custom error handler for failed handler executions. */
  onError?: HandlerErrorHandler;
  /** Timeout for flush operations (in milliseconds). */
  flushTimeout?: number;
};
