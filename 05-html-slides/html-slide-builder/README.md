# HTML 智慧互動簡報生成器（100 吋大螢幕 / 70 歲樂齡極致版） (html-slide-builder)

[![Version: v1.2.0](https://img.shields.io/badge/Version-v1.2.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-HTML-RevealJS-green.svg)](../../README.md)

> **一句話介紹**：將任何教材自動轉換為適合 100 吋大投影與 70 歲長輩清晰閱讀的 Reveal.js 簡報，具備 AI 巨型圖標、Firebase 即時互動投票與滑桿對比。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **長輩視力不佳看不清小字**：傳統投影片在 100 吋投影幕上文字過小、對比度不足。
2. **課堂缺乏即時參與感**：單向講授容易枯燥，學員無法透過手機即時投票互動。
3. **概念對比抽象**：信託前後、資產配置前後的差異難以直觀展現。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `幫我做 HTML 簡報`
* `把這份教材轉成互動簡報`
* `做 Reveal.js 簡報`
* `做成投影片`
* `做一份課程簡報`

---

## 🛠️ 核心工作流程與規範

1. **教材分析與大綱確認**：將教材提煉為 10~15 頁極致大字結構。
2. **四大視覺與互動強化**：
  1. AI 巨型背景底圖（低透明度防干擾）
  2. 巨型扁平化圖標（96~120px 去背透明）
  3. Firebase 即時互動元件（手機掃碼大字文字雲、大按鈕單選投票）
  4. 滑桿視覺化演示（Before/After 滑動對比）。
3. **生成 Reveal.js 網頁簡報**：採用現代深色/高對比主題，支援全螢幕與遙控翻頁。
4. **自動發布 GitHub Pages**：一鍵建立公開網址，方便現場掃碼直接投影展示。

---

## ⚙️ 前置設定與環境依賴

需 Node.js 或現代瀏覽器，互動投票功能需配置 Firebase 專案憑證。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：投影幕色差導致淺灰色字看不見
* **問題現象**：內文一律採用 `#FFFFFF` 或 `#F3F4F6`，禁止在深底使用中灰色字。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：Firebase API Key 暴露在公開前端
* **問題現象**：配置 Firebase Security Rules，僅允許匿名寫入投票集合，禁止任意讀寫全庫。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：手機當遙控器時連線中斷
* **問題現象**：使用 WebSocket / Firebase Realtime Database 實現毫秒級翻頁同步。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 05-html-slides/html-slide-builder
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.2.0 | 2026-07-20 | 新增 70 歲樂齡大字視覺化、Firebase 即時互動投票與滑桿對比元件 |
| v1.1.0 | 2026-06-25 | 支援 AI 背景圖與巨型圖標去背處理 |
| v1.0.0 | 2026-06-01 | 初始版本：Reveal.js 100 吋大螢幕互動簡報生成 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
