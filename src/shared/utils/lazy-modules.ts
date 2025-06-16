import { lazyImport } from "@/shared/utils/lazy-import";

export const getOs = lazyImport(() => import("os"));
