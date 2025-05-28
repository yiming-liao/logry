import type { Scope } from "../../../types";
import { DEFAULT_SCOPE_SEPARATOR } from "../../../constants";

export const formatScope = (scope: Scope, scopeSeparator?: string) => {
  const fullScope = scope.join(scopeSeparator ?? DEFAULT_SCOPE_SEPARATOR);
  const lastScope = String(scope[scope.length - 1] || "");
  return { scopeString: fullScope, lastScope };
};
