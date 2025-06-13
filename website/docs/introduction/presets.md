---
sidebar_position: 3
---

# Presets

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Milky%20Way.png" alt="Milky Way" width="25" height="25" /> **Logry** offers several built-in logger presets. Each preset is a set of normalizer and formatter settings for different log styles.

| Level               | Description                            |
| ------------------- | -------------------------------------- |
| `json`              | Raw JSON output, good for machines     |
| `pretty`            | Formatted, easy to read                |
| `pretty-multi-line` | Multi-line output with line breaks     |
| `minimal`           | Simple output with essential info only |
| `verbose`           | Full detail with context and depth     |

To use a preset, pass it when creating the logger:

```typeScript
const logger = logry({ preset: "pretty" })
```

Presets are fixed for now.  
🎯 Custom presets may come in future versions.
