---
sidebar_position: 3
title: Presets
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Shooting%20Star.png" alt="Shooting Star" width="36" height="36" /> Presets

**Logry** offers several built-in logger presets.  
Each preset is a set of normalizer and formatter settings for different log styles.

| Preset            | Description                            |
| ----------------- | -------------------------------------- |
| `pretty`          | Formatted, easy to read                |
| `pretty-expanded` | expanded output with line breaks       |
| `minimal`         | Simple output with essential info only |
| `verbose`         | Full detail with context and depth     |

To use a preset, pass it when creating the logger:

```ts
const logger = logry({ preset: "pretty" });
```

Presets are fixed for now.  
🎯 Custom presets may come in future versions.
