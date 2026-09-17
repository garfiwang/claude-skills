# 製作 BNI 簡報技能 (make-bni-slide)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Presentation-BNI-green.svg)](../../README.md)

> **一句話介紹**：專為 BNI 會員設計的自動化簡報生成器，支援經典 PPTX 與 Reveal.js HTML 雙格式，嚴格遵循 BNI 官方紅黑金品牌規範與邊界防遮擋。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **格式與配色混亂**：非官方紅黑色系讓商務簡報顯得不夠專業。
2. **投影邊界遮擋**：文字排版太靠邊，導致投影或大螢幕時被 BNI Logo 或切邊遮蔽。
3. **線上即時展示不便**：PPTX 檔案在不同電腦播放容易掉字體或版型錯亂。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `製作 BNI 簡報`
* `做 BNI 簡報`
* `BNI 簡報`

---

## 🛠️ 核心工作流程與規範

1. **互動確認格式**：主動詢問使用者需要『經典 PPTX』還是『互動 HTML (Reveal.js)』。
2. **套用官方規範**：主色 BNI 紅 `#d12031`、內文深藍炭灰 `#1a2530`、強調金 `#b67b12`，整合官方 Logo。
3. **產出高質感版型**：結構化封面、EDM 資訊卡片網格、預演登記行動按鈕。
4. **一鍵自動部署**：若選擇 HTML，支援一鍵推送到 GitHub Pages 產生公開瀏覽連結。

---

## ⚙️ 前置設定與環境依賴

PPTX 需 Python `python-pptx`；HTML 需現代瀏覽器或 GitHub CLI 自動部署。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：封面大字在小螢幕突兀斷字
* **問題現象**：HTML 版封面嚴格加上 `1.5em !important` 與 `white-space: nowrap` 保護。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：投影片左下角 Logo 與內文重疊
* **問題現象**：嚴格設定邊距，保留左下角與右下角安全緩衝區。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：GitHub Pages 部署後 CSS 找不到
* **問題現象**：使用 CDN 絕對路徑引入 Reveal.js 與 Tailwind，確保無相對路徑破圖問題。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 04-pptx/make-bni-slide
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-07-01 | 初始版本：支援 HTML/PPTX 雙格式 BNI 簡報產出與自動部署 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
