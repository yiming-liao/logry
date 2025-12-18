<h1 align="center">Logry</h1>

<div align="center">

Console-first, native, and universal logging for JavaScript.  
A modular pipeline for structured and extensible log flows.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/logry?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/logry)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/logry?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/logry)
[![Coverage Status](https://img.shields.io/coveralls/github/yiming-liao/logry.svg?branch=main&style=flat&colorA=000000&colorB=000000)](https://coveralls.io/github/yiming-liao/logry?branch=main)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?style=flat&colorA=000000&colorB=000000)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/logry?style=flat&colorA=000000&colorB=000000)](LICENSE)

</div>

> Built for **_human-readable_** logs first, not added later.

## Features

- 🌐 **Runtime-agnostic** — consistent logging across all JavaScript runtimes, built on the native console.
- 🌊 **Hook-based pipeline** — a composable logging flow, fully customizable with hooks and plugins.
- 🎨 **Render & styling** — fine-grained control over layout and visual presentation.

## Installation

```bash
# npm
npm install logry

# yarn
yarn add logry

# pnpm
pnpm add logry
```

Or load it directly from a CDN:

```js
import { logry } from "https://cdn.jsdelivr.net/npm/logry/+esm";
```

## Quick Start

> The examples below work wherever JavaScript runs.

#### Create a logger

- Create a logger instance for consistent configuration across your application.

```ts
import { logry } from "logry";

const logger = logry();

logger.error("Authentication failed.");
```

#### Standalone logging

- Use standalone methods for simple, one-off logs.

```ts
import { error } from "logry";

error("Unexpected error.");
```

### Configuration

Configure a logger when creating it, or adjust behavior for a single log entry.

- Create-time configuration

```ts
const logger = logry({
  id: "my-logger", // Logger identity
  level: "trace", // Minimum log level
  scope: ["api", "auth"], // Default scope
  context: { ver: "1.2.1" }, // Shared context for all logs
  preset: "pretty", // Preset for default behavior

  // Pipeline configurations
  normalizeConfig: { meta: { errorStackLines: 5 } },
  formatConfig: { timestamp: { format: "iso" } },
  renderConfig: { message: { prefix: "⚡️ ", marginAfter: 1 } },
  printConfig: { consoleMode: "log", lineBreaksAfter: 1 },
});
```

- Runtime options

```ts
logger.warn("A msg.", { scope: "login", printConfig: { lineBreaksBefore: 2 } });
```

### Method overloads

Log methods support flexible argument patterns:

```ts
// log(message, options?)
log("Message", options);

// log(meta, options?)
log({ key: "value" }, options);

// log(message, meta, options?)
log("Message", { key: "value" }, options);
```

---

## Hooks & Plugins

Logry is built around a hook-based pipeline,  
making it easy to customize behavior or build plugins.

### Official Plugins

1. **Discord plugin** — send logs to Discord via webhooks

```ts
import { discordPlugin } from "logry/plugins";

logger.use(discordPlugin("https://discord.com/api/webhooks/13869..."));
```

> <sub><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="20" height="20" /></sub> More official plugins are under development.
