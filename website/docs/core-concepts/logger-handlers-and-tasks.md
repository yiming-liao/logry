---
sidebar_position: 4
---

# Logger Handlers and Tasks

Each Logger instance internally binds to a HandlerManager, inherited from its LoggerCore.

This module orchestrates all registered log handlers, manages asynchronous tasks, and controls error recovery and flush strategies.

- Handlers are responsible for final log delivery, such as writing to the console, server, or external services.
- You can dynamically attach or remove handlers:
  - `addHandler(handler, id?)`
  - `removeHandler(id)`
- It also ensures all async handlers complete with:
  - `flush(timeout?)`: waits for pending log operations
  - `dispose()`: clean up all resources and cancel strategies

Behind the scenes, HandlerManager tracks pending tasks and gracefully handles errors via configurable callbacks and timeout policies.

This flexible system allows reliable logging — even in asynchronous or failure-prone environments.
