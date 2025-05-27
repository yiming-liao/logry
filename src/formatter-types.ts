/** Formatter function for Node.js log output */
export type NodeFormatter = (
  params: Readonly<{
    timestamp: string;
    id?: string;
    level: string;
    context?: string;
    message: string;
    meta?: unknown;
  }>,
) => string;

/** Formatter function for Browser log output, returns array of strings */
export type BrowserFormatter = (
  params: Readonly<{
    timestamp: string;
    id?: string;
    level: string;
    context?: string;
    message: string;
    meta?: unknown;
  }>,
) => string[];
