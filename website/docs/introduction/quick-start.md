---
sidebar_position: 2
title: Quick Start
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="36" height="36" /> Quick Start

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png" alt="Triangular Flag" width="20" height="20" /> Installation

```bash
npm install logry
```

or use **yarn**

```bash
yarn add logry
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Using Static Logger Methods

The easiest way to use **Logry** is by calling its static logging methods.  
They work instantly without a logger instance, ignore level restrictions, and default to the **“pretty”** preset for clean output

```ts
import { trace, debug, info, warn, error, fatal } from "logry";

info("👋🏼 Hi there! Welcome to Logry!");

warn("User session is about to expire", { user: "John Doe" }); // second argument is metadata (meta)

error("Unexpected error occurred", new Error("Something went wrong")); // you can also pass an Error
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Creating a Custom Logger Instance

You can create a logger by calling **logry()**.  
By default, the log level is set to **"warn"**, so only logs with levels **"warn"**, **"error"**, and **"fatal"** will be shown.  
If you don’t specify an ID, the logger will use **"default"** as its identifier automatically.

```ts
import { logry } from "logry";

// Create a custom logger instance (defaults to id: 'default' and level: 'warn')
const logger = logry();

logger.info("User logged in"); // ❌ This won't be shown, 'info' is lower than the default 'warn' level

logger.warn("User login warning"); // ✅ This will be shown
```

A quick and easy setup to start logging right away:

```ts
import { logry } from "logry";

const logger = logry({
  id: "MyLogger",
  level: "debug", // Will show: debug, info, warn, error, fatal (trace will be hidden)
});
```

<details>
<summary> ✨ <strong>Want a more customized setup?</strong></summary>

A fully customizable logger setup when you need more control and personality:

```ts
import { logry } from "logry";

const logger = logry({
  id: "🌐 My Logger",
  level: "info",
  scope: ["auth", "api"],
  context: { env: "production", appVersion: "2.5.1" },
  preset: "verbose", // "pretty" | "pretty-expanded" | "minimal" | "verbose"
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
      id: { ansiStyle: "\x1b[35m" },
      message: {
        customFormatter: ({ fieldValue }) => ({
          fieldValue: "\n" + fieldValue.toUpperCase(),
        }),
      },
      // ...
    },
    browser: {
      id: { cssStyle: "color: purple;" },
      context: { format: "compact" },
      // ...
    },
  },
  handlerManagerConfig: {
    // ...
  },
});
```

</details>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Joystick.png" alt="Joystick" width="25" height="25" /> Connect with the Outside World

**Want to send your logs to files, Slack, or other services?**  
 Check out the [✨ Handlers & Integrations](../examples/handlers.md) to see how Logry integrates with real-world outputs.
