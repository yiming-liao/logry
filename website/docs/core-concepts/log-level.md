---
sidebar_position: 1
---

# Log Level

**Logry** supports **seven log levels**, from most critical to most verbose:

| Level    | Description                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| `fatal`  | Logs critical system failures. The application may crash or exit immediately ❗        |
| `error`  | Logs runtime errors that should be investigated and typically require action ❌        |
| `warn`   | Logs recoverable issues or unexpected behaviors that don't prevent operation ⚠️        |
| `info`   | Logs general operational messages, such as successful startups or actions ℹ️           |
| `debug`  | Logs detailed internal information helpful for debugging 🛠️                            |
| `trace`  | Logs the most granular details — every step, useful for profiling or deep debugging 🔍 |
| `silent` | Disables all logging output 🚫                                                         |

> The logger only outputs messages **at or above the current level**.  
> For example, if the level is set to `warn`, only `warn`, `error`, and `fatal` logs will be printed.

<h4> You can specify the desired log level when creating a logger instance </h4>

but this only affects the initial configuration and does not override the core’s log level.

```typescript
// Initialize a logger with a preferred level (for initial filtering)
const logger = logry({ id: "my-app", level: "debug" });
```
