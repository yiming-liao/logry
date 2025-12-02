import type { Transporter } from "@/modules/transporters/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { isBrowser } from "@/shared/utils/is-browser";
import { isNode } from "@/shared/utils/is-node";

jest.mock("@/shared/utils/is-browser", () => ({
  isBrowser: jest.fn(),
}));
jest.mock("@/shared/utils/is-node", () => ({
  isNode: jest.fn(),
}));

const rawPayload: RawPayload = {
  timestamp: 123_456,
  id: "log-id",
  level: "info",
  scope: ["test"],
  message: "Hello world",
  normalizerConfig: {},
  formatterConfig: {},
  raw: {
    timestamp: 123,
    id: "",
    level: "info",
    scope: [],
    message: "",
    hasContext: false,
    hasMeta: false,
  },
};

describe("transportPayload", () => {
  it("should call node transporter when in Node environment", () => {
    (isNode as jest.Mock).mockReturnValue(true);
    (isBrowser as jest.Mock).mockReturnValue(false);

    const nodeTransport = jest.fn();
    const browserTransport = jest.fn();

    const transporters: Transporter[] = [
      { platform: "node", transport: nodeTransport },
      { platform: "browser", transport: browserTransport },
    ];

    transportPayload({ transporters, rawPayload });

    expect(nodeTransport).toHaveBeenCalledWith(rawPayload);
    expect(browserTransport).not.toHaveBeenCalled();
  });

  it("should call browser transporter when in Browser environment", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(true);

    const nodeTransport = jest.fn();
    const browserTransport = jest.fn();

    const transporters: Transporter[] = [
      { platform: "node", transport: nodeTransport },
      { platform: "browser", transport: browserTransport },
    ];

    transportPayload({ transporters, rawPayload });

    expect(browserTransport).toHaveBeenCalledWith(rawPayload);
    expect(nodeTransport).not.toHaveBeenCalled();
  });

  it("should not call any transporter when platform is unknown", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(false);

    const transport = jest.fn();

    const transporters: Transporter[] = [
      { platform: "node", transport },
      { platform: "browser", transport },
    ];

    transportPayload({ transporters, rawPayload });

    expect(transport).not.toHaveBeenCalled();
  });
});
