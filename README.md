<div align="center" id="top" >
  <a href="https://yiming-liao.github.io/logry/docs/introduction/getting-started">
    <img src="logry-logo-rounded.png" alt="Logry node" width="100" height="100" />
  </a>
</div>

<h1 align="center">Logry</h1>

<div align="center">
  
 Your go-to logger that’s small but mighty, universal across JavaScript runtimes.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/logry?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/logry)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/logry?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/logry)
[![Coverage Status](https://img.shields.io/coveralls/github/yiming-liao/logry.svg?branch=main&style=flat&colorA=000000&colorB=000000)](https://coveralls.io/github/yiming-liao/logry?branch=main)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?style=flat&colorA=000000&colorB=000000)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/logry?style=flat&colorA=000000&colorB=000000)](LICENSE)

</div>

<div align="center">

[![📚 Read the Docs](https://img.shields.io/badge/📚%20Read%20the%20Docs-007477?style=for-the-badge)](https://yiming-liao.github.io/logry/docs/introduction/getting-started)

</div>

> _Lightweight. Customizable. Ready-to-go._  
> _Console-first. The rest? You decide._

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="Books" width="25" height="25" /> Outline

- [Output Preview](#-output-preview)
- [Quick Start 🚀](#-quick-start)
- [Features at a Glance](#-features-at-a-glance)
- [Presets](#-presets)
- [Core Concepts](#-core-concepts)
- [Architecture](#-architecture)
- [Devtools](#-devtools)
- [Development Mode Detection](#-development-mode-detection)

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /> Output Preview

Here’s how logs look in Node.js vs. the browser:

<table width="100%">
  <tbody>
  <tr>
    <td align="center" width="50%">
      <img src="logry-node.png" alt="Logry node" width="95%" /><br/>
      <em>Console output in Node.js</em>
    </td>
    <td align="center" width="50%">
      <img src="logry-browser.png" alt="Logry browser" width="95%" /><br/>
      <em>Console output in Browser</em>
    </td>
  </tr>
  </tbody>
</table>

> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Kissing%20Cat.png" alt="Kissing Cat" width="16" height="16" /> Not your style? No worries! It’s fully customizable.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Quick Start

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png" alt="Triangular Flag" width="16" height="16" /> Installation

```bash
npm install logry
```

or use **yarn**

```bash
yarn add logry
```

> Just playing in HTML? Load logry with a script tag:

```html
<!-- Use logry in any static HTML page via jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/logry@1.1.2/dist/browser-lite/index.global.min.js"></script>
<script>
  logry.info("Hey! I'm here!");
</script>
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="16" height="16" /> Using Static Logger Methods

The easiest way to use **Logry** is by calling its static logging methods.  
They work instantly without a logger instance, ignore level restrictions, and default to the **“pretty”** preset for clean output

```ts
import { trace, debug, info, warn, error, fatal } from "logry";

info("👋🏼 Hi there! Welcome to Logry!");

warn("User session is about to expire", { user: "John Doe" }); // second argument is metadata (meta)

error("Unexpected error occurred", new Error("Something went wrong")); // you can also pass an Error
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="16" height="16" /> Creating a Custom Logger Instance

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
<summary> 💭 <strong>Want a more customized setup?</strong></summary>

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

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Joystick.png" alt="Joystick" width="20" height="20" /> Connect with the Outside World

**Want to send your logs to files, Slack, or other services?**  
 Check out the [✨ Handlers & Integrations](https://yiming-liao.github.io/logry/docs/examples/handlers) to see how **Logry** integrates with real-world outputs.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png" alt="Smiling Face with Sunglasses" width="25" height="25" /> Features at a Glance

- 🌍 **Environment Agnostic** — Works across universal JavaScript runtimes including server, API, browser, Edge, and beyond

- ⚡️ **Zero Dependency & Lightning Fast** — Zero dependencies, fully typed, minimal runtime overhead

- 🎨 **Flexible Formatter Pipeline** — Customize every step from normalization to formatting with full control

- 📦 **Plugin-Ready Core** — Easily extendable with custom handlers and lifecycle hooks to build your own logging workflows

- 🔍 **Contextual Logging** — Supports separate meta and context data for flexible and clear log enrichment

- 🌳 **Scoped Loggers** — Organize and filter logs with nested, hierarchical scopes

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Shooting%20Star.png" alt="Shooting Star" width="25" height="25" /> Presets

**Logry** offers several built-in logger presets.  
 Each preset is a set of normalizer and formatter configs for different log styles.

| Preset            | Description                            |
| ----------------- | -------------------------------------- |
| `pretty`          | Formatted, easy to read                |
| `pretty-expanded` | expanded output with line breaks       |
| `minimal`         | Simple output with essential info only |
| `verbose`         | Full detail with context and depth     |

To use a preset, pass it when creating the logger:

```ts
const logger = logry({ preset: "pretty" });
```

Presets are fixed for now.  
🎯 Custom presets may come in future versions.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Comet.png" alt="Comet" width="25" height="25" /> Core Concepts

**Logry** is built with modularity, precision, and developer experience in mind.  
Here are the key concepts that define how it works:

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png" alt="Memo" width="16" height="16" /> Log Level

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

#### You can specify the desired log level when creating a logger instance

> Core-level configs like **level** are only applied when creating a new core.  
> If a core with the same ID exists, those configs will be ignored, and a warning will be logged.

```ts
// Initialize a logger with a preferred level
const logger = logry({ id: "my-app", level: "debug" });
```

#### Bypass the log level filter with force

Normally, the logger will only output messages at or above the configured level.  
However, you can force a log to be emitted regardless of the current level:

```ts
logger.force.error("Something went wrong!");
logger.force.info("This will show even if level is set to 'warn'");
```

> ⚠️ Use this with care—`force` is designed for exceptional situations where logs must be guaranteed to appear.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Teddy%20Bear.png" alt="Teddy Bear" width="16" height="16" /> Child Loggers

In **Logry**, every logger instance is lightweight and modular.  
You can freely create **child loggers** that inherit settings from their parent — while overriding only what you need.

#### Creating a Child Logger

You can use the `.child()` method to create a scoped or customized logger:

```ts
const logger = logry({ id: "main-app", level: "info" });

const authLogger = logger.child({
  level: "debug", // override log level
  scope: "auth", // add a scope
  context: { userType: "admin" }, // inject default context
});
```

#### Child Logger Inheritance

Child loggers inherit settings by merging properties differently depending on their type:

- `scope`: _Appended_  
   **["main"]** + **"auth"** → **["main", "auth"]**

- `context`: _Merged, child overrides_  
   **{ app: "main", user: "guest" }** + **{ user: "admin" }** → **{ app: "main", user: "admin" }**

- `formatterConfig / normalizerConfig`:  
  _Shallow merged per platform (**node**, **browser**), with child taking precedence_

This keeps child loggers **flexible and contextual**, without needing to re-specify everything.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Moai.png" alt="Moai" width="16" height="16" /> Logger Core

The core engine responsible for managing log levels, shared identity (id), and optional configurations for formatting, normalization, and handlers.

- Multiple logger instances can share a single core by specifying the same id, enabling centralized and synchronized log level management across instances.
- It supports dynamic runtime control of log verbosity:

  - `setLevel(level)`: updates the active log level
  - `resetLevel()`: restore to the initial log level

- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Factory.png" alt="Factory" width="16" height="16" /> When calling `logry()`, the system checks the Logger Core map by id.  
  If found, it returns a Logger linked to that core; otherwise, it creates a new core and returns a Logger.

> ⚠️ Note: Core configurations are fixed per **LoggerCore** identified by **id**.  
> Creating a logger with an existing id ignores new core-level options and logs a warning.

> ℹ️ Note: In **Edge** runtime environments, the Logger Core concept is intentionally not available.  
> This design aligns with the stateless and ephemeral nature of Edge environments.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Control%20Knobs.png" alt="Control Knobs" width="16" height="16" /> Handler Manager

Every Logger instance is paired with a dedicated **HandlerManager**,  
an internal module inherited from its **LoggerCore**.

> Where the **Logger** emits the log, the **HandlerManager** ensures your logs travel further,  
> writing to files, sending to remote servers, or reporting to dashboards, wherever needed 🌍

It orchestrates all registered log handlers, manages asynchronous tasks,  
and provides robust strategies for flushing, cleanup, and error recovery.

- ♻️ Handler lifecycle
  - Initializes handlers on registration
  - Optionally handles errors via a configurable **onError** callback
  - Disposes each handler safely when no longer needed
- 🔎 Async task tracking
  - Tracks all pending asynchronous log operations
  - Ensures that every delivery completes or fails safely
- ⏱️ Flush support
  - Call **flush(timeout?)** to wait for all pending handler tasks
  - Supports **flushStrategy** for time-based or event-driven flushing
- 🛑 Error recovery
  - Catches errors during log handling
  - Reports errors with handler ID and payload context via **onError**
- 🧼 Resource cleanup
  - **dispose()** cancels flush strategies, removes all handlers, and clears internal states

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png" alt="Classical Building" width="25" height="25" /> Architecture

**Logry** is designed with a focus on **console output** as the primary logging target.  
The Platform Transporter is tailored for each environment to efficiently handle core console output.

Beyond console output, tasks like _file writing_, _remote logging_, or _service integration_ are handled by flexible, user-defined **Handlers**.  
This plugin-like architecture allows you to easily extend or customize logging behavior without affecting the main console pipeline.

> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png" alt="Party Popper" width="20" height="20" /> _Think of the Platform Transporter as the reliable frontman, while Handlers are the creative backstage crew adding all the magic._

This architecture ensures that:

- The console remains the central output, optimized for each platform’s specifics.
- Other output destinations can be easily added or modified by introducing new Handlers.
- The system maintains consistency and reliability, while providing maximum flexibility to adapt to various use cases and environments.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Water%20Wave.png" alt="Water Wave" width="20" height="20" /> Log Pipeline

Building on the architecture described above,

When you call any logging method on your logger instance (e.g. **info()**, **error()**),  
it triggers two parallel paths internally:

- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png" alt="Airplane Departure" width="12" height="12" /> Platform Transporter: Normalizes, formats, and outputs logs to the console, optimized for the running environment.
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Control%20Knobs.png" alt="Control Knobs" width="12" height="12" /> HandlerManager: Runs additional handlers for side effects like writing files, sending logs remotely, or custom integrations.

```
                Logger.log()
                    ↓
     ┌───────────────────────────────┐
     │                               │
     ▼                               ▼
  ┌──────────────────────┐   ┌──────────────────┐
  │ Platform Transporter │   │  handlerManager  │
  │ (normalize, format,  │   │  .runHandlers()  │
  │  output to console)  │   └──────────────────┘
  └──────────────────────┘             │
                                       ▼
     ┌─────────────┬───────────────────┬───────────────┐
     │ FileHandler │ SendRemoteHandler │ CustomHandler │ ...
     └─────────────┴───────────────────┴───────────────┘
```

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png" alt="Airplane Departure" width="20" height="20" /> Transporter

When a log is passed to a Transporter, it flows through three clear stages:

1. 🔀 Normalization — Ensures a consistent, structured shape.
2. 🎨 Formatting — Transforms the data into a readable format.
3. 🖨 Output — Sends the final log to the destination **console**.

> **Note:**  
> In Node.js, **NodeConsoleTransporter** lazily appends fields like `pid` and `hostname`.  
> This is done asynchronously to ensure that **Logger.log()** remains synchronous and returns immediately.

#### Built-in Transporters

**Logry** ships with platform-aware console transporters,  
so your logs always show up in the right place—without any extra setup 🛠️

| Platform  | Transporter               | Output target                 |
| --------- | ------------------------- | ----------------------------- |
| `Node.js` | NodeConsoleTransporter    | Terminal console              |
| `Browser` | BrowserConsoleTransporter | Browser developer console     |
| `Edge`    | EdgeConsoleTransporter    | Platform console (plain text) |

Each transporter **activates only** in its matching runtime, and **does nothing** otherwise.

#### Universal by Default

Importing from "logry" gives you a universal logger with both **Node** and **browser** transporters attached:

```ts
import { logry } from "logry"; // Includes both NodeConsoleTransporter and BrowserConsoleTransporter

logry.info("Hello from anywhere");
```

> In Node.js, logs go to the terminal. In the browser, they appear in the browser console.  
> ⚡️ No extra configuration required.

#### Platform-Specific Variants

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

#### Edge Runtime Support

The "logry/edge" export is optimized for environments like Cloudflare Workers and other serverless platforms.  
It uses **EdgeConsoleTransporter**, a minimal transporter that prints plain-text logs to the platform’s console.

> ⚠️ Always use logry/edge in Edge runtimes.  
> Other versions rely on Node.js APIs and may fail to run.

```ts
import { logry } from "logry/edge";

logry.info("Hello from the Edge");
```

#### Design Principle: Console Only

> 🔮 Unlike traditional loggers that mix console output with side-effects,  
> **Logry** keeps things clean and focused.  
> Transporters handle console output only; for other log deliveries, use Handlers.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Shuffle%20Tracks%20Button.png" alt="Shuffle Tracks Button" width="25" height="25" /> Normalizer

Before any log is formatted, **Logry** first passes it through a platform-aware normalizer.  
This process ensures a consistent structure, reliable data types, and full flexibility for customization.

#### What it does

The Normalizer transforms a raw log payload into a normalized shape, handling core fields like:

- timestamp
- id
- level
- scope
- message
- meta
- context
- pid <sub>(_Node.js only_)</sub>
- hostname <sub>(_Node.js only_)</sub>

Each field has a dedicated normalizer, all of which can be overridden via custom logic.

#### Customization

Every normalizer supports a **customNormalizer** function, letting you override default behavior:

```ts
id: {
  customNormalizer: ({ fieldValue, raw }) => `node-${fieldValue}`, // e.g., "default" → "node-default"
  // fieldValue: the original value for the "id" field
  // raw: a snapshot of the full raw payload before any normalization
}
```

You can also fine-tune behavior using extra options per field.

| Field       | Extra Options Available     |
| ----------- | --------------------------- |
| `timestamp` | style, useUTC, showTimeOnly |
| `level`     | style                       |
| `scope`     | separator                   |
| `meta`      | errorStackLines             |

#### Platform Awareness

Normalization logic in Logry adapts based on the runtime environment,  
allowing logs to be tailored specifically for Node.js or Browser contexts.

For example:

- Timestamps appear as full ISO 8601 UTC strings in Node, but as simplified human-readable strings in the browser.

> You can define environment-specific behavior using the normalizerConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```ts
const logger = logry({
  // ...
  normalizerConfig: {
    node: {
      timestamp: {
        style: "iso", // Use full ISO format for timestamp in Node.js
        useUTC: true, // Display timestamp in UTC timezone
      },
      level: {
        style: "upper", // Show log level in uppercase (e.g., "ERROR")
      },
      meta: {
        errorStackLines: 10, // Limit error stack trace to 10 lines
      },
    },
    browser: {
      timestamp: {
        style: "pretty", // Use a more human-friendly timestamp format in browsers
        useUTC: false, // Display timestamp in local timezone
      },
      level: {
        style: "lower", // Show log level in lowercase (e.g., "error")
      },
    },
  },
  // ...
});
```

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Artist Palette" width="20" height="20" /> Formatter

The Formatter takes normalized log data and turns it into readable, styled output.  
It supports optional color coding to make logs clearer and easier to scan.

#### What it does

The Formatter receives normalized data and produces formatted strings (or structured content) ready for display.  
Handled fields include:

- timestamp
- id
- level
- scope
- message
- meta
- context
- pid <sub>(_Node.js only_)</sub>
- hostname <sub>(_Node.js only_)</sub>

Each part has its own formatter. All formatters support optional style customizations and can be overridden with custom logic.

#### Customization

Common format options apply to all formatter parts and include:

- `hide?: boolean;`
- `prefix?: string;`
- `suffix?: string;`
- `lineBreaks?: number;`
- `spaceAfter?: number;`

Every formatter supports a customFormatter function, letting you override default behavior:

```ts
message: {
  customFormatter: ({ fieldValue, raw }) => ({
    fieldValue: `! ${fieldValue}`, // e.g., "msg" → "! msg"
    withAnsiStyle: `\x1b[42m${fieldValue}`, // Used in Node.js when `useAnsiStyle` is enabled
    cssStyle: `border: 1px solid blue`, // Used in browsers for console styling
  }),
},
```

You can also fine-tune behavior using extra options per part.

| Platform  | Part      | Extra Options Available                                    |
| --------- | --------- | ---------------------------------------------------------- |
| `Node.js` | ALL       | ansiStyle, useAnsiStyle                                    |
| -         | `scope`   | showOnlyLatest, separator                                  |
| -         | `meta`    | format, indent, all InspectOptions (for format: **"raw"**) |
| -         | `context` | format, indent, all InspectOptions (for format: **"raw"**) |
| `Browser` | ALL       | cssStyle                                                   |
| -         | `scope`   | showOnlyLatest, separator                                  |
| -         | `meta`    | format, indent                                             |
| -         | `context` | format, indent                                             |

> **Note:** InspectOptions refers to the options supported by Node.js [util.inspect](https://nodejs.org/api/util.html#utilinspectobject-options).

#### Platform Awareness

Formatter behavior automatically adapts to the runtime platform, whether it is Node.js or the browser.  
 This ensures that log outputs remain clear, styled, and consistent across environments.

The output behavior varies depending on the platform:

| Platform  | Format output                                          | Styling mechanism                          |
| --------- | ------------------------------------------------------ | ------------------------------------------ |
| `Node.js` | Returns { fieldValue: string, withAnsiStyle?: string } | Uses ANSI escape codes (e.g. **\x1b[31m**) |
| `Browser` | Returns { fieldValue: string, cssStyle?: string }      | Uses %c and inline CSS                     |

> In the browser, the final result will be used with console.log("%c...%c...%c...", styleA, styleB, ...), allowing for per-part CSS styling.

For example:

- Timestamps appear as full ISO strings with ANSI colors in Node.js and as simplified text styled with CSS in the browser.
- Meta shows full depth in Node, but gets a prefix like “META | “ in Browser.
- Some fields (like level) can be hidden in one platform but shown in another.

> You can define environment-specific behavior using the formatterConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```ts
const logger = logry({
  // ...
  formatterConfig: {
    node: {
      timestamp: {
        ansiStyle: "\x1b[33m", // Yellow text for timestamp in Node.js
      },
      meta: {
        depth: null, // Show full depth for meta in Node.js
      },
      lineBreaksAfter: 2, // Add extra spacing after logs
    },
    browser: {
      timestamp: {
        cssStyle: "font-weight: bold; color: orange;", // Bold orange timestamp in browsers
      },
      meta: {
        prefix: "META | ", // Prefix meta with label in browsers
      },
      level: {
        hide: true, // Hide level field in browsers
      },
    },
  },
  // ...
});
```

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Joystick.png" alt="Joystick" width="25" height="25" /> Handlers

Handlers are modular units that define **_where_** and **_how_** a log should be delivered,  
whether to a console, file, or third-party service.

> They let a single logger send logs to multiple destinations simultaneously, managed smoothly behind the scenes.

💡 Handlers receive the raw log payload and process it asynchronously, enabling efficient, non-blocking log delivery.

You can add or remove handlers dynamically at runtime::

```ts
logger.addHandler(handler, id?, position?); // Adds a handler, returns the assigned ID
logger.removeHandler(id); // Removes the handler by ID
```

#### Creating Custom Handlers with BaseHandler

You can create custom handlers _from scratch_ by implementing your own `handle()` method,  
or **extend** Logry’s built-in **BaseHandler** to simplify the process.

🧱 **BaseHandler** provides core functionalities such as payload **normalization**, **formatting**, and **JSON serialization**,  
plus a safe execution flow, so you only need to focus on implementing the actual log delivery logic.

The key method to implement is:

```ts
abstract handle(rawPayload: RawPayload): Promise<void>;
```

Here are some useful protected methods you can use inside your custom handler:

| Method      | Signature                                                                                   | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `normalize` | `(rawPayload: RawPayload) => NormalizedPayload`                                             | Normalize the raw log payload into a consistent format.                               |
| `format`    | `(normalized: NormalizedPayload) => FormattedPayload`                                       | Format the normalized payload into a human-readable or styled format.                 |
| `toJson`    | `(rawPayload: RawPayload, options?: { useNormalizer?: boolean; space?: number }) => string` | Convert the raw payload into a JSON string, optionally normalized and pretty-printed. |

Example implementation:

```ts
import { NodeHandler } from "logry/handlers"; // 📦 Use built-in handler classes from the "logry/handlers" module.

class MyCustomHandler extends BaseHandler {
  async handle(rawPayload: RawPayload) {
    const normalized = this.normalize(rawPayload);
    const formatted = this.format(normalized);
    const message = `${formatted.level} | ${formatted.message}`;
    // Or for JSON output: const message = this.toJson(rawPayload)
    await sendToExternalService(message);
  }
}

logger.addHandler(new MyCustomHandler()); // Register the custom handler
```

### Platform-Specific Handlers

For more advanced scenarios, you can extend platform-specific base classes such as:

- `NodeHandler`
- `BrowserHandler`
- `EdgeHandler`

These classes build upon **BaseHandler**, and additionally expose a platform-optimized `compose()` method
that helps you generate the final log message string based on your formatter config and platform constraints.

Example implementation:

```ts
import { NodeHandler } from "logry/handlers"; // 📦 Use built-in base handlers from the "logry/handlers" module.

class MyCustomHandler extends NodeHandler {
  async handle(rawPayload: RawPayload) {
    const message = await this.compose(payload); // Async only in Node.js to append pid and hostname
    await sendToExternalService(message);
  }
}
```

> This makes it easy to build reliable and composable handlers,  
> whether you write files, send to remote servers, or push logs to cloud ingestion pipelines ☁️

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Devtools

Logry includes small tools to help you debug and inspect logger internals.

#### inspectLoggerCores()

List all registered LoggerCore instances.

```ts
import { inspectLoggerCores } from "logry/devtools";

inspectLoggerCores();
```

Helps you verify how loggers are created and linked.

#### inspectHandlerManagerConfig(logger)

Show the resolved handler config for a given logger.

```ts
import { inspectHandlerManagerConfig } from "logry/devtools";

inspectHandlerManagerConfig(myLogger);
```

Good for checking which rules and tasks are active.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Construction.png" alt="Construction" width="25" height="25" /> Development Mode Detection

This function detects whether the runtime is in development mode.  
 It is primarily used to control internal logging and error reporting within the library, such as internal-log and internal-error messages.

- In `Node.js`, it checks the NODE_ENV environment variable:

  - Returns true if `NODE_ENV` is not set to 'production'.
  - Defaults to true (development) if `NODE_ENV` is undefined.
    x

- In `Browsers`, it checks the global flag `__LOGRY_DEV__`:
  - Returns true if the flag is truthy.
  - Defaults to false (production) if undefined.

This setup assumes Node defaults to development mode for easier local testing, while browsers default to production to avoid unnecessary debug logs.

<!-- Back To Top -->
<div align="right">

[<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Upwards%20Button.png" alt="Upwards Button" width="25" height="25" />](#top)

</div>
