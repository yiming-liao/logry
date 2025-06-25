---
sidebar_position: 1
title: Devtools
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="36" height="36" /> Devtools

Logry includes small tools to help you debug and inspect logger internals.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> inspectLoggerCores()

List all registered LoggerCore instances.

```typeScript
import { inspectLoggerCores } from "logry/devtools";

inspectLoggerCores();
```

Helps you verify how loggers are created and linked.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> inspectHandlerManagerConfig(logger)

Show the resolved handler config for a given logger.

```typeScript
import { inspectHandlerManagerConfig } from "logry/devtools";

inspectHandlerManagerConfig(myLogger);
```

Good for checking which rules and tasks are active.
