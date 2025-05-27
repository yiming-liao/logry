Logger -> log() -> dispatchLog() -> renderNodeLog() / renderBrowserLog() -> printNodeLog() / printBrowserLog()

| 層級           | 責任       | 可以擴充為…                                      |
| -------------- | ---------- | ------------------------------------------------ |
| Logger.log()   | API 入口   | 支援 logger context、label、tag、scope 等        |
| write()        | Dispatcher | 可新增條件分派：是否開啟追蹤、是否寫入檔案       |
| writeNode()    | Writer     | 拆分為 writeToConsole、writeToFile、writeToCloud |
| writeBrowser() | Writer     | 支援 console group、color、localStorage fallback |
| formatter      | 格式層     | 自訂格式化方式（可 inject）                      |
| handlerManager | 擴充點     | 支援 side effect，如監控、hook、通知等           |

Logger -> log() -> dispatchLog() -> renderNodeLog()
renderNodeLog裡面有 format-node-log(), print-node-log()
