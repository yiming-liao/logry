/* eslint-disable unicorn/number-literal-case */
import type { LogPlugin } from "@/shared/types/log-plugin";
import { formatContext, formatMeta } from "@/pipeline";

// Map log levels to Discord embed colors
const getDiscordColor = (level: string): number => {
  const colors: Record<string, number> = {
    fatal: 0x8b_00_00,
    error: 0xff_4b_4b,
    warn: 0xff_c1_07,
    info: 0x36_a2_eb,
    debug: 0x90_ca_f9,
    trace: 0x99_99_99,
  };
  return colors[level.toLowerCase()] ?? 0xcc_cc_cc;
};

const renderJson = (content: string | null, label?: string) => {
  if (!content) return null;
  return {
    name: "",
    value: `\`\`\`json\n${label}:\n${content}\n\`\`\``,
    inline: false,
  };
};

export const discordPlugin = (webHookUrl: string): LogPlugin => ({
  name: "__discord__",
  run: async (ctx) => {
    const { id, level, scope, message, meta, context } = ctx.normalized!;

    // Build embed fields
    const fields = [
      scope.length > 0 ? { name: "", value: `${scope.join(" › ")}` } : null, // scope
      { name: "", value: `\`\`\`\n– ${level!.toUpperCase()}\n\`\`\`` }, // level
      renderJson(formatMeta(meta, ctx, { format: "pretty" }), "meta"), // meta
      renderJson(formatContext(context, ctx, { format: "pretty" }), "context"), // context
    ].filter(Boolean);

    // Send to webhook
    try {
      const res = await fetch(webHookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: message,
              color: getDiscordColor(level!),
              fields,
              footer: { text: id },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!res.ok) {
        console.log(`Discord webhook failed: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.log(
        `Discord webhook error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  },
});
