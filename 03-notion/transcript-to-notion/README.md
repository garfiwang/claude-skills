# 逐字稿整理與寫入 Notion 技能 (transcript-to-notion)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Notion-Transcript-green.svg)](../../README.md)

> **一句話介紹**：將演講、課程或會議錄音逐字稿（.md）自動清理贅字、提煉架構，寫入 Notion 並自動關聯 Areas 與 Resources 資料庫。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **口語贅字嚴重**：錄音轉文字充滿『那個、然後、對、嗯』，直接閱讀非常痛苦。
2. **萬字長文缺乏層次**：整篇無標題分段，找不到關鍵觀點與金句。
3. **無法融入個人知識庫**：整理完的筆記孤立存在，沒有關聯到所屬領域或課程教材資料庫。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `幫我整理這份逐字稿`
* `寫入 notion`
* `逐字稿整理`
* `transcript to notion`

---

## 🛠️ 核心工作流程與規範

1. **語氣清洗與去口語化**：移除所有語病與重複助詞，保留講者原意與專業術語。
2. **提煉三層架構**：『一句話總結』＋『三大核心觀點』＋『精華逐段摘要與金句』。
3. **寫入 Notion [G] Note**：建立結構化頁面。
4. **自動雙向關聯**：自動關聯至 `[CC] 財富流` (Areas DB) 與 `財富流教練包` (Resources DB)。

---

## ⚙️ 前置設定與環境依賴

需連接 Notion MCP，且 Notion 空間需包含 Note, Areas, Resources 關聯資料庫。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：清洗過度導致遺失專業細節
* **問題現象**：嚴格保留案例細節、數據與專業名詞，僅移除無意義的口頭禪。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：超長逐字稿（>20,000字）Context 溢出
* **問題現象**：採分章節流水線式處理，每 3,000 字一段提煉後再進行全文總成。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：關聯 Relation ID 找不到
* **問題現象**：若目標關聯項目不存在，會先回報使用者並建立預設關聯標籤。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 03-notion/transcript-to-notion
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-07-05 | 初始版本：支援逐字稿清洗、金句提煉與三庫關聯寫入 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
