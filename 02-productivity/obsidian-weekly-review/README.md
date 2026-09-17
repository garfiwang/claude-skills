# Obsidian 每週知識重整技能 (obsidian-weekly-review)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-PKM-Obsidian-green.svg)](../../README.md)

> **一句話介紹**：每週日自動盤點 Obsidian 筆記庫：清空 Inbox、整理 Daily Notes、重整專案進度、清理孤兒筆記並產出週回顧筆記。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **收件匣（Inbox）堆積如山**：日常隨手記下的碎片筆記從未被歸檔或重組。
2. **筆記孤島（Orphan Notes）**：筆記缺乏雙向鏈結，無法發揮網狀知識庫的綜效。
3. **專案進度脫節**：專案頁面與日常日記沒有同步，難以回顧本週產出。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `每週回顧`
* `Obsidian 週回顧`
* `整理筆記庫`
* `週檢視`
* `obsidian review`

---

## 🛠️ 核心工作流程與規範

1. **掃描 Inbox 目錄**：將臨時筆記歸類到對應的 PARA 系統（Projects, Areas, Resources, Archives）。
2. **彙整 Daily Notes**：提取本週 7 天的所有亮點記錄、完成任務與重要想法。
3. **檢查死鏈與孤兒筆記**：列出沒有任何入鏈（Inbound link）的孤兒檔案並建議關聯。
4. **生成 Weekly Note**：在 `05-Weekly/` 自動建立本週回顧檔案，包含量化統計與下週焦點。

---

## ⚙️ 前置設定與環境依賴

需連接 Obsidian MCP (MCPVault) 或指定本地 Obsidian Vault 路徑。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：覆蓋已有手寫週記
* **問題現象**：生成前會先檢查目標檔案是否存在，若存在則採用『附加（Append）』而非強制覆蓋。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：雙向鏈結語法破裂
* **問題現象**：生成 `[[WikiLink]]` 時嚴格校對檔案名稱與路徑，避免大小寫不一致造成死鏈。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：掃描整個大庫超時
* **問題現象**：針對包含數萬筆記的巨大 Vault，支援設定目錄白名單（如僅掃描 `00-Inbox` 與 `01-Daily`）。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 02-productivity/obsidian-weekly-review
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-07-01 | 初始版本：支援 PARA 結構掃描、Daily 彙整與自動週記生成 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
