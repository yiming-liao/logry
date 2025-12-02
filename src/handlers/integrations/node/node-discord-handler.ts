/* eslint-disable unicorn/number-literal-case */
/* eslint-disable unicorn/numeric-separators-style */
import type { RawPayload } from "@/shared/types/log-payload";
import { NodeHandler } from "@/handlers/platform-handlers/node-handler";

// Map log levels to Discord embed colors
const getDiscordColor = (level: string): number => {
  const colors: Record<string, number> = {
    fatal: 0x8b0000,
    error: 0xff4b4b,
    warn: 0xffc107,
    info: 0x36a2eb,
    debug: 0x90caf9,
    trace: 0x999999,
  };
  return colors[level.toLowerCase()] ?? 0xcccccc;
};

export class NodeDiscordHandler extends NodeHandler {
  constructor(private webhookUrl = "") {
    super({
      normalizerConfig: { edge: { timestamp: { style: "raw" } } },
    });
    this.webhookUrl = webhookUrl;
  }

  async handle(payload: RawPayload) {
    const { timestamp, id, level, scope, message, meta } =
      this.normalize(payload);

    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: level,
            description: `\`\`\`${message || " "}\`\`\``,
            color: getDiscordColor(level),
            fields: [
              {
                name: "Timestamp",
                value: new Date(timestamp).toLocaleString("zh-TW"),
                inline: false,
              },
              { name: "Logger ID", value: id, inline: false },
              { name: "Scope", value: scope || "-", inline: false },
              ...(meta
                ? [
                    {
                      name: "Meta",
                      value:
                        "```json\n" + JSON.stringify(meta, null, 2) + "\n```",
                      inline: false,
                    },
                  ]
                : []),
            ],
          },
        ],
      }),
    });
  }
}
