<p align="center">
  <!-- <img src="logry-logo.png" alt="logry Logo" width="150"  /> -->
</p>
<h1 align="center">Logry</h1>

<div align="center">

**Logry** is a lightweight, environment-agnostic **logging library for Node.js and modern browsers**.  
It supports scoped loggers, customizable output styles, and factory-managed cores, and is written entirely in **TypeScript**.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/logry?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/logry)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/logry?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/logry)
[![License](https://img.shields.io/npm/l/logry?style=flat&colorA=000000&colorB=000000)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?style=flat&colorA=000000&colorB=000000)](https://www.typescriptlang.org/)

</div>

---

## Features

- ⚡ **Lightweight & Type-Safe** – Built with TypeScript, no runtime dependencies
- 🌍 **Universal Output** – Works in both Node.js and browser environments
- 🎨 **Customizable Styles** – Flexible log formatting per platform
- 🧱 **Factory-Controlled Cores** – Shared or isolated logger cores with unique IDs
- 🌿 **Scoped Logging** – Create context-aware child loggers
- 🧪 **Test-Friendly** – Easily resettable state for isolated test environments

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

## Quick Start

#### Using the Default Logger

The simplest way to use **logry** is by using the default logger instance, which has the ID 'default'.

```typescript
import { debug, info, warn, error } from "logry";

info("☀️ Application started");

// Output:
//  [2025-05-21 21:55:59] [default] [INFO]
//   • ☀️ Application started

//      message,       meta,                 LogOptions
debug("Checking...", { user: "John doe" }, { context: "dashboard" });

// Output:
//  [2025-05-21 21:55:59] [default] [DEBUG] (dashboard)
//   • Checking...
//  { user: 'John doe' }
```

#### Creating a Custom Logger

You can also create a custom logger instance with logry().  
By default, the log level will be set to 'warn'.

```typescript
import { logry } from "logry";

const logger = logry({ id: "my-app" }); // Creates a new logger instance with ID 'my-app'

logger.warn("Low disk space");
logger.info("Application started"); // Will not print if level is 'warn' (Default)
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

#### You can set the level globally or per instance:

```typescript
// Set log level when creating a logger
const logger = logry({ id: "my-app", level: "debug" });
```

#### Or override it in a child logger:

```typescript
const debugLogger = logger.child({ level: "debug" });
```

---

## Advanced Features

#### Child Logger Instances

You can create scoped loggers using the .child() method.
This helps organize logs by module, feature, or context.

```typescript
const authLogger = logger.child({ context: "auth" });

authLogger.debug("Login attempt");
//  [21:37:53] [DEBUG] (auth)
//  • Login attempt

authLogger.child({ context: "test" }).error("Token expired");
//  [21:49:41] [ERROR] (auth > test)
//  • Token expired
```

The child logger will inherit the parent logger’s configuration (such as log level),  
but will prepend its scope to all log messages for better traceability.

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
