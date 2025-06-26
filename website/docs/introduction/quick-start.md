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

> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Label.png" alt="Label" width="16" height="16" /> Use in plain HTML with this script:

```html
<!-- Use logry in any static HTML page via jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/logry@1.1.2/dist/browser-lite/index.global.min.js"></script>
<script>
  logry.info("Hey! I'm here!");
</script>
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Using Static Logger Methods

They work instantly, ignore level restrictions, and use the default “pretty” preset for clean output.

```ts
import { trace, debug, info, warn, error, fatal } from "logry";

info("👋🏼 Hi there!");

// second argument is metadata (meta)
warn("Who are you?", { name: "Logry" });

// you can also pass an Error
error("Uh-oh!", new Error("Lost in the code"));
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Creating a Custom Logger Instance

Call `logry()` to create a logger.  
The default level is `warn`, so only **warn**, **error**, and **fatal** logs are shown.

```ts
import { logry } from "logry";

// Create a custom logger instance (defaults to id: 'default' and level: 'warn')
const logger = logry();

// ❌ This won't be shown, 'info' is lower than the default 'warn' level
logger.info("User logged in");

// ✅ This will be shown
logger.warn("User login warning");
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
