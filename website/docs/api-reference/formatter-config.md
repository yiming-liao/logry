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

### Platform FormatterConfig Fields

| Field        | Base Options                                     | Node (additional)                             | Browser (additional) |
| ------------ | ------------------------------------------------ | --------------------------------------------- | -------------------- |
| `timestamp?` | `customFormatter`, `useUTC`, `showTimeOnly`      | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `id?`        | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `level?`     | `customFormatter`, `enableAlignment`             | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `scope?`     | `customFormatter`, `showOnlyLatest`, `separator` | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `message?`   | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`                   | `cssStyle`           |
| `meta?`      | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`, `InspectOptions` | `cssStyle`           |
| `context?`   | `customFormatter`                                | `useAnsiStyle`, `ansiStyle`, `InspectOptions` | `cssStyle`           |
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
