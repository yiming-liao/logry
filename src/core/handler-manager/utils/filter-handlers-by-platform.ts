import type { HandlerItem } from "@/core/handler-manager/types";
import { isBrowser } from "@/shared/utils/is-browser";
import { isEdge } from "@/shared/utils/is-edge";
import { isNode } from "@/shared/utils/is-node";

export function filterHandlersByPlatform(
  handlerItems: HandlerItem[],
): HandlerItem[] {
  return handlerItems.filter(({ handler }) => {
    if (!("handle" in handler)) return true;

    if (isNode() && handler.platform !== "node") return false;
    if (isBrowser() && handler.platform !== "browser") return false;
    if (isEdge() && handler.platform !== "edge") return false;

    return true;
  });
}
