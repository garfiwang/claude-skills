# 早晨日報系統 (Morning Briefing) (morning-briefing)

[![Version: v1.1.0](https://img.shields.io/badge/Version-v1.1.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Productivity-Automation-green.svg)](../../README.md)

> **一句話介紹**：自動聚合 Gmail 重要郵件、Google Calendar 行程與 Notion 專案待辦，產出高質感互動式 HTML 早晨日報。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **資訊碎片化**：每天早上需在 3~4 個 App 間切換確認行程與任務，耗時且易漏掉重要行程。
2. **缺乏全景視角**：無法快速一眼掌握『今日時間塊分配』與『待辦優先級』。
3. **無存檔歷史**：過去的工作紀錄分散，每週回顧時難以溯源。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `morning`
* `/morning`
* `早晨日報`
* `早報`

---

## 🛠️ 核心工作流程與規範

1. **查詢 Google Calendar**：取得當日會議、行程與時間塊。
2. **檢索 Gmail 重要郵件**：篩選未讀高優先信件並生成 2 句話摘要。
3. **讀取 Notion Tasks & Projects**：列出今日必做 High-Priority 任務。
4. **渲染 HTML 日報**：產出美觀、支援核取清單的本地 HTML 網頁並自動存檔至指定資料夾。

---

## ⚙️ 前置設定與環境依賴

需連接 Google Calendar MCP、Gmail MCP 及 Notion MCP。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：時區偏移導致行程日期錯位
* **問題現象**：需確保環境變數或系統時區為 Asia/Taipei (UTC+8)，避免跨午夜行程落入前一日。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：MCP Token 過期導致查詢失敗
* **問題現象**：Google OAuth 憑證若失效需重新授權，技能會友善提示重新連接指令。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：存檔路徑無寫入權限
* **問題現象**：預設存檔於 `~/晨間早報/`，可自訂環境變數 `MORNING_BRIEFING_DIR`。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 02-productivity/morning-briefing
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.1.0 | 2026-06-12 | 新增自訂存檔資料夾環境變數與待辦事項即時勾選 UI |
| v1.0.0 | 2026-06-11 | 初始版本：整合 Calendar/Gmail/Notion 產出靜態日報 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
