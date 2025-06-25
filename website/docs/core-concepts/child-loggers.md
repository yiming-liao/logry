---
sidebar_position: 2
title: Child Loggers
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Teddy%20Bear.png" alt="Teddy Bear" width="36" height="36" /> Child Loggers

In **Logry**, every logger instance is lightweight and modular.  
You can freely create **child loggers** that inherit settings from their parent — while overriding only what you need.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Creating a Child Logger

You can use the `.child()` method to create a scoped or customized logger:

```ts
const logger = logry({ id: "main-app", level: "info" });

const authLogger = logger.child({
  level: "debug", // override log level
  scope: "auth", // add a scope
  context: { userType: "admin" }, // inject default context
});
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="20" height="20" /> Child Logger Inheritance

Child loggers inherit settings by merging properties differently depending on their type:

- **`scope`**: **_Appended_**  
   `["main"]` + `"auth"` → `["main", "auth"]`

- **`context`**: **_Merged, child overrides_**  
   `{ app: "main", user: "guest" }` + `{ user: "admin" }` → `{ app: "main", user: "admin" }`

- **`formatterConfig` / `normalizerConfig`**:  
  **_Shallow merged per platform (`node`, `browser`), with child taking precedence_**

⭐ This keeps child loggers **flexible and contextual**, without needing to re-specify everything.
