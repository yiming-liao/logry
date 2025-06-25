---
sidebar_position: 3
title: Logger Core
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Moai.png" alt="Moai" width="36" height="36" /> Logger Core

The core engine responsible for managing log levels, shared identity (id), and optional configurations for formatting, normalization, and handlers.

- Multiple logger instances can share a single core by specifying the same id, enabling centralized and synchronized log level management across instances.
- It supports dynamic runtime control of log verbosity:

  - `setLevel(level)`: updates the active log level
  - `resetLevel()`: restores to the initial log level

- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Factory.png" alt="Factory" width="20" height="20" /> When calling logry(), the system checks the Logger Core map by id.  
  If found, it returns a Logger linked to that core; otherwise, it creates a new core and returns a Logger.

> ⚠️ Note: Core configurations are fixed per **LoggerCore** identified by **id**.  
> Creating a logger with an existing id ignores new core-level options and logs a warning.

> ℹ️ Note: In **Edge** runtime environments, the Logger Core concept is intentionally not available.  
> This design aligns with the stateless and ephemeral nature of Edge environments.

👀 Want to see the current cores?  
Check them out with the `inspectLoggerCores()` in [Devtools](/logry/docs/debugging-and-tools/devtools).
