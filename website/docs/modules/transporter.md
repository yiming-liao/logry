---
sidebar_position: 3
---

# Transporter

The Transporter is the final step in the logging pipeline — responsible for delivering the formatted log to its destination.  
After a log is normalized and formatted, the Transporter takes over and outputs it — whether that’s the terminal in Node.js, or the DevTools console in a browser.

### Built-in Transporters

Logry comes with two built-in transporters, automatically selected based on your runtime environment:

| Platform  | Transporter               | Styling mechanism                                    |
| --------- | ------------------------- | ---------------------------------------------------- |
| `Node.js` | NodeConsoleTransporter    | Prints logs to the terminal using ANSI styles        |
| `Browser` | BrowserConsoleTransporter | Prints logs to the DevTools console using CSS styles |

These built-ins are designed to be minimal yet effective — providing clean and consistent output across platforms.  
🎯 In future versions, Logry will support custom transporters for advanced use cases like file writing, remote logging, or API-based delivery.
