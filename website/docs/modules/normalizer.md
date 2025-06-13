---
sidebar_position: 1
---

# Normalizer

Before any log is formatted or transported, **Logry** runs it through a platform-aware normalizer — ensuring consistent structure, reliable types, and flexible customization

### What it does

The Normalizer transforms a raw log input into a normalized shape, handling core parts like:

- timestamp
- id
- level
- scope
- message
- meta
- context

Each part has a dedicated normalizer, all of which can be overridden via custom logic.

### Customization

Every normalizer supports a customNormalizer function, letting you override default behavior:

```typescript
customNormalizer?: ({ part }) => NormalizedValue;
```

You can also fine-tune behavior using extra options per part.

| Part        | Extra Options Available     |
| ----------- | --------------------------- |
| `timestamp` | style, useUTC, showTimeOnly |
| `level`     | style                       |
| `scope`     | separator                   |
| `meta`      | errorStackLines             |

### Platform Awareness

Normalization logic can vary between Node and Browser environments, adapting behavior accordingly.

For example:

- Timestamps appear as full ISO 8601 UTC strings in Node, but as simplified human-readable strings in the browser.
- Error stack traces can be more verbose on the server, while trimmed on the client.

> You can define environment-specific behavior using the normalizerConfig structure.  
> It can be set globally in **logry(...)**, scoped to a **logger.child(...)**, or **overridden per log method**:

```typeScript
 normalizerConfig: {
    node: {
      timestamp: {
        style: "iso",
        useUTC: true,
      },
      meta: {
        errorStackLines: 10,
      },
      level: {
        style: "upper",
      },
      id: {
        customNormalizer: ({ part }) => `node-${part}`,
      },
    },
    browser: {
      timestamp: {
        style: "pretty",
        useUTC: false,
      },
      meta: {
        errorStackLines: 3,
      },
      level: {
        style: "lower",
      },
    },
  },
```
