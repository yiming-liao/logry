import type { HandlerItem, HandlerClass } from "@/core/handler-manager/types";
import { filterHandlersByPlatform } from "@/core/handler-manager/utils/filter-handlers-by-platform";
import { isBrowser } from "@/shared/utils/is-browser";
import { isEdge } from "@/shared/utils/is-edge";
import { isNode } from "@/shared/utils/is-node";

jest.mock("@/shared/utils/is-node", () => ({ isNode: jest.fn() }));
jest.mock("@/shared/utils/is-browser", () => ({ isBrowser: jest.fn() }));
jest.mock("@/shared/utils/is-edge", () => ({ isEdge: jest.fn() }));

describe("filterHandlersByPlatform", () => {
  const createHandlerClass = (
    platform: "node" | "browser" | "edge",
  ): HandlerClass => ({
    platform,
    handle: jest.fn(),
  });

  const simpleFunctionHandler = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should include simple function handlers", () => {
    const handlers: HandlerItem[] = [
      { id: "fn1", handler: simpleFunctionHandler },
    ];

    (isNode as jest.Mock).mockReturnValue(true);
    const result = filterHandlersByPlatform(handlers);
    expect(result).toHaveLength(1);
  });

  it("should filter handlers correctly in Node environment", () => {
    (isNode as jest.Mock).mockReturnValue(true);
    (isBrowser as jest.Mock).mockReturnValue(false);
    (isEdge as jest.Mock).mockReturnValue(false);

    const handlers: HandlerItem[] = [
      { id: "node1", handler: createHandlerClass("node") },
      { id: "browser1", handler: createHandlerClass("browser") },
      { id: "edge1", handler: createHandlerClass("edge") },
    ];

    const result = filterHandlersByPlatform(handlers);
    expect(result.map((h) => h.id)).toEqual(["node1"]);
  });

  it("should filter handlers correctly in Browser environment", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(true);
    (isEdge as jest.Mock).mockReturnValue(false);

    const handlers: HandlerItem[] = [
      { id: "node1", handler: createHandlerClass("node") },
      { id: "browser1", handler: createHandlerClass("browser") },
      { id: "edge1", handler: createHandlerClass("edge") },
    ];

    const result = filterHandlersByPlatform(handlers);
    expect(result.map((h) => h.id)).toEqual(["browser1"]);
  });

  it("should filter handlers correctly in Edge environment", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(false);
    (isEdge as jest.Mock).mockReturnValue(true);

    const handlers: HandlerItem[] = [
      { id: "node1", handler: createHandlerClass("node") },
      { id: "browser1", handler: createHandlerClass("browser") },
      { id: "edge1", handler: createHandlerClass("edge") },
    ];

    const result = filterHandlersByPlatform(handlers);
    expect(result.map((h) => h.id)).toEqual(["edge1"]);
  });
});
