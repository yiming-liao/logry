---
sidebar_position: 1
title: Log Level
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png" alt="Memo" width="36" height="36" /> Log Level

**Logry** supports **seven log levels**, ordered from most critical to most verbose:

| Level    |     | Description                                                                        |
| -------- | --- | ---------------------------------------------------------------------------------- |
| `fatal`  | ❗  | Logs critical system failures. The application may crash or exit immediately       |
| `error`  | ❌  | Logs runtime errors that should be investigated and typically require action       |
| `warn`   | ⚠️  | Logs recoverable issues or unexpected behaviors that don't prevent operation       |
| `info`   | ℹ️  | Logs general operational messages, such as successful startups or actions          |
| `debug`  | 🛠️  | Logs detailed internal information helpful for debugging                           |
| `trace`  | 🔍  | Logs the most granular details, every step, useful for profiling or deep debugging |
| `silent` | 🤐  | Disables all logging output                                                        |

The logger only outputs messages **at or above the current level**.  
For example, if the level is set to `warn`, only `warn`, `error`, and `fatal` logs will be printed.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Setting the Desired Log Level

> Core-level configs like **level** are only applied when creating a new core.  
> If a core with the same ID exists, those configs will be ignored, and a warning will be logged.

```ts
// Initialize a logger with a preferred level
const logger = logry({ id: "my-app", level: "debug" });
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Forcing Logs Beyond the Level Filter

Normally, the logger will only output messages at or above the configured level.  
However, you can force a log to be emitted regardless of the current level:

```ts
logger.force.error("Something went wrong!");
logger.force.info("This will show even if level is set to 'warn'");
```

> ⚠️ Use this with care—`force` is designed for exceptional situations where logs must be guaranteed to appear.
