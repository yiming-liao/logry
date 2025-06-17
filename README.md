<div align="center">
  <a href="https://yiming-liao.github.io/logry/docs/introduction/getting-started">
    <img src="logry-logo-rounded.png" alt="Logry node" width="100" height="100" />
  </a>
</div>

<h1 align="center">Logry</h1>

<div align="center">

A clean, lightweight, cross-platform logging library for Node.js and modern browsers,  
fully typed and customizable with scoped loggers, formatter pipelines,  
and modular handlers offering full flexibility for custom processing and delivery.

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

> Logging across fullstack apps is messy.  
> You jump between server and browser but most loggers don’t.  
> **Logry** is built for the monorepo era — _a fully typed logger that works the same everywhere._

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="Books" width="25" height="25" /> Outline

- [😎 Features at a Glance](#-features-at-a-glance)
- [🌟 Output Preview](#-output-preview)
- [🚩 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [🌠 Presets](#-presets)
- [☄️ Core Concepts](#-core-concepts)
  - [✨ Log Level](#-log-level)
  - [✨ Child Loggers](#-child-loggers)
  - [✨ Logger Core](#-logger-core)
- [🛫 Transporter](#-transporter)
- [🔀 Normalizer](#-normalizer)
- [🎨 Formatter](#-formatter)
- [📦 Handlers and HandlerManager](#-handlers-and-handlerManager)
- [🛠️ Devtools](#-devtools)
- [🚧 Development Mode Detection](#-development-mode-detection)

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png" alt="Smiling Face with Sunglasses" width="25" height="25" /> Features at a Glance

- 🌍 **Environment Agnostic** — Use the same logger in SSR, API routes, and the browser
- ⚡ **Zero Dependency & Fully Typed** — Written in TypeScript with no runtime bloat
- 🔍 **Built-in Context Support** — Inject trace data like requestId, userId and pass it downstream
- 🌳 **Scoped Loggers** — Organize logs with nested scopes like auth > login > error
- 🎨 **Fully Customizable Output** — Tweak every part of the format, or define your own
- 📦 **Plugin-Ready Core** — Extend via custom handlers and hooks with minimal effort

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /> Output Preview

Here’s how logs look in Node.js vs. the browser:

<table width="100%">
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
</table>

> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Kissing%20Cat.png" alt="Kissing Cat" width="16" height="16" /> Not your style? No worries! It’s fully customizable.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png" alt="Triangular Flag" width="25" height="25" /> Installation

```bash
npm install logry
```

or use **yarn**

```bash
yarn add logry
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Quick Start

### Using Static Logger Methods

The easiest way to use **Logry** is by calling its static logging methods.  
They work instantly without a logger instance, ignore level restrictions, and default to the **“pretty”** preset for clean output

```ts
import { trace, debug, info, warn, error, fatal } from "logry";

info("👋🏼 Hi there! Welcome to Logry!");

warn("User session is about to expire", { user: "John Doe" }); // second argument is metadata (meta)

error("Unexpected error occurred", new Error("Something went wrong")); // you can also pass an Error
```

### Creating a Custom Logger Instance

You can create a logger by calling **logry()**.  
By default, the log level is set to **"warn"**, so only logs with levels **"warn"**, **"error"**, and **"fatal"** will be shown.  
If you don’t specify an ID, the logger will use **"default"** as its identifier automatically.

```ts
import { logry } from "logry";

// Create a custom logger instance (defaults to id: 'default' and level: 'warn')
const logger = logry();

logger.info("User logged in"); // ❌ This won't be shown — 'info' is lower than the default 'warn' level

logger.warn("User login warning"); // ✅ This will be shown
```

- Basic Logger Setup for Development

```ts
import { logry } from "logry";

const logger = logry({
  id: "MyLogger",
  level: "debug", // Will show: debug, info, warn, error, fatal (trace will be hidden)
});
```

- Full Custom Logger Setup

```ts
import { logry } from "logry";

const logger = logry({
  id: "🌐 My Logger",
  level: "info",
  scope: ["auth", "api"],
  context: { env: "production", appVersion: "2.5.1" },
  preset: "verbose", // "pretty" | "pretty-multi-line" | "minimal" | "verbose"
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
    // ...
  },
});
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Shooting%20Star.png" alt="Shooting Star" width="25" height="25" /> Presets

**Logry** offers several built-in logger presets.  
 Each preset is a set of normalizer and formatter configs for different log styles.

| Preset              | Description                            |
| ------------------- | -------------------------------------- |
| `pretty`            | Formatted, easy to read                |
| `pretty-multi-line` | Multi-line output with line breaks     |
| `minimal`           | Simple output with essential info only |
| `verbose`           | Full detail with context and depth     |

To use a preset, pass it when creating the logger:

```ts
const logger = logry({ preset: "pretty" });
```

Presets are fixed for now.  
🎯 Custom presets may come in future versions.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Comet.png" alt="Comet" width="25" height="25" /> Core Concepts

**Logry** is built with modularity, precision, and developer experience in mind.  
Here are the key concepts that define how it works:

### ✨ Log Level

**Logry** supports **seven log levels**, ordered from most critical to most verbose:

| Level    |     | Description                                                                         |
| -------- | --- | ----------------------------------------------------------------------------------- |
| `fatal`  | ❗  | Logs critical system failures. The application may crash or exit immediately        |
| `error`  | ❌  | Logs runtime errors that should be investigated and typically require action        |
| `warn`   | ⚠️  | Logs recoverable issues or unexpected behaviors that don't prevent operation        |
| `info`   | ℹ️  | Logs general operational messages, such as successful startups or actions           |
| `debug`  | 🛠️  | Logs detailed internal information helpful for debugging                            |
| `trace`  | 🔍  | Logs the most granular details — every step, useful for profiling or deep debugging |
| `silent` | 🤐  | Disables all logging output                                                         |

The logger only outputs messages **at or above the current level**.  
For example, if the level is set to `warn`, only `warn`, `error`, and `fatal` logs will be printed.

#### You can specify the desired log level when creating a logger instance

> Core-level configs like **level** are only applied when creating a new core.  
> If a core with the same ID exists, those configs will be ignored, and a warning will be logged.

```ts
// Initialize a logger with a preferred level (for initial filtering)
const logger = logry({ id: "my-app", level: "debug" });
```

### ✨ Child Loggers

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

- Child loggers inherit settings with **shallow merging (first-level only)**:
  - **scope**: appended  
    e.g., **["main"] + "auth"** → **["main", "auth"]**
  - **context**: merged with child overriding  
    e.g., **{ app: "main", user: "guest" } + { user: "admin" }** → **{ app: "main", user: "admin" }**
  - **formatterConfig / normalizerConfig**: shallow merged per platform (**node**, **browser**), with child taking precedence

### ✨ Logger Core

The core engine responsible for managing log levels, shared identity (id), and optional configurations for formatting, normalization, and handlers.

- Multiple logger instances can share a single core by specifying the same id, enabling centralized and synchronized log level management across instances.
- It supports dynamic runtime control of log verbosity:
  - `setLevel(level)`: updates the active log level
  - `resetLevel()`: restore to the initial log level

This allows flexible adjustment of log output without needing to recreate logger instances.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png" alt="Airplane Departure" width="25" height="25" /> Transporter

When a log is passed to the Transporter,  
it first runs through the **Normalizer** to ensure a consistent and structured payload.  
Then, it uses the **Formatter** to convert the normalized data into styled, readable strings.  
Finally, the **Transporter** outputs the fully formatted log to the console or other targets.

### Built-in Transporters

Logry comes with two built-in transporters, automatically selected based on your runtime environment:

| Platform  | Transporter               | Styling mechanism                                    |
| --------- | ------------------------- | ---------------------------------------------------- |
| `Node.js` | NodeConsoleTransporter    | Prints logs to the terminal using ANSI styles        |
| `Browser` | BrowserConsoleTransporter | Prints logs to the DevTools console using CSS styles |

> These built-ins provide clean and consistent output across platforms with minimal overhead.

‼️ Currently, Logry does not support external transporter injection.

🔮 For advanced or custom delivery mechanisms (e.g., file output, remote logging),  
it is recommended to implement custom handlers.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Shuffle%20Tracks%20Button.png" alt="Shuffle Tracks Button" width="25" height="25" /> Normalizer

Before any log is formatted or transported, **Logry** first passes it through a platform-aware normalizer.  
This process ensures a consistent structure, reliable data types, and full flexibility for customization.

### What it does

The Normalizer transforms a raw log input into a normalized shape, handling core parts like:

- timestamp
- id
- level
- scope
- message
- meta
- context
- pid <sub>(_Node.js only_)</sub>
- hostname <sub>(_Node.js only_)</sub>

Each part has a dedicated normalizer, all of which can be overridden via custom logic.

### Customization

Every normalizer supports a customNormalizer function, letting you override default behavior:

```ts
id: {
  customNormalizer: ({ part }) => `node-${part}`, // e.g., "default" → "node-default"
}
```

You can also fine-tune behavior using extra options per part.

| Part        | Extra Options Available     |
| ----------- | --------------------------- |
| `timestamp` | style, useUTC, showTimeOnly |
| `level`     | style                       |
| `scope`     | separator                   |
| `meta`      | errorStackLines             |

### Platform Awareness

Normalization logic in Logry adapts based on the runtime environment,  
allowing logs to be tailored specifically for Node.js or Browser contexts.

For example:

- Timestamps appear as full ISO 8601 UTC strings in Node, but as simplified human-readable strings in the browser.

> You can define environment-specific behavior using the normalizerConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```ts
normalizerConfig: {
  node: {
    timestamp: {
      style: "iso",
      useUTC: true,
    },
    level: {
      style: "upper",
    },
    meta: {
      errorStackLines: 10,
    },
  },
  browser: {
    timestamp: {
      style: "pretty",
      useUTC: false,
    },
    level: {
      style: "lower",
    },
  },
},
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Artist Palette" width="25" height="25" /> Formatter

The Formatter layer takes the normalized parts of a log and converts them into the final output strings.  
These outputs are styled, easy to read, and can include optional color coding.

### What it does

The Formatter receives normalized data and produces formatted strings (or structured content) ready for display.  
Handled parts include:

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

### Customization

Every formatter supports a customFormatter function, letting you override default behavior:

```ts
level: {
  customFormatter: ({ part, rawPart }) => { // `rawPart` is the original unnormalized value
    if (rawPart === "warn") return `⚠️ ${part}`;
    return part;
  },
}
```

You can also fine-tune behavior using extra options per part.

| Platform  | Part      | Extra Options Available               |
| --------- | --------- | ------------------------------------- |
| `Node.js` | ALL       | ansiColor                             |
| -         | `scope`   | showOnlyLatest, seperator             |
| -         | `meta`    | format, depth (for format: **"raw"**) |
| -         | `context` | format, depth (for format: **"raw"**) |
| `Browser` | ALL       | cssStyle                              |
| -         | `scope`   | showOnlyLatest, seperator             |
| -         | `meta`    | format                                |
| -         | `context` | format                                |

### Platform Awareness

Formatter behavior automatically adapts to the runtime platform, whether it is Node.js or the browser.  
 This ensures that log outputs remain clear, styled, and consistent across environments.

The output behavior varies depending on the platform:

| Platform  | Format output                                  | Styling mechanism                          |
| --------- | ---------------------------------------------- | ------------------------------------------ |
| `Node.js` | Returns { [k]: string, withAnsiColor: string } | Uses ANSI escape codes (e.g. **\x1b[31m**) |
| `Browser` | Returns { [k]: string, cssStyle: string }      | Uses %c and inline CSS                     |

> In the browser, the final result will be used with console.log("%c...%c...%c...", styleA, styleB, ...), allowing for per-part CSS styling.

For example:

- Timestamps appear as full ISO strings with ANSI colors in Node.js and as simplified text styled with CSS in the browser.
- Meta shows full depth in Node, but gets a prefix like “META | “ in Browser.
- Some parts (like level) can be hidden in one platform but shown in another.

> You can define environment-specific behavior using the formatterConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```ts
formatterConfig: {
  node: {
    timestamp: {
      ansiColor: "\x1b[33m",
    },
    meta: {
      depth: null,
    },
    lineBreaksAfter: 2,
  },
  browser: {
    timestamp: {
      cssStyle: "font-weight: bold; color: orange;",
    },
    meta: {
      prefix: "META | ",
    },
    level: {
      hide: true,
    },
  },
},
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Package.png" alt="Package" width="25" height="25" /> Handlers and HandlerManager

Each Logger instance internally binds to a **HandlerManager**, inherited from its **LoggerCore**.  
This module orchestrates all registered log handlers, manages asynchronous tasks, and controls error recovery and flush strategies.

### What Are Handlers?

Handlers are modular units that define **_where_** and **_how_** a log should be delivered,  
 whether to the console, a file, or a third-party service.

💡 They receive the raw log payload and can process it synchronously or asynchronously.

You can add or remove them dynamically at runtime:

```ts
logger.addHandler(handler, id?, position?); // Adds a handler, returns the assigned ID
logger.removeHandler(id); // Removes the handler by ID
```

### What Is the HandlerManager?

The HandlerManager orchestrates all registered handlers.  
It ensures your logs are reliably processed, even in asynchronous or failure-prone environments.

- ♻️ Handler lifecycle
  - Initializes handlers on registration
  - Optionally handles errors via a configurable onError callback
  - Disposes each handler safely when no longer needed
- 🔎 Async task tracking
  - Tracks all pending asynchronous log operations
  - Ensures that every delivery completes or fails safely
- ⏱️ Flush support
  - Call **flush(timeout?)** to wait for all pending handler tasks
  - Supports flushStrategy for scheduled or event-based flush triggers
- 🛑 Error recovery
  - Catches errors during log handling
  - Reports them via the **onError** callback (with handler ID and context)
- 🧼 Resource cleanup
  - **dispose()** cancels flush strategies, removes all handlers, and clears internal states

> Whether you’re logging to local files, remote servers, or cloud dashboards,  
> the HandlerManager makes it reliable and composable 🌐

### Creating Custom Handlers with BaseHandler

To create your own log destinations, you can extend the **BaseHandler** class.

🧱 This class provides core functionalities such as payload preparation, normalization, formatting,  
 and safe execution flow, so you only need to focus on implementing the log delivery logic.

The key method to implement is:

```ts
abstract handle(rawPayload: RawPayload): Promise<void>;
```

Here are some useful protected methods you can use inside your custom handler:

| Method      | Signature                                                                                            | Description                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `normalize` | `(rawPayload: RawPayload) => Promise<NormalizedPayload>`                                             | **Normalize** the raw log payload into a consistent format.                               |
| `format`    | `(normalized: NormalizedPayload) => NodeFormattedPayload`                                            | **Format** the normalized payload into a string or structured output.                     |
| `compose`   | `(rawPayload: RawPayload) => Promise<string>`                                                        | **Normalize**, **format**, and **compose** the raw payload into the final string message. |
| `toJson`    | `(rawPayload: RawPayload, options?: { useNormalizer?: boolean; space?: number }) => Promise<string>` | Convert the raw payload into a JSON string, optionally normalized and pretty-printed.     |

Example implementation:

```ts
class MyCustomHandler extends BaseHandler {
  async handle(rawPayload: RawPayload) {
    const message = await this.compose(rawPayload);
    await sendToExternalService(message);
  }
}
```

> This makes it easy to build reliable and composable handlers,  
> whether you write files, send to remote servers, or push logs to cloud ingestion pipelines ☁️

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

#### inspectHandlerConfig(logger)

Show the resolved handler config for a given logger.

```ts
import { inspectHandlerConfig } from "logry/devtools";

inspectHandlerConfig(myLogger);
```

Good for checking which rules and tasks are active.

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
