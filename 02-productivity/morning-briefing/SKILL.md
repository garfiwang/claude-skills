---
name: morning
description: 早晨日報技能。查詢 Gmail、Google Calendar、Notion，產出昨日工作回顧＋今日重要任務的早晨日報。觸發條件：使用者輸入 morning 或 /morning。
---

當使用者輸入 `morning` 或 `/morning` 時，執行以下步驟，產出一份早晨日報：

## 執行步驟

**今天日期**：從系統 `currentDate` 取得今天日期，計算昨天日期。

### 步驟 1：查詢 Google Calendar

使用 Calendar MCP 工具（`list_events`）：
- 查詢**昨天全天**的行程（昨天 00:00 ～ 昨天 23:59，ISO 8601 格式，時區 Asia/Taipei）
- 查詢**今天全天**的行程（今天 00:00 ～ 今天 23:59）
- 先呼叫 `list_calendars` 取得可用日曆清單，再用 `calendarId = primary` 查詢

### 步驟 2：查詢 Gmail

使用 Gmail MCP 工具（`search_threads`）：
- 查詢昨天收到的重要信件：query = `after:YESTERDAY_DATE before:TODAY_DATE is:important`（日期格式：YYYY/MM/DD）
- 查詢昨天自己寄出的信件：query = `from:me after:YESTERDAY_DATE before:TODAY_DATE`
- 最多各取 10 封，摘要主旨與寄件人

### 步驟 3：查詢 Notion

使用 Notion MCP 工具（`notion-search` 或 `notion-query-database-view`）：

**3a. 昨日完成的任務**
- 查詢 `[G] Tasks Database`
- 條件：Done = YES，且完成日期 = 昨天
- 若 Notion 不支援日期篩選，改用搜尋近期 Done = YES 的任務（取最新 10 筆）

**3b. 今日待辦任務**
- 查詢 `[G] Tasks Database`
- 條件：Done = NO，到期日 ≤ 今天
- 最多取 15 筆

**3c. WIP 進行中專案**
- 查詢 `[G] Projects Database`
- 條件：Status = WIP
- 最多取 10 筆

### 步驟 4：整合輸出早晨日報

將以上資料整合，以**繁體中文**輸出以下格式的早晨日報：

---

## 格式範本

```
# ☀️ 早晨日報｜YYYY年M月D日（週X）

---

## 📅 昨日回顧

### 行程
- [列出昨天的行程，含時間與主題]
- 若無行程：「昨天無排定行程」

### 完成任務
- [列出 Notion 昨日標記完成的任務]
- 若無：「昨天無完成任務記錄」

### 重要信件
- [列出昨天收到的重要信件，格式：寄件人 — 主旨]
- 若無：「昨天無重要信件」

---

## 🎯 今日重點

### 今日行程
- [時間] [行程名稱]
- 若無：「今天無排定行程」

### 今日待辦（依優先順序）
- [ ] [任務名稱]（到期：YYYY/MM/DD）
- 最多列 10 筆，優先列今天到期的

### 進行中專案
- [專案名稱]：[簡短描述或狀態]

---

## 💡 今日建議行動（Top 3）

根據今日行程、待辦、進行中專案，推薦 3 個今天最優先應該處理的行動：

1. **[行動一]**：[一句話說明原因]
2. **[行動二]**：[一句話說明原因]
3. **[行動三]**：[一句話說明原因]

---
早安，Rich！今天也是充滿可能性的一天。
```

## 注意事項

- 若某個資料來源查詢失敗，標記「（資料取得失敗，請稍後確認）」並繼續輸出其他部分
- 日報風格：**簡潔、結論優先**，避免冗長說明
- 任務列表若超過 10 筆，優先顯示**今天到期**或**逾期**的
- 行程時間轉換為台灣時間（UTC+8）顯示
- 所有輸出使用**繁體中文**
---
name: morning
description: 早晨日報技能。查詢 Gmail、Google Calendar、Notion，產出昨日工作回顧＋今日重要任務的早晨日報。觸發條件：使用者輸入 morning 或 /morning。
user-invocable: true
---

當使用者輸入 `morning` 或 `/morning` 時，執行以下步驟，產出一份早晨日報：

## 執行步驟

**今天日期**：從系統 `currentDate` 取得今天日期，計算昨天日期。

### 步驟 1：查詢 Google Calendar

使用 Calendar MCP 工具（`list_events`）：
- 查詢**昨天全天**的行程（昨天 00:00 ～ 昨天 23:59，ISO 8601 格式，時區 Asia/Taipei）
- 查詢**今天全天**的行程（今天 00:00 ～ 今天 23:59）
- 先呼叫 `list_calendars` 取得可用日曆清單，再用 `calendarId = primary` 查詢

### 步驟 2：查詢 Gmail

使用 Gmail MCP 工具（`search_threads`）：
- 查詢昨天收到的重要信件：query = `after:YESTERDAY_DATE before:TODAY_DATE is:important`（日期格式：YYYY/MM/DD）
- 查詢昨天自己寄出的信件：query = `from:me after:YESTERDAY_DATE before:TODAY_DATE`
- 最多各取 10 封，摘要主旨與寄件人

### 步驟 3：查詢 Notion

使用 Notion MCP 工具（`notion-search` 或 `notion-query-database-view`）：

**3a. 昨日完成的任務**
- 查詢 `[G] Tasks Database`
- 條件：Done = YES，且完成日期 = 昨天
- 若 Notion 不支援日期篩選，改用搜尋近期 Done = YES 的任務（取最新 10 筆）

**3b. 今日待辦任務**
- 查詢 `[G] Tasks Database`
- 條件：Done = NO，到期日 ≤ 今天
- 最多取 15 筆

**3c. WIP 進行中專案**
- 查詢 `[G] Projects Database`
- 條件：Status = WIP
- 最多取 10 筆

### 步驟 4：整合輸出早晨日報

將以上資料整合，以**繁體中文**輸出以下格式的早晨日報：

---

## 格式範本

```
# ☀️ 早晨日報｜YYYY年M月D日（週X）

---

## 📅 昨日回顧

### 行程
- [列出昨天的行程，含時間與主題]
- 若無行程：「昨天無排定行程」

### 完成任務
- [列出 Notion 昨日標記完成的任務]
- 若無：「昨天無完成任務記錄」

### 重要信件
- [列出昨天收到的重要信件，格式：寄件人 — 主旨]
- 若無：「昨天無重要信件」

---

## 🎯 今日重點

### 今日行程
- [時間] [行程名稱]
- 若無：「今天無排定行程」

### 今日待辦（依優先順序）
- [ ] [任務名稱]（到期：YYYY/MM/DD）
- 最多列 10 筆，優先列今天到期的

### 進行中專案
- [專案名稱]：[簡短描述或狀態]

---

## 💡 今日建議行動（Top 3）

根據今日行程、待辦、進行中專案，推薦 3 個今天最優先應該處理的行動：

1. **[行動一]**：[一句話說明原因]
2. **[行動二]**：[一句話說明原因]
3. **[行動三]**：[一句話說明原因]

---
早安，Rich！今天也是充滿可能性的一天。
```

## 注意事項

- 若某個資料來源查詢失敗，標記「（資料取得失敗，請稍後確認）」並繼續輸出其他部分
- 日報風格：**簡潔、結論優先**，避免冗長說明
- 任務列表若超過 10 筆，優先顯示**今天到期**或**逾期**的
- 行程時間轉換為台灣時間（UTC+8）顯示
- 所有輸出使用**繁體中文**
