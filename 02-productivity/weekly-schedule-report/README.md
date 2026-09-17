# 每週優先任務報告生成器 (Weekly Schedule Report) (weekly-schedule-report)

[![Version: v1.1.0](https://img.shields.io/badge/Version-v1.1.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Productivity-Report-green.svg)](../../README.md)

> **一句話介紹**：每週一自動盤點行事曆行程與 Notion 專案看板，產出高視覺質感的每週優先任務報告網頁與 Email 格式。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **專案進度回報耗時**：每週手動整理行程與任務進度平均耗費 1~2 小時。
2. **優先級不明確**：團隊或個人常被瑣事淹沒，缺少本週 Top 3 關鍵戰役（Big Rocks）的聚焦。
3. **格式不統一**：文字報告難以閱讀，缺少直觀的進度條與甘特式時間區塊。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `每週報告`
* `每週進度報告`
* `weekly report`
* `週報`

---

## 🛠️ 核心工作流程與規範

1. **讀取全週行程**：提取週一至週日的所有會議、演講與外勤行程。
2. **匯總進行中專案與待辦**：從 Notion Projects/Tasks 抓取 In-Progress 項目與 Deadline。
3. **提煉本週三大核心焦點**：依重要性排序，醒目標示本週最重要的 3 件大事。
4. **生成響應式 HTML 報告**：輸出具備卡片化、進度條與可列印樣式的週報檔案。

---

## ⚙️ 前置設定與環境依賴

需連接 Google Calendar MCP 與 Notion MCP。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：跨月或跨季度週次判定誤差
* **問題現象**：精確採用 ISO 週曆算法計算第幾週（Week Number），避免週次計算混亂。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：已完成（Done）任務未過濾
* **問題現象**：自動過濾過去 7 天內已完成的項目歸入『上週產出成果』，未完成項目歸入『進行中』。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：Email 客戶端樣式被剔除
* **問題現象**：產出 Email 版本時自動將 CSS 樣式 In-line 化，保證 Outlook/Gmail 完美呈現。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 02-productivity/weekly-schedule-report
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.1.0 | 2026-07-10 | 支援 Google Calendar 與 Notion Tasks 自動整合並產出互動式 HTML 週報 |
| v1.0.0 | 2026-06-15 | 初始版本 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
