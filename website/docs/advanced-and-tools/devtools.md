---
sidebar_position: 1
---

# Devtools

Logry includes small tools to help you debug and inspect logger internals.

#### inspectLoggerCores()

List all registered LoggerCore instances.

```typeScript
import { inspectLoggerCores } from "logry/devtools";

inspectLoggerCores();
```

Helps you verify how loggers are created and linked.

#### inspectHandlerConfig(logger)

Show the resolved handler config for a given logger.

```typeScript
import { inspectHandlerConfig } from "logry/devtools";

inspectHandlerConfig(myLogger);
```

Good for checking which rules and tasks are active.
