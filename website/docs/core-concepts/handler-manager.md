---
sidebar_position: 4
title: Handler Manager
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Control%20Knobs.png" alt="Control Knobs" width="36" height="36" /> Handler Manager

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
