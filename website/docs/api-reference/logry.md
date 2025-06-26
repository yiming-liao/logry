---
sidebar_position: 1
title: logry()
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="36" height="36" /> logry()

> `logry(options?: GetOrCreateLoggerOptions): UniversalLogger`

| Parameter               | Type                   | Description                          | Default            |
| ----------------------- | ---------------------- | ------------------------------------ | ------------------ |
| `id?`                   | `string`               | Identifier for the logger core       | Randomly generated |
| `level?`                | `Level`                | Log level threshold for output       | `'warn'`           |
| `scope?`                | `string \| string[]`   | Scope for log grouping or filtering  | `[]`               |
| `context?`              | `RawContext`           | Additional contextual information    |                    |
| `normalizerConfig?`     | `NormalizerConfig`     | Configuration for normalizer         |                    |
| `formatterConfig?`      | `FormatterConfig`      | Configuration for formatter          |                    |
| `handlerManagerConfig?` | `HandlerManagerConfig` | Configuration for HandlerManager     |                    |
| `preset?`               | `LoggerPreset`         | Preset configuration for quick setup |                    |

- Import from **"logry"**: `logry(options?: GetOrCreateLoggerOptions): UniversalLogger`  
  _Universal logger for both Node and Browser environments._

- Import from **"logry/node"**: `logry(options?: GetOrCreateLoggerOptions): NodeLogger`

- Import from **"logry/browser"**: `logry(options?: GetOrCreateLoggerOptions): BrowserLogger`

### Example

```ts
const logger = logry({
  id: "my-logger",
  level: "info",
  scope: ["app", "ui"],
  context: { apiVersion: 2 },
  normalizerConfig: { node: { timestamp: { style: "iso" } } },
  formatterConfig: { node: { id: { ansiStyle: "\x1b[35m" } } },
  handlerManagerConfig: { flushTimeout: 5000 },
  preset: "minimal",
});
```
