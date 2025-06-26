---
sidebar_position: 2
title: Log Methods
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="36" height="36" /> Log Methods

Common log methods available on the logger instance, such as `fatal()`, `error()`, `warn()`, `info()`, etc.

> `logry(options?: BoundLogMethod): void`

### Example

```ts
const logger = logry();

logger.error(
  "An error msg.",
  { userId: "123" },
  {
    scope: "payment",
    context: { orderId: "321" },
    normalizerConfig: { node: { scope: { separator: ":" } } },
    formatterConfig: { node: { context: { format: "compact" } } },
  },
);
```

### Parameters

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| `message` | `RawMessage`        | The main log message              |
| `meta`    | `RawMeta`           | Additional metadata               |
| `options` | `LogRuntimeOptions` | Runtime options for this log call |

### LogRuntimeOptions

| Parameter           | Type                 | Description                           |
| ------------------- | -------------------- | ------------------------------------- |
| `scope?`            | `RawScope \| string` | Scope(s) to categorize or filter logs |
| `context?`          | `RawContext`         | Additional contextual information     |
| `normalizerConfig?` | `NormalizerConfig`   | Configuration for normalizer          |
| `formatterConfig?`  | `FormatterConfig`    | Configuration for formatter           |
