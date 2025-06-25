---
sidebar_position: 2
title: Development Mode Detection
---

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Construction.png" alt="Construction" width="36" height="36" /> Development Mode Detection

This function detects whether the runtime is in development mode.  
 It is primarily used to control internal logging and error reporting within the library, such as internal-log and internal-error messages.

- In `Node.js`, it checks the NODE_ENV environment variable:

  - Returns true if `NODE_ENV` is not set to 'production'.
  - Defaults to true (development) if `NODE_ENV` is undefined.

- In `Browsers`, it checks the global flag `__LOGRY_DEV__`:
  - Returns true if the flag is truthy.
  - Defaults to false (production) if undefined.

This setup assumes Node defaults to development mode for easier local testing, while browsers default to production to avoid unnecessary debug logs.
