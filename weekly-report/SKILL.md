# 每週進度報告技能

當使用者輸入「**每週報告**」、「**每週進度報告**」、「**weekly report**」時，執行以下步驟產出每週進度報告 HTML。

## 執行步驟

**今天日期**：從系統時間取得今天日期。

### 步驟 1：查詢 Notion 資料庫

使用 Notion API 查詢以下資料庫：

**1a. WIP 進行中專案**
- 查詢 Notion Projects Database
- 過濾條件：`Status = "WIP"`
- 專案 ID：`201c9c67-1f57-81e8-b126-000bc08f6d75`
- 取所有 WIP 專案，記錄名稱與 End Date

**1b. 未完成待辦任務**
- 查詢 Notion Tasks Database
- 過濾條件：`Done = False`
- 任務 ID：`201c9c67-1f57-8143-bd10-000b05412488`
- 取所有未完成任務，記錄名稱與 Due Date

### 步驟 2：查詢 Google Calendar

使用 Calendar MCP 工具查詢本週與上週行程：
- 查詢**上週一至今天**（台灣時間 Asia/Taipei）
- 查詢**本週剩餘日曆**

### 步驟 3：查詢 Gmail

查詢近期重要信件（選項，若資料充足可省略）

### 步驟 4：產生 HTML 報告

使用 `每週進度報告/template.html` 為版面模板，填入實際資料後存檔。

#### 版面順序（已固定）
1. **本週總覽** — 統計數字（WIP 專案數、待辦數、逾期數、本週到期數）
2. **Top 3 建議行動** — 深色高亮卡片，放最重要的三件事
3. **上週回顧** — 上週行程日曆（span-2）／**本週行程**（單欄）
4. **進行中專案**（span-2）／**待辦任務**（單欄，含 checkbox）

#### 輸出路徑
寫入 `每週進度報告/index.html`（與 template 同一目錄）

### 存檔路徑
```
morning news/每週進度報告/index.html
```

---

## 注意事項
- 時間顯示為台灣時間（UTC+8）
- 逾期任務標示紅色 `overdue` class
- 本週到期任務標示橙色 `soon-tag` class
- 所有文字使用繁體中文
- HTML 必須為完整自含式，不依賴外部 CDN
