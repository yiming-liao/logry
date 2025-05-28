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

## 🧭 Logger System 的屬性歸屬表：控制權與變動性

| 屬性名稱         | 層級            | 是否可變動 | 是否可繼承        | 備註說明                                                       |
| ---------------- | --------------- | ---------- | ----------------- | -------------------------------------------------------------- |
| `level`          | LoggerCore      | ✅ 是      | ✅ 是             | 允許透過 `Logger.setLevel()` 或動態更新；預設為 Core 的值      |
| `initialLevel`   | LoggerCore      | ❌ 否      | ❌ 否             | 僅供重設時使用，維持一致性                                     |
| `outputConfig`   | Logger          | ✅ 是      | ✅ 是（可合併）   | 支援動態變化，可透過 `child()` 傳入覆寫                        |
| `handlerConfig`  | LoggerCore      | ❌ 否      | ❌ 否             | 初始化後即固定，由 `HandlerManager` 負責應用                   |
| `handlerManager` | LoggerCore      | ✅ 是      | ✅ 是（共用）     | 控制 handler 的注冊與觸發邏輯，屬核心中控系統                  |
| `scope`          | Logger          | ✅ 是      | ✅ 是（可擴展）   | 適合做層級化標記，例如 module、function 名稱                   |
| `context`        | Logger          | ✅ 是      | ✅ 是（可擴展）   | 傳遞 metadata（例如 requestId、userId），可在 formatter 中讀取 |
| `core`           | Logger          | ❌ 否      | ✅ 是（持有參考） | 所有 Logger 共用同一 Core 實例                                 |
| `force`          | Logger          | ✅ 是      | ✅ 是             | 可跳過 log level 篩選，強制輸出                                |
| `logWithLevel`   | Logger          | ✅ 是      | ✅ 是             | 用來自動綁定 logger 的層級邏輯                                 |
| `formatter`      | outputConfig 層 | ✅ 是      | ✅ 是（可替換）   | 支援注入，控制格式（文字、JSON 等）                            |
| `id`             | LoggerCore      | ❌ 否      | ❌ 否             | 用來標記唯一 LoggerCore 實例                                   |

### 🔎 說明補充

- `LoggerCore` 是不會複製的，所有 `Logger` 都是 reference 它，適合作為單一真理來源。
- `Logger` 是可複製的，可以透過 `.child()` 傳入新的 scope、context、outputConfig，但依然沿用同一套 handler 系統。
- `context` 的用途會隨 log 訊息變化，是最適合用來放入動態 metadata 的欄位（例如每一個 API request 的追蹤資訊）。
- `outputConfig` 提供格式彈性，支援運行時切換不同格式輸出（例如 testing 時轉為 silent、或改為 JSON）。
