---
sidebar_position: 2
title: Log Pipeline
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Water%20Wave.png" alt="Water Wave" width="36" height="36" /> Log Pipeline

Building on the architecture described above,

When you call any logging method on your logger instance (e.g. **info()**, **error()**),  
it triggers two parallel paths internally:

- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png" alt="Airplane Departure" width="16" height="16" /> Platform Transporter: Normalizes, formats, and outputs logs to the console, optimized for the running environment.
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Control%20Knobs.png" alt="Control Knobs" width="16" height="16" /> HandlerManager: Runs additional handlers for side effects like writing files, sending logs remotely, or custom integrations.

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

> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Joystick.png" alt="Joystick" width="20" height="20" /> **Want to send your logs to files, Slack, or other services?**  
> Check out the [✨ Handlers & Integrations](../examples/handlers.md) to see how Logry integrates with real-world outputs.
