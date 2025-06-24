import type { FormattedPayload } from "@/shared/types/log-payload";
import { composeMessage } from "@/modules/transporters/edge/utils/compose-message";

describe("composeMessage", () => {
  it("should compose message with all fields and no line breaks", () => {
    const payload = {
      timestamp: "[time]",
      id: "[id]",
      level: "[INFO]",
      scope: "[scope]",
      message: " Hello",
      meta: " { meta }",
      context: " { context }",
      formatterConfig: {
        edge: {
          lineBreaksBefore: 0,
          lineBreaksAfter: 0,
        },
      },
    } as FormattedPayload;

    const result = composeMessage(payload);
    expect(result).toBe("[time][id][INFO][scope] Hello { meta } { context }");
  });

  it("should compose message with line breaks before and after", () => {
    const payload = {
      timestamp: "[time]",
      id: "[id]",
      level: "[WARN]",
      scope: "[scope]",
      message: " Warning",
      meta: "",
      context: "",
      formatterConfig: {
        edge: {
          lineBreaksBefore: 2,
          lineBreaksAfter: 1,
        },
      },
    } as FormattedPayload;

    const result = composeMessage(payload);
    expect(result).toBe("\n\n[time][id][WARN][scope] Warning\n");
  });

  it("should handle missing formatterConfig safely", () => {
    const payload = {
      timestamp: "[t]",
      id: "[id]",
      level: "[L]",
      scope: "[s]",
      message: " msg",
      meta: "",
      context: "",
      formatterConfig: {},
    } as FormattedPayload;

    const result = composeMessage(payload);
    expect(result).toBe("[t][id][L][s] msg");
  });
});
