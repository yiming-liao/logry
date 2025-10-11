---
sidebar_position: 6
title: Handlers
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Joystick.png" alt="Joystick" width="36" height="36" /> Handlers

Handlers are modular units that define **_where_** and **_how_** a log should be delivered,  
whether to a console, file, or third-party service.

> They let a single logger send logs to multiple destinations simultaneously, managed smoothly behind the scenes.

💡 Handlers receive the raw log payload and process it asynchronously, enabling efficient, non-blocking log delivery.

You can add or remove handlers dynamically at runtime::

```ts
logger.addHandler(handler, id?, position?); // Adds a handler, returns the assigned ID
logger.removeHandler(id); // Removes the handler by ID
```

> **Want to see Handlers in action?**  
> Check out the [✨ Handlers & Integrations](../examples/handlers.md) for practical code samples and integration tips.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Creating Custom Handlers with BaseHandler

You can create custom handlers _from scratch_ by implementing your own `handle()` method,  
or **extend** Logry’s built-in **BaseHandler** to simplify the process.

🧱 **BaseHandler** provides core functionalities such as payload **normalization**, **formatting**, and **JSON serialization**,  
plus a safe execution flow, so you only need to focus on implementing the actual log delivery logic.

The key method to implement is:

```ts
abstract handle(rawPayload: RawPayload): Promise<void>;
```

Here are some useful protected methods you can use inside your custom handler:

| Method      | Signature                                                                                   | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `normalize` | `(rawPayload: RawPayload) => NormalizedPayload`                                             | Normalize the raw log payload into a consistent format.                               |
| `format`    | `(normalized: NormalizedPayload) => FormattedPayload`                                       | Format the normalized payload into a human-readable or styled format.                 |
| `toJson`    | `(rawPayload: RawPayload, options?: { useNormalizer?: boolean; space?: number }) => string` | Convert the raw payload into a JSON string, optionally normalized and pretty-printed. |

Example implementation:

```ts
import { NodeHandler } from "logry"; // 📦 Use built-in base handlers from the "logry/handlers" module.

class MyCustomHandler extends BaseHandler {
  async handle(rawPayload: RawPayload) {
    const normalized = this.normalize(rawPayload);
    const formatted = this.format(normalized);
    const message = `${formatted.level} | ${formatted.message}`;
    // Or for JSON output: const message = this.toJson(rawPayload)
    await sendToExternalService(message);
  }
}

logger.addHandler(new MyCustomHandler()); // Register the custom handler
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Platform-Specific Handlers

For more advanced scenarios, you can extend platform-specific base classes such as:

- `NodeHandler`
- `BrowserHandler`
- `EdgeHandler`

These classes build upon **BaseHandler**, and additionally expose a platform-optimized `compose()` method
that helps you generate the final log message string based on your formatter config and platform constraints.

Example implementation:

```ts
import { NodeHandler } from "logry"; // 📦 Use built-in base handlers from the "logry/handlers" module.

class MyCustomHandler extends NodeHandler {
  async handle(rawPayload: RawPayload) {
    const message = await this.compose(payload); // Async only in Node.js to append pid and hostname
    await sendToExternalService(message);
  }
}
```

> This makes it easy to build reliable and composable handlers,  
> whether you write files, send to remote servers, or push logs to cloud ingestion pipelines ☁️
