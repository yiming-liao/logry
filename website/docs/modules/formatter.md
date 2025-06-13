---
sidebar_position: 2
---

# Formatter

The Formatter layer is responsible for converting the normalized parts of a log into final output strings — styled, readable, and optionally color-coded.

### What it does

The Formatter receives normalized data and produces formatted strings (or structured content) ready for display.  
Handled parts include:

- timestamp
- id
- level
- scope
- message
- meta
- context
- pid (_Node.js only_)
- hostname (_Node.js only_)

Each part has its own formatter. All formatters support optional style customizations and can be overridden with custom logic.

### Customization

Every formatter supports a customFormatter function, letting you override default behavior:

```typescript
customFormatter?: ({ part, rawPart }) => FormattedValue; // rawPart is not normalized
```

You can also fine-tune behavior using extra options per part.

| Platform  | Part      | Extra Options Available               |
| --------- | --------- | ------------------------------------- |
| `Node.js` | ALL       | ansiColor                             |
| -         | `scope`   | showOnlyLatest, seperator             |
| -         | `meta`    | format, depth (for format: **"raw"**) |
| -         | `context` | format, depth (for format: **"raw"**) |
| `Browser` | ALL       | cssStyle                              |
| -         | `scope`   | showOnlyLatest, seperator             |
| -         | `meta`    | format                                |
| -         | `context` | format                                |

### Platform Awareness

Formatter adapts to the runtime platform — Node.js or Browser — adjusting output format and styling accordingly.  
This ensures logs stay readable and well-styled in both environments.

The output behavior varies depending on the platform:

| Platform  | Format output                                   | Styling mechanism      |
| --------- | ----------------------------------------------- | ---------------------- |
| `Node.js` | Returns a plain string with ANSI codes          | Uses ANSI escape codes |
| `Browser` | Returns `{ [label]: string, cssStyle: string }` | Uses %c and inline CSS |

In the browser, the final result will be used with console.log("%c...%c...%c...", styleA, styleB, ...), allowing for per-part CSS styling.

For example:

- Node.js prints timestamps as full ISO strings with ANSI colors (e.g., \x1b[33m).
- Browser styles timestamps with CSS (e.g., orange and bold) and simpler format.
- Meta shows full depth in Node, but gets a prefix like “META | “ in Browser.
- Some parts (like level) can be hidden in one platform but shown in another.

> You can define environment-specific behavior using the formatterConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```typeScript
formatterConfig: {
  node: {
    timestamp: {
      ansiColor: "\x1b[33m",
    },
    meta: {
      depth: null,
    },
    level: {
      lineBreaks: 1,
    },
    id: {
      customFormatter: ({ part }) => `node-${part}`,
    },
  },
  browser: {
    timestamp: {
      cssStyle: "font-weight: bold; color: orange;",
    },
    meta: {
      prefix: "META | ",
    },
    level: {
      hide: true,
    },
  },
},
```
