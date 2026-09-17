# Threads 每日短文生成器 (threads-post)

[![Version: v1.0.0](https://img.shields.io/badge/Version-v1.0.0-blue.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Category](https://img.shields.io/badge/Category-Social-Microblog-green.svg)](../../README.md)

> **一句話介紹**：專為 Threads 演算法與讀者閱讀習慣設計的極簡犀利短文，快速維持品牌聲量與高互動率。

---

## 🌟 為什麼需要這個技能？（解決的核心痛點）

1. **篇幅過長不符合短社群特性**：把 FB 長文硬塞進 Threads 導致無人閱讀。
2. **觀點模糊缺乏轉發動力**：文字太客套中庸，無法激發留言與轉發討論。
3. **濫用 Hashtag 遭降權**：過多標籤破壞排版且影響演算法推薦。

---

## 🚀 觸發關鍵詞（Trigger Keywords）

在對話中輸入以下任一關鍵詞即可立即啟動此技能：

* `寫 Threads 文章`
* `生成今日 Threads`
* `短文版`
* `寫一則 Threads`

---

## 🛠️ 核心工作流程與規範

1. **提煉單一核心觀點**：每則 Threads 僅專注一個鮮明觀點（One Idea Per Post）。
2. **節奏明快的短行斷句**：每行不超過 18 字，利用視覺空行營造快速滑動的節奏感。
3. **結尾提問引發對話**：拋出具討論性或二選一的問題，激發評論區互動。

---

## ⚙️ 前置設定與環境依賴

無外部相依性，即裝即用。

---

## 🕳️ 踩坑紀錄與避坑指南（Lessons Learned）

在開發與使用本技能時，我們總結了以下常見實戰地雷與最佳解法：

### ❌ 常見坑點：單一貼文字數超過 500 字上限
* **問題現象**：Threads 單篇嚴格限制字數，過長會被自動拆成串文。本技能預設控制在 250~350 字精華區間。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：使用過多問號或驚嘆號
* **問題現象**：適度沉穩專業，避免農場文浮誇感。
* **避坑解法**：依本技能標準規範執行。

### ❌ 常見坑點：忽略第一句的縮圖預覽截斷點
* **問題現象**：第一句話前 20 字是決定讀者是否點開全部的關鍵。
* **避坑解法**：依本技能標準規範執行。


> 💡 更多疑難排解細節與錯誤代碼處理，請參閱 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。

---

## 📦 安裝方式

在 **Claude Code** 終端機中執行以下命令即可安裝此技能：

```bash
claude skills add garfiwang/claude-skills --path 01-content-creation/threads-post
```

或直接複製 `SKILL.md` 到你的工作目錄下使用。

---

## 📝 版本歷史（CHANGELOG）

| 版本 | 發布日期 | 更新內容說明 |
|---|---|---|
| v1.0.0 | 2026-06-12 | 初始版本：打造適合 Threads 的高密度觀點短文模板 |

詳細更新紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

---

## 📄 授權條款

MIT License © 2026 Rich Wang｜問大師家族辦公室
