export const format1 = {
  timestamp: {
    cssStyle: "color: #81a1c1; font-style: italic;",
  },
  id: {
    cssStyle: "color:rgb(48, 119, 201); font-weight: bold; margin:0 8px",
  },
  level: {
    customFormatter: ({ fieldValue, raw }) => {
      const style =
        {
          fatal: "linear-gradient(135deg, #ff6b6b, #ee5253) ",
          error: "linear-gradient(135deg, #ff758c, #ff7eb3)",
          warn: "linear-gradient(135deg,rgb(253, 226, 138), #fab1a0)",
          info: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
          debug:
            "linear-gradient(135deg,rgb(134, 161, 203),rgb(108, 134, 220))",
          trace: "linear-gradient(135deg, #dfe6e9, #b2bec3)",
        }[raw.level] ?? "#ccc";

      return {
        fieldValue,
        cssStyle: `
        background: ${style};
        color: #FFF;
        font-weight: bold;
        border-radius: 6px;
        padding: 3px 12px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2), 0 0 10px rgba(255,255,255,0.1);
        text-shadow: none;
        margin:4px 8px 4px 0;
        text-shadow: 0 1px 5px rgba(0,0,0,0.5);`,
      };
    },
  },
  scope: {
    cssStyle: `
      color:rgb(74, 140, 168); 
      font-weight: 500; 
      font-style: italic;margin-right:8px`,
  },
  message: {
    cssStyle: `
      background: rgba(57, 111, 168, 0.1); 
      padding: 4px 8px; 
      border-radius: 6px; 
      font-size: 1.15em; 
      line-height: 1.4; 
      font-family: 'Helvetica Neue', sans-serif; 
      `,
  },
  meta: {
    cssStyle: `
      color:rgb(117, 131, 158);
      font-family: 'Fira Code', monospace;background: rgba(99, 102, 203, 0.1);
      padding: 0px 14px;
      border-radius: 6px;
      margin-top: 8px;
      line-height: 1.5;
      box-shadow: inset 0 0 8px rgba(99, 102, 241, 0.3);
      `,
    format: "pretty",
    indent: 2,
    lineBreaks: 0,
  },
};

export const format2 = {
  timestamp: {
    cssStyle: `
      background: #1e293b;
      color: #e2e8f0;
      font-style: italic;
      padding: 4px 10px;
      line-height:2em;
      border-radius: 6px;
    `,
  },
  id: {
    cssStyle: `
      background: #334155;
      color: #a5f3fc;
      font-family: 'Fira Code', monospace;
      font-weight: bold;
      padding: 4px 10px;
      line-height:2em;
      border-radius: 6px;
      margin: 0 8px;
    `,
  },
  level: {
    customFormatter: ({ fieldValue, raw }) => {
      const map = {
        info: ["#2563eb", "#dbeafe"],
        error: ["#dc2626", "#fee2e2"],
        warn: ["#eab308", "#fef9c3"],
        debug: ["#059669", "#d1fae5"],
        trace: ["#6b7280", "#f3f4f6"],
        fatal: ["#b91c1c", "#fecaca"],
      };
      const [bg, fg] = map[raw.level] ?? ["#4b5563", "#f1f5f9"];

      return {
        fieldValue: fieldValue.toUpperCase(),
        cssStyle: `
          background: ${bg};
          color: ${fg};
          font-weight: 600;
          padding: 4px 10px;
          line-height:2em;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          margin-right: 10px;
        `,
      };
    },
  },
  scope: {
    cssStyle: `
      background: #0f766e;
      color: #ccfbf1;
      font-style: italic;
      font-family: 'JetBrains Mono', monospace;
      padding: 4px 10px;
      line-height:2em;
      border-radius: 6px;
      margin-right: 6px;
    `,
  },
  message: {
    cssStyle: `
      background: #111827;
      color: #f8fafc;
      font-family: 'JetBrains Mono', monospace;
      padding: 4px 10px;
      line-height:2em;
      border-radius: 6px;
    `,
  },
  meta: {
    cssStyle: `
      color: #e2e8f0;
      background:rgba(43, 75, 118, 0.66);
      padding: 0 8px;
      border-radius: 6px;
      line-height: 2.4;
      font-family: 'Fira Code', monospace;
      margin-top: 8px;
      backdrop-filter: blur(6px);
    `,
    format: "compact",
    indent: 0,
    lineBreaks: 1,
    suffix: "\n",
  },
};

export const format3 = {
  timestamp: {
    cssStyle: `
      font-style: italic;
      background-color:rgba(75, 98, 171, 0.2);
      padding:8px;
      border-radius:6px 0 0 6px;
    `,
  },
  id: {
    cssStyle: `
      background-color:rgba(75, 98, 171, 0.2);
      padding:8px;
    `,
  },
  level: {
    customFormatter: ({ fieldValue, raw }) => {
      const woods = {
        info: "#8b5e3c",
        error: "#b91c1c",
        warn: "#ca8a04",
        debug: "#15803d",
        trace: "#6b7280",
        fatal: "#7f1d1d",
      };
      const color = woods[raw.level] ?? "#444";

      return {
        fieldValue: fieldValue.toUpperCase(),
        cssStyle: `
          color: ${color};
          background-color:rgba(75, 98, 171, 0.2);
          padding:8px;
        `,
      };
    },
  },
  scope: {
    cssStyle: `
      background-color:rgba(75, 98, 171, 0.2);
      padding:8px;
    `,
  },
  message: {
    cssStyle: `
      background-color:rgba(75, 98, 171, 0.2);
      padding:8px;
      border-radius:0 6px 6px 0;
    `,
  },
};
