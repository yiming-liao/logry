import type { ReadyPayload } from "@/core/logger/types";
import type { Transporter } from "@/modules/transporters/types";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { isBrowser, isNode } from "@/shared/utils/platform";

jest.mock("@/shared/utils/platform", () => ({
  isNode: jest.fn(),
  isBrowser: jest.fn(),
}));

const readyPayload: ReadyPayload = {
  timestamp: 123456,
  id: "log-id",
  level: "info",
  scope: "test",
  message: "Hello world",
  normalizerConfig: {},
  formatterConfig: {},
  raw: {
    timestamp: 123,
    id: "",
    level: "info",
    scope: [],
    message: "",
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

    transportPayload({ transporters, readyPayload });

    expect(nodeTransport).toHaveBeenCalledWith(readyPayload);
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

    transportPayload({ transporters, readyPayload });

    expect(browserTransport).toHaveBeenCalledWith(readyPayload);
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

    transportPayload({ transporters, readyPayload });

    expect(transport).not.toHaveBeenCalled();
  });
});
