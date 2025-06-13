---
sidebar_position: 3
---

# Logger Core

The core engine responsible for managing log levels, shared identity (id), and optional configurations for formatting, normalization, and handlers.

- Multiple logger instances can share a single core by specifying the same id, enabling centralized and synchronized log level management across instances.
- It supports dynamic runtime control of log verbosity:
  - `setLevel(level)`: updates the active log level
  - `resetLevel()`: restore to the initial log level

This allows flexible adjustment of log output without needing to recreate logger instances.
