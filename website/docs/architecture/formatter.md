---
sidebar_position: 5
title: Formatter
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Artist Palette" width="36" height="36" /> Formatter

The Formatter takes normalized log data and turns it into readable, styled output.  
It supports optional color coding to make logs clearer and easier to scan.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> What it does

The Formatter receives normalized data and produces formatted strings (or structured content) ready for display.  
Handled fields include:

- timestamp
- id
- level
- scope
- message
- meta
- context
- pid <sub>(_Node.js only_)</sub>
- hostname <sub>(_Node.js only_)</sub>

Each part has its own formatter. All formatters support optional style customizations and can be overridden with custom logic.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Customization

Common format options apply to all formatter parts and include:

- `hide?: boolean;`
- `prefix?: string;`
- `suffix?: string;`
- `lineBreaks?: number;`
- `spaceAfter?: number;`

Every formatter supports a customFormatter function, letting you override default behavior:

```ts
message: {
  customFormatter: ({ fieldValue, raw }) => ({
    fieldValue: `! ${fieldValue}`, // e.g., "msg" → "! msg"
    withAnsiStyle: `\x1b[42m${fieldValue}`, // Used in Node.js when `useAnsiStyle` is enabled
    cssStyle: `border: 1px solid blue`, // Used in browsers for console styling
  }),
},
```

You can also fine-tune behavior using extra options per part.

| Platform  | Part      | Extra Options Available                                    |
| --------- | --------- | ---------------------------------------------------------- |
| `Node.js` | ALL       | ansiStyle, useAnsiStyle                                    |
| -         | `scope`   | showOnlyLatest, separator                                  |
| -         | `meta`    | format, indent, all InspectOptions (for format: **"raw"**) |
| -         | `context` | format, indent, all InspectOptions (for format: **"raw"**) |
| `Browser` | ALL       | cssStyle                                                   |
| -         | `scope`   | showOnlyLatest, separator                                  |
| -         | `meta`    | format, indent                                             |
| -         | `context` | format, indent                                             |

> **Note:** InspectOptions refers to the options supported by Node.js [util.inspect](https://nodejs.org/api/util.html#utilinspectobject-options).

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Platform Awareness

Formatter behavior automatically adapts to the runtime platform, whether it is Node.js or the browser.  
This ensures that log outputs remain clear, styled, and consistent across environments.

The output behavior varies depending on the platform:

| Platform  | Format output                                            | Styling mechanism                          |
| --------- | -------------------------------------------------------- | ------------------------------------------ |
| `Node.js` | Returns `{ fieldValue: string, withAnsiStyle?: string }` | Uses ANSI escape codes (e.g. **\x1b[31m**) |
| `Browser` | Returns `{ fieldValue: string, cssStyle?: string }`      | Uses %c and inline CSS                     |
| `Edge`    | Returns `{ fieldValue: string }`                         | Just plain text                            |

> In the browser, the final result will be used with console.log("%c...%c...%c...", styleA, styleB, ...), allowing for per-part CSS styling.

For example:

- Timestamps appear as full ISO strings with ANSI colors in Node.js and as simplified text styled with CSS in the browser.
- Meta shows full depth in Node.js, but in browsers it gets a prefix like "META | ".
- Some fields (like level) can be hidden in one platform but shown in another.

> You can define environment-specific behavior using the formatterConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```ts
const logger = logry({
  // ...
  formatterConfig: {
    node: {
      timestamp: {
        ansiStyle: "\x1b[33m", // Yellow text for timestamp in Node.js
      },
      meta: {
        depth: null, // Show full depth for meta in Node.js
      },
      lineBreaksAfter: 2, // Add extra spacing after logs
    },
    browser: {
      timestamp: {
        cssStyle: "font-weight: bold; color: orange;", // Bold orange timestamp in browsers
      },
      meta: {
        prefix: "META | ", // Prefix meta with label in browsers
      },
      level: {
        hide: true, // Hide level field in browsers
      },
    },
  },
  // ...
});
```
