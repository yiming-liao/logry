---
sidebar_position: 3
title: Transporter
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png" alt="Airplane Departure" width="36" height="36" /> Transporter

When a log is passed to a Transporter, it flows through three clear stages:

1. 🔀 Normalization — Ensures a consistent, structured shape.
2. 🎨 Formatting — Transforms the data into a readable format.
3. 🖨 Output — Sends the final log to the destination **console**.

> **Note:**  
> In Node.js, **NodeConsoleTransporter** lazily appends fields like `pid` and `hostname`.  
> This is done asynchronously to ensure that **Logger.log()** remains synchronous and returns immediately.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Built-in Transporters

**Logry** ships with platform-aware console transporters,  
so your logs always show up in the right place—without any extra setup 🛠️

| Platform  | Transporter               | Output target                 |
| --------- | ------------------------- | ----------------------------- |
| `Node.js` | NodeConsoleTransporter    | Terminal console              |
| `Browser` | BrowserConsoleTransporter | Browser developer console     |
| `Edge`    | EdgeConsoleTransporter    | Platform console (plain text) |

Each transporter **activates only** in its matching runtime, and **does nothing** otherwise.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Universal by Default

Importing from "logry" gives you a universal logger with both **Node** and **browser** transporters attached:

```ts
import { logry } from "logry"; // Includes both NodeConsoleTransporter and BrowserConsoleTransporter

logry.info("Hello from anywhere");
```

> In Node.js, logs go to the terminal. In the browser, they appear in the browser console.  
> ⚡️ No extra configuration required.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Platform-Specific Variants

To reduce bundle size or fine-tune behavior, you can import from a platform-specific entry point:

| Import Path     | Platform  | Bound Transporter         |
| --------------- | --------- | ------------------------- |
| "logry/node"    | `Node.js` | NodeConsoleTransporter    |
| "logry/browser" | `Browser` | BrowserConsoleTransporter |
| "logry/edge"    | `Edge`    | EdgeConsoleTransporter    |

Each variant includes **only** the relevant transporter for its environment.

```ts
import { logry } from "logry/node"; // Logs only to terminal (no browser logic)
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Edge Runtime Support

The "logry/edge" export is optimized for environments like Cloudflare Workers and other serverless platforms.  
It uses **EdgeConsoleTransporter**, a minimal transporter that prints plain-text logs to the platform’s console.

> ⚠️ Always use logry/edge in Edge runtimes.  
> Other versions rely on Node.js APIs and may fail to run.

```ts
import { logry } from "logry/edge";

logry.info("Hello from the Edge");
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Design Principle: Console Only

> 🔮 Unlike traditional loggers that mix console output with side-effects,  
> **Logry** keeps things clean and focused.  
> Transporters handle console output only; for other log deliveries, use Handlers.
