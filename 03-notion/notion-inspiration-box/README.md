# Notion 靈感盒秒速記錄技能 (notion-inspiration-box)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Notion-Integration-green.svg)](../../README.md)

> **一句話介紹**：將腦海中的瞬間靈感、金句、商業想法或對話摘要，秒級精準存入 Notion 靈感收集資料盒。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **紀錄門檻太高**：開啟 Notion App 等待載入常讓人放棄記錄，導致靈感流失。
2. **欄位手動填寫繁瑣**：需要手動選擇日期、標籤、來源、狀態，打斷思考心流。
3. **無主題自動歸納**：直接儲存單句容易在日後失去上下文。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `存靈感`
* `記錄一下`
* `幫我存到 Notion`
* `靈感：`
* `想法：`
* `記下來`

---

## 🛠️ 核心工作流程與規範

1. **提取核心靈感**：分析使用者簡短輸入，自動擴充完整情境與背景。
2. **自動填寫屬性欄位**：智能判定『靈感類型』、『重要程度』、『建立日期』與『標籤』。
3. **即時呼叫 Notion API 建立 Page**：在目標資料庫中建立條目，並回傳 Notion 頁面連結確認。

---

## ⚙️ 前置設定與環境依賴

需啟用 Notion MCP 並設定好目標靈感資料庫 ID。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：資料庫屬性（Properties）名稱不匹配
* **問題現象**：需確認 Notion 資料庫的欄位名稱（如 `Name`、`Tags`、`Created`），若自訂名稱需在設定中映射。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：單一文字過長導致 Title 欄位超出限制
* **問題現象**：Title 欄位保留精華 20 字以內，其餘完整內容寫入 Page Body 的 Paragraph blocks。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：斷網或 Token 失效無本地備份
* **問題現象**：若 Notion 請求失敗，自動將內容備份到本地暫存檔，保證靈感永不遺失。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 03-notion/notion-inspiration-box
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-07-05 | 初始版本：支援自然語言輸入、自動屬性識別與秒級儲存 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
