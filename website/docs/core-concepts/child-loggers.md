---
sidebar_position: 2
---

# Child Loggers

In **Logry**, every logger instance is lightweight and modular.  
You can freely create **child loggers** that inherit settings from their parent — while overriding only what you need.

<h4> Creating a Child Logger </h4>

You can use the `.child()` method to create a scoped or customized logger:

```ts
const appLogger = logry({ id: "main-app", level: "info" });

const authLogger = appLogger.child({
  level: "debug", // override log level
  scope: "auth", // add a scope
  context: { userType: "admin" }, // inject default context
});
```

- Child loggers inherit settings with **shallow merging (first-level only)**:
  - **scope**: appended  
    e.g., `["main"] + "auth"` → `["main", "auth"]`
  - **context**: merged with child overriding
    e.g., `{ app: "main", user: "guest" }` + `{ user: "admin" }` → `{ app: "main", user: "admin" }`
  - **formatterConfig / normalizerConfig**: shallow merged per platform (**node**, **browser**), with child taking precedence

This keeps child loggers flexible and contextual — without needing to re-specify everything.
