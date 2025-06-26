---
sidebar_position: 3
title: Normalizer Config
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="36" height="36" /> Normalizer Config

> `NormalizerConfig` is an object used to define per-platform normalization behavior.

```ts
type NormalizerConfig = {
  node?: NodeNormalizerConfig;
  browser?: BrowserNormalizerConfig;
  edge?: EdgeNormalizerConfig;
};
```

All three platform configs share the same structure for most fields such as level, scope, and context, etc.  
The only difference is:
node includes additional fields like **pid** and **hostname**, which are only available in Node.js environments.

### Example

```ts
const logger = logry({
  normalizerConfig: {
    node: {
      timestamp: { style: "iso", useUTC: false, showTimeOnly: true },
      id: { customNormalizer: ({ fieldValue }) => `@${fieldValue}` },
      level: { style: "title" },
      scope: { separator: "." },
      meta: { errorStackLines: 5 },
    },
  },
});
```

### Platform NormalizerConfig Fields

| Field        | Options                                             |
| ------------ | --------------------------------------------------- |
| `timestamp?` | `{ customNormalizer, style, useUTC, showTimeOnly }` |
| `id?`        | `{ customNormalizer }`                              |
| `level?`     | `{ customNormalizer, style }`                       |
| `scope?`     | `{ customNormalizer, separator }`                   |
| `message?`   | `{ customNormalizer }`                              |
| `meta?`      | `{ customNormalizer, errorStackLines }`             |
| `context?`   | `{ customNormalizer }`                              |
| `pid?`       | `{ customNormalizer }`                              |
| `hostname?`  | `{ customNormalizer }`                              |
