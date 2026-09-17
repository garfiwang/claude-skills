# Notion 筆記快速歸檔技能 (notion-note)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Notion-Integration-green.svg)](../../README.md)

> **一句話介紹**：將任意文章、會議摘要、閱讀筆記或長篇思考，結構化整理並儲存至 Notion Note 知識庫。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **雜亂內容未整理**：貼入的原始內容缺少目錄、摘要與重點標記。
2. **超過 Block 限制報錯**：Notion API 單次請求限制 100 blocks，長文容易直接拋錯失敗。
3. **無法關聯知識體系**：筆記沒有關聯到特定主題（Area）或專案（Project）。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `加入notion資料庫note`
* `存到notion`
* `加入note`
* `記錄到notion`
* `存進notion筆記`

---

## 🛠️ 核心工作流程與規範

1. **結構化解析**：自動產生大標題、重點摘要框（Callout block）、分章節小標題（H2/H3）。
2. **自動分批寫入（Chunking）**：將長文切分成每批 80 blocks 自動分段 Append，確保 100% 寫入成功。
3. **關聯欄位配置**：自動判定筆記類別、來源 URL 與關聯標籤。

---

## ⚙️ 前置設定與環境依賴

需連接 Notion MCP，並確保對 Note 資料庫具備寫入權限。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：富文本格式丟失
* **問題現象**：Markdown 的粗體、清單、代碼塊需精確轉換為 Notion RichText Block 結構。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：特殊字元造成 JSON 解析失敗
* **問題現象**：在 Payload 封裝前需正確處理跳脫字元（Escape characters）。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：封面圖（Cover）與圖示（Icon）未配置
* **問題現象**：自動為重要筆記配置符合主題的 Emoji Icon，提升資料庫視覺質感。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 03-notion/notion-note
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-07-05 | 初始版本：支援長文 Chunking 寫入、Callout 重點框與自動屬性補全 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
