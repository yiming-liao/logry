---
sidebar_position: 1
---

# Getting Started

Welcome to **Logry** — your new best friend for logging in TypeScript and JavaScript projects.

<h2>
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png" alt="Smiling Face with Sunglasses" width="25" height="25" /> Features at a Glance 
 </h2>

- **Clean & Simple Log API**
<p style={{opacity:0.8, margin:0}}>Familiar methods like debug, info, warn, and error — straightforward, intuitive, and just works.</p>
- **Contextual Logs with Meta**
<p style={{opacity:0.8, margin:0}}>Add metadata like user IDs or request info to every log. Need scoped context? Use child loggers to pass it down cleanly.</p>
- **Stylish by Default, Flexible by Design**
<p style={{opacity:0.8, margin:0}}>Logs look great out of the box — and you can fully customize output formats: JSON, pretty, minimal, or tailor-made.</p>
- **One Logger to Rule Them All**
<p style={{opacity:0.8, margin:0}}>Manage a single global logger via logry. No boilerplate, no instance juggling — just plug and log.</p>
- **Contextual Logging via Child Loggers**
<p style={{opacity:0.8, margin:0}}>Create child loggers that inherit context from parents — perfect for modular apps, background jobs, or per-request tracing.</p>

<h2> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" />  Quick Start </h2>

Install Logry:

```bash
npm install logry
```

Or use _yarn_

```bash
yarn add logry
```

<h2> Basic Usage </h2>

Start with the default logging methods:

```typescript
import { debug, info, warn, error } from "logry";

debug("Fetching user profile from cache");

info("User logged in", { userId: "user_123" });

warn("User session is about to expire");

error("Unexpected error occurred", new Error("Something went wrong"));
```

Prefer a global logger? Use logry to define one:

```typescript
import { logry } from "logry";

const logger = logry({ id: "api" });

logger.info("Auth success");
```

<h2> 💡 Ready to level up? </h2>

Learn how to customize log formats, create child loggers, and structure logs with metadata in our **Tutorials** and **API Reference**.
