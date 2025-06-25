---
sidebar_position: 4
title: Normalizer
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Shuffle%20Tracks%20Button.png" alt="Shuffle Tracks Button" width="36" height="36" /> Normalizer

Before any log is formatted, **Logry** first passes it through a platform-aware normalizer.  
This process ensures a consistent structure, reliable data types, and full flexibility for customization.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> What it does

The Normalizer transforms a raw log payload into a normalized shape, handling core fields like:

- timestamp
- id
- level
- scope
- message
- meta
- context
- pid <sub>(_Node.js only_)</sub>
- hostname <sub>(_Node.js only_)</sub>

Each field has a dedicated normalizer, all of which can be overridden via custom logic.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Customization

Every normalizer supports a **customNormalizer** function, letting you override default behavior:

```ts
id: {
  customNormalizer: ({ fieldValue, raw }) => `node-${fieldValue}`, // e.g., "default" → "node-default"
  // fieldValue: the original value for the "id" field
  // raw: a snapshot of the full raw payload before any normalization
}
```

You can also fine-tune behavior using extra options per field.

| Field       | Extra Options Available     |
| ----------- | --------------------------- |
| `timestamp` | style, useUTC, showTimeOnly |
| `level`     | style                       |
| `scope`     | separator                   |
| `meta`      | errorStackLines             |

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Platform Awareness

Normalization logic in Logry adapts based on the runtime environment,  
allowing logs to be tailored specifically for Node.js or Browser contexts.

For example:

- Timestamps appear as full ISO 8601 UTC strings in Node, but as simplified human-readable strings in the browser.

> You can define environment-specific behavior using the normalizerConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```ts
const logger = logry({
  // ...
  normalizerConfig: {
    node: {
      timestamp: {
        style: "iso", // Use full ISO format for timestamp in Node.js
        useUTC: true, // Display timestamp in UTC timezone
      },
      level: {
        style: "upper", // Show log level in uppercase (e.g., "ERROR")
      },
      meta: {
        errorStackLines: 10, // Limit error stack trace to 10 lines
      },
    },
    browser: {
      timestamp: {
        style: "pretty", // Use a more human-friendly timestamp format in browsers
        useUTC: false, // Display timestamp in local timezone
      },
      level: {
        style: "lower", // Show log level in lowercase (e.g., "error")
      },
    },
  },
  // ...
});
```
