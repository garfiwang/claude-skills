# 靈感盒同步至 Notion 技能 (sync-inspiration)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Productivity-Notion-green.svg)](../../README.md)

> **一句話介紹**：將瀏覽器剪貼（Clippings）與本地靈感草稿批次同步並結構化寫入 Notion 靈感資料庫。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **靈感分散各處**：手機備忘錄、本地 txt 與網頁剪藏無法集中統一管理。
2. **缺乏自動分類標籤**：同步時如果只丟原文，未來在 Notion 檢索時極為痛苦。
3. **重覆同步造成資料污染**：多次執行時容易把同一則靈感重複新增。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `同步靈感盒`
* `sync 靈感盒`
* `同步 clippings`
* `把靈感同步到 notion`

---

## 🛠️ 核心工作流程與規範

1. **讀取本地 Clippings 來源**：掃描指定靈感收集目錄或剪貼簿檔案。
2. **AI 智能摘要與標籤化**：提煉靈感核心要點、建議類別（商業、生活、金句、技術）與關鍵字。
3. **查重防呆檢驗**：比對 Notion 資料庫現有標題與 URL，自動跳過已存在的項目。
4. **批次寫入 Notion Database**：呼叫 Notion API / MCP 快速建立結構化頁面並歸檔本地原檔。

---

## ⚙️ 前置設定與環境依賴

需連接 Notion MCP 或提供 Notion API Key 及 Target Database ID。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：Notion API 速率限制 (Rate Limit)
* **問題現象**：批次寫入多筆資料時若無適當 delay 會被 429 阻擋。本技能內建批次節流控制。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：剪藏內容包含破裂 HTML/Markdown
* **問題現象**：在寫入前會預先進行 Markdown 格式清理與清洗，防止 Notion Block 渲染報錯。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：標籤名稱大小寫不一致造成 Multi-Select 欄位混亂
* **問題現象**：自動標準化標籤大小寫與常用分類詞庫。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 02-productivity/sync-inspiration
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-06-20 | 初始版本：支援本地 Clippings 掃描、智能標籤化與查重同步 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
