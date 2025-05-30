<p align="center">
  <!-- <img src="logry-logo.png" alt="logry Logo" width="150"  /> -->
</p>

<h1 align="center">Logry</h1>

<div align="center">

**Logry** is a lightweight, environment-agnostic logging library,  
built for both Node.js and modern browsers, written entirely in TypeScript.  
It offers scoped loggers, fully customizable output styles,  
and a factory-managed core for flexible setups.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/logry?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/logry)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/logry?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/logry)
[![License](https://img.shields.io/npm/l/logry?style=flat&colorA=000000&colorB=000000)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?style=flat&colorA=000000&colorB=000000)](https://www.typescriptlang.org/)

</div>

---

<h2>
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png" alt="Smiling Face with Sunglasses" width="25" height="25" /> Features at a Glance 
</h2>

- ⚡ **Lightweight & Type-Safe** — Written in TypeScript with zero runtime dependencies for safety and speed
- 🌍 **Universal Output** — Runs flawlessly in both Node.js and browser environments
- 🎨 Customizable Styles — Start with the default look and fully customize your own formatting
- 🧱 **Clean & Intuitive API** — Familiar methods (debug, info, warn, error) with zero learning curve
- 🌿 **Scoped Logging** — Organize logs with modular, hierarchical scopes
- 🧠 **Contextual Logs** — Pass and trace context (e.g., userId, requestId) across your app
- 🔁 **Global or Isolated Cores** — Use a shared core or spin up isolated ones per need

---

## Output Preview

The following example shows how logs appear in different environments:

<table width="100%">
  <tr>
    <td align="center" width="50%">
      <img src="logry-node.png" alt="logry node" width="95%" /><br/>
      <em>Console output in Node.js</em>
    </td>
    <td align="center" width="50%">
      <img src="logry-browser.png" alt="logry browser" width="95%" /><br/>
      <em>Console output in Browser</em>
    </td>
  </tr>
</table>

---

## Installation

```bash
npm install logry
```

or use **yarn**

```bash
yarn add logry
```

---

<h2> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" />  Quick Start </h2>

#### Using the Default Logger

The simplest way to use **logry** is by importing the default logging methods directly, which internally use a shared logger instance.

```typescript
import { debug, info, warn, error } from "logry";

// Simple debug message without extra data
debug("Fetching user profile from cache");

// Info message with additional metadata
info("User logged in", { userId: "user_123" });

// Skip meta by passing undefined, but track the current scope
warn("User session is about to expire", undefined, { scope: "qweqweqwe" });

// Log an error object directly
error("Unexpected error occurred", new Error("Something went wrong"));
```

#### Creating a Custom Logger

If you prefer a dedicated logger, you can create one with logry.
By default, the log level is set to 'warn'.

```typescript
import { logry } from "logry";

const logger = logry();

// ❌ Won't show up because the default level is 'warn', so 'info' is too low.
logger.info("User logged in");

// ✅ This one will appear since 'warn' is the default minimum level.
logger.warn("User login warning");
```

---

## Log Level

#### logry supports 4 standard log levels, in increasing order of verbosity:

| Level   | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| `error` | Logs critical failures. Always recommended to log unexpected conditions    |
| `warn`  | Logs recoverable issues or potential problems                              |
| `info`  | Logs general operational information and successful actions                |
| `debug` | Logs detailed internal information, useful during development or debugging |

The logger will only output messages at or above the current level.  
For example, if the level is set to 'warn', only warn and error messages will be printed.

#### You can specify the desired log level when creating a logger instance:

but this only affects the initial configuration and does not override the core’s log level.

```typescript
// Initialize a logger with a preferred level (for initial filtering)
const logger = logry({ id: "my-app", level: "debug" });
```

#### Or create a child logger with customized configuration:

```typescript
const debugLogger = logger.child({ level: "debug" });
```

---

## Advanced Features

#### Child Logger Instances

The .child() method creates a new logger instance that inherits all settings from its parent.  
You can pass options like scope, context, or outputConfig, which will be merged with the parent’s configuration.

Scopes in logry stack themselves up automatically — like breadcrumbs leading you through `auth > test` and beyond.  
Oh, and if you don’t like the `>` separator, you can totally customize that too!

```typescript
const authLogger = logger.child({ scope: "auth" });

authLogger.debug("Login attempt");
//  [21:37:53] [DEBUG] (auth)
//  • Login attempt

authLogger.child({ scope: "test" }).error("Token expired");
//  [21:49:41] [ERROR] (auth > test)
//  • Token expired
```

---

## Logger Output Configuration (writeConfig)

| Option                  | Type                        | Description                                                                   |
| ----------------------- | --------------------------- | ----------------------------------------------------------------------------- |
| `platform`              | `"auto", "node", "browser"` | Determines the output format per environment                                  |
| `hideId`                | `boolean`                   | Hides the logger ID in the output                                             |
| `hideContext`           | `boolean`                   | Hides context labels                                                          |
| `showOnlyLatestContext` | `boolean`                   | Show only the last context scope                                              |
| `hideDate`              | `boolean`                   | Hides the date portion (`YYYY-MM-DD`) and only displays the time (`HH:mm:ss`) |
| `node.metaDepth`        | `number`                    | Controls the max depth for object inspection                                  |
| `node.borderWidth`      | `number`                    | Sets the width of border lines                                                |
| `node.useColor`         | `boolean`                   | Enables or disables color output in Node.js                                   |

```typeScript
/** Example */
const logger = logry({
  id: "my-app",
  writeConfig: {
    platform: "node",
    hideId: true,
    hideContext: false,
    showOnlyLatestContext: true,
    hideDate: true,
    node: { metaDepth: 20, borderWidth: 90, useColor: false },
  },
});
```

---
