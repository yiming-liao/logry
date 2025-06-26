---
sidebar_position: 4
title: Formatter Config
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="36" height="36" /> Formatter Config

> `FormatterConfig` defines how each log field is styled and formatted per platform.

```ts
type FormatterConfig = {
  node?: NodeFormatterConfig;
  browser?: BrowserFormatterConfig;
  edge?: EdgeFormatterConfig;
};
```

All three platform configs share the same structure for most fields such as level, scope, and context, etc.  
The only difference is:
node includes additional fields like **pid** and **hostname**, which are only available in Node.js environments.

### Example

```ts
const logger = logry({
  formatterConfig: {
    node: {
      timestamp: {
        hide: false,
        prefix: "<",
        suffix: ">",
        lineBreaks: 0,
        spaceAfter: 1,
      },
      id: {
        useAnsiStyle: true,
        ansiStyle: "\x1b[35m",
      },
      level: {
        enableAlignment: true,
      },
      scope: {
        showOnlyLatest: true,
        separator: " ➤ ",
      },
      message: {
        customFormatter: ({ fieldValue, raw }) => {
          const ansi = raw.level === "fatal" ? "\x1b[31m" : "";
          return { fieldValue, withAnsiStyle: `${ansi}${fieldValue}\x1b[0m` };
        },
      },
      meta: {
        format: "pretty",
        indent: 2,
      },
      context: {
        depth: 2,
        colors: true,
        compact: true,
        breakLength: 40,
      },
    },
    browser: {
      timestamp: { cssStyle: "border: 1px dashed red" },
      message: {
        customFormatter: ({ fieldValue, raw }) => {
          const cssStyle = raw.level === "fatal" ? "color: red" : "";
          return { fieldValue, cssStyle };
        },
      },
    },
  },
});
```

### Platform FormatterConfig Fields

| Field        | Base Options                                     | Node (additional)                             | Browser (additional) |
| ------------ | ------------------------------------------------ | --------------------------------------------- | -------------------- |
| `timestamp?` | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `id?`        | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `level?`     | `customFormatter`, `enableAlignment`             | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `scope?`     | `customFormatter`, `showOnlyLatest`, `separator` | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `message?`   | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `meta?`      | `customFormatter`, `format`, `indent`            | `useAnsiStyle`, `ansiStyle`, `InspectOptions` | `cssStyle`           |
| `context?`   | `customFormatter`, `format`, `indent`            | `useAnsiStyle`, `ansiStyle`, `InspectOptions` | `cssStyle`           |
| `pid?`       | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | _(N/A)_              |
| `hostname?`  | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | _(N/A)_              |

#### Base Format Field Options

These options are common to all formatter fields and control general display behaviors applicable to every field.

| Option       | Type      |
| ------------ | --------- |
| `hide`       | `boolean` |
| `prefix`     | `string`  |
| `suffix`     | `string`  |
| `lineBreaks` | `number`  |
| `spaceAfter` | `number`  |

### Return Format Differences

While all platform formatters use the same config shape, they return slightly different structures depending on the runtime:

| Field     | Options                                    |
| --------- | ------------------------------------------ |
| `node`    | `{ fieldValue, withAnsiStyle } (optional)` |
| `browser` | `{ fieldValue, cssStyle } (optional)`      |
| `edge`    | `{ fieldValue } (only)`                    |
