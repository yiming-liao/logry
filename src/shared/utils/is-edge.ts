import { isBrowser } from "@/shared/utils/is-browser";
import { isNode } from "@/shared/utils/is-node";

/**
 * Detect if the current environment is likely an Edge Runtime,
 *
 * This assumes any environment that is not Node.js and not Browser is Edge-like.
 */
export const isEdge = (): boolean => !isNode() && !isBrowser();
