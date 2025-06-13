---
sidebar_position: 2
---

# Quick Start

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> **Installation**

```bash
npm install logry
```

Or use _yarn_

```bash
yarn add logry
```

<h3>Using Static Logger Methods</h3>

The easiest way to use **Logry** is by calling its static logging methods.  
They work instantly without a logger instance, ignore level restrictions, and default to the **“pretty”** preset for clean outpu

```typescript
import { trace, debug, info, warn, error, fatal } from "logry";

info("👋🏼 Hi there! Welcome to Logry!");

// 2nd argument is metadata for additional details
warn("User session is about to expire", { user: "John Doe" });

// Error with full error object
error("Unexpected error occurred", new Error("Something went wrong"));
```

<h3>Creating a Custom Logger Instance</h3>

You can create a logger by calling **logry()**.  
By default, the log level is set to **"warn"**, so only logs with levels **"warn"**, **"error"**, and **"fatal"** will be shown.  
If you don’t specify an ID, the logger will use **"default"** as its identifier automatically.

```typescript
import { logry } from "logry";

// Create a custom logger instance (defaults to id: 'default' and level: 'warn')
const logger = logry();

// ❌ This won't be shown — 'info' is lower than the default 'warn' level
logger.info("User logged in");

// ✅ This will be shown — 'warn' and above are allowed
logger.warn("User login warning");

// Inspect internal core (optional)
console.log(logger.getCore());
// -> LoggerCore { id: 'default', level: 'warn', ... }
```

- Basic Logger Setup for Development

```typeScript
import { logry } from "logry";

const logger = logry({
  id: "MyLogger",
  level: "debug", // Will show: debug, info, warn, error, fatal (trace will be hidden)
});
```

- Full Custom Logger Setup

```typescript
import { logry } from "logry";

const logger = logry({
  id: "🌐 My Logger",
  level: "info",
  scope: ["auth", "api"],
  context: { env: "production", appVersion: "2.5.1" },
  preset: "verbose", // "json" | "pretty" | "pretty-multi-line" | "minimal" | "verbose"
  normalizerConfig: {
    node: {
      timestamp: { style: "iso" },
      // ...
    },
    browser: {
      timestamp: { style: "pretty" },
      // ...
    },
  },
  formatterConfig: {
    node: {
      id: { ansiColor: "\x1b[35m" },
      message: { customFormatter: ({ part }) => "\n" + part.toUpperCase() },
      // ...
    },
    browser: {
      id: { cssStyle: "color: purple;" },
      context: { format: "compact" },
      // ...
    },
  },
  handlerConfig: {
    onError: (error: unknown, handlerId: string) =>
      console.log(handlerId, error),
    // ...
  },
});
```
