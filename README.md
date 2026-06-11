# Rich's Claude Code Skills

> 問大師家族辦公室 · Rich Wang 的 Claude Code 自訂技能庫

這個 repo 收錄了 Rich 為 Claude Code 開發的所有自訂 Skills，按功能分類整理，可直接安裝使用。

---

## 技能分類

### 📝 01 · 內容創作

| Skill | 說明 | 觸發關鍵字 |
|---|---|---|
| [storytelling-7steps](01-content-creation/storytelling-7steps/SKILL.md) | 故事創作七步法，適用講座開場、社群故事、課程設計 | 七步法、寫故事、強化故事 |
| [fb-long-post](01-content-creation/fb-long-post/SKILL.md) | 高流量 FB 長文，信託/保險/退休規劃主題 | 寫 FB 長文、FB 文章 |
| [threads-post](01-content-creation/threads-post/SKILL.md) | Threads 每日短文，品牌聲量維持 | 寫 Threads、今日 Threads |
| [image-prompt-wizard](01-content-creation/image-prompt-wizard/README.md) | AI 繪圖 Prompt 生成嚮導，三種模式輸出結構化英文 Prompt ＋ 中文說明 | 圖片提示詞、image prompt、生成圖片 Prompt |

### ⚡ 02 · 生產力自動化

| Skill | 說明 | 觸發關鍵字 |
|---|---|---|
| [morning-briefing](02-productivity/morning-briefing/SKILL.md) | 早晨日報：查 Gmail + Calendar + Notion，產出互動式 HTML 日報並存檔 | morning、/morning |
| [sync-inspiration](02-productivity/sync-inspiration/SKILL.md) | 同步靈感盒 Clippings 到 Notion | 同步靈感盒、sync 靈感盒 |
| [weekly-schedule-report](02-productivity/weekly-schedule-report/SKILL.md) | 每週一自動產生本週優先任務報告，發送至 Email | 週報、weekly report |

### 📒 03 · Notion 整合

| Skill | 說明 | 觸發關鍵字 |
|---|---|---|
| [notion-inspiration-box](03-notion/notion-inspiration-box/SKILL.md) | 快速儲存靈感到 Notion 靈感收集資料盒 | 存靈感、記錄一下、靈感：|
| [notion-note](03-notion/notion-note/SKILL.md) | 快速建立 Notion 筆記 | 記一下、Notion 記錄 |

### 📊 04 · 簡報製作（PPTX）

| Skill | 說明 | 觸發關鍵字 |
|---|---|---|
| [pptx-legal-slide](04-pptx/pptx-legal-slide/SKILL.md) | 法規/判例/新聞排版為單頁 PPTX，適合課程講義 | 法規排版、法規簡報 |
| [wendashi-pptx](04-pptx/wendashi-pptx/SKILL.md) | 問大師品牌簡報，使用品牌色系自動產生 PPTX | 問大師簡報、品牌簡報 |
| [newspaper-pptx](04-pptx/newspaper-pptx/SKILL.md) | 新聞報紙排版風格 PPTX，雙欄版面仿《經濟日報》 | 新聞排版、簡報新聞版 |

---

## 安裝方式

在 Claude Code 中執行：

```bash
# 安裝單一 skill（以 image-prompt-wizard 為例）
claude skills add garfiwang/claude-skills --path 01-content-creation/image-prompt-wizard

# 安裝其他 skill（以 storytelling-7steps 為例）
claude skills add garfiwang/claude-skills --path 01-content-creation/storytelling-7steps
```

或直接複製 `SKILL.md` 到你的 Claude Code 工作目錄下使用。

---

## ⚙️ 技能設定

部分技能支援環境變數設定，加入 `~/.zshrc` 或 `~/.bashrc` 後執行 `source ~/.zshrc` 生效。

### morning-briefing（早晨日報）

| 環境變數 | 說明 | 預設值 |
|---|---|---|
| `MORNING_BRIEFING_DIR` | HTML 日報的存檔資料夾路徑 | `~/晨間早報/` |

```bash
# 範例：自訂存檔路徑
export MORNING_BRIEFING_DIR="$HOME/Documents/morning-reports"
```

> **前置需求**：需安裝並連接 [Google Calendar MCP](https://github.com/nspady/google-calendar-mcp)、[Gmail MCP](https://github.com/gongrzhe/gmail-mcp-server)、[Notion MCP](https://developers.notion.com/docs/mcp) 三個 MCP 工具，技能才能正常查詢資料。

---

## 🔖 版本管理規則

每個 Skill 的版本資訊寫在自己的 `SKILL.md` 最上方 frontmatter，方便追蹤升級次數與內容。範例：

```yaml
---
name: morning
version: 1.1.0          # ← 目前版本
description: ...
changelog:              # ← 由新到舊，每次升級加一筆
  - version: 1.1.0
    date: 2026-06-12
    note: 這次改了什麼（一句話）
  - version: 1.0.0
    date: 2026-06-11
    note: 初始版本
---
```

**版號規則（語意化版本 SemVer：主版號.次版號.修訂號）：**

| 改動類型 | 版號變化 | 範例 |
|---|---|---|
| 修錯字、調小設定、不影響行為 | 修訂號 +1 | 1.1.0 → 1.1.**1** |
| 新增功能、向下相容 | 次版號 +1，修訂號歸 0 | 1.1.0 → 1.**2**.0 |
| 大改架構、不相容、需重新設定 | 主版號 +1，其餘歸 0 | 1.1.0 → **2**.0.0 |

**維護流程：** 改 `SKILL.md` 內容 → 更新 frontmatter 的 `version` 並在 `changelog` 最上方加一筆 → commit 推上來。看 `changelog` 筆數就知道升級過幾次。

---

## 關於作者

**Rich Wang**｜問大師家族辦公室 創辦人暨執行長

專長：安養信託、意定監護、家族信託、退休財務安全規劃

- 個人 FB：https://www.facebook.com/garfiwang
- 問大師 FB：https://www.facebook.com/profile.php?id=61579988407598

---

*Last updated: 2026-06-12*
