---
name: morning
description: 早晨日報技能。查詢 Gmail、Google Calendar、Notion，產出昨日工作回顧＋今日重要任務的早晨日報，輸出為互動式 HTML 網頁並存檔。觸發條件：使用者輸入 morning 或 /morning。
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

### 步驟 4：產生互動式 HTML 並存檔

將以上資料整合，產生一份**完整的自含式 HTML 檔案**，並使用 `mcp__filesystem__write_file` 工具存至：

```
/Users/garfiwang/Documents/晨間早報/YYYY-MM-DD.html
```

（YYYY-MM-DD 替換為今天實際日期，例如 `2026-06-02.html`）

存檔完成後，在對話中回報：「✅ 早晨日報已存至 `/Users/garfiwang/Documents/晨間早報/YYYY-MM-DD.html`」

---

## HTML 完整範本

產生的 HTML 必須為**完整自含式**（不依賴外部 CDN 或資源），依以下結構填入實際資料：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>☀️ 早晨日報｜{YYYY}年{M}月{D}日</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #F9F5F0;
      color: #3E2115;
      font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC", sans-serif;
      max-width: 1100px;
      margin: 0 auto;
      padding: 28px 16px 60px;
      line-height: 1.6;
    }
    /* ── Header ── */
    header { text-align: center; margin-bottom: 28px; }
    header h1 { font-size: 2rem; font-weight: 700; color: #3E2115; letter-spacing: -0.5px; }
    header .date { color: #A47551; font-size: 1rem; margin-top: 4px; }
    .progress-bar {
      display: inline-flex; align-items: center; gap: 8px;
      background: #3E2115; color: #FFD700;
      padding: 6px 18px; border-radius: 20px;
      font-size: 0.85rem; font-weight: 600; margin-top: 12px;
    }
    /* ── Bento Grid ── */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(62,33,21,0.08);
      overflow: hidden;
    }
    .span-2 { grid-column: span 2; }
    .span-3 { grid-column: span 3; }
    /* ── Card Header ── */
    .card-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 20px; cursor: pointer;
      background: rgba(164,117,81,0.07);
      border-bottom: 1px solid rgba(62,33,21,0.08);
      user-select: none;
    }
    .card-header h2 { font-size: 0.95rem; font-weight: 600; color: #3E2115; }
    .toggle-icon { font-size: 0.9rem; color: #A47551; transition: transform 0.2s; }
    .card-body { padding: 16px 20px; }
    .card-body.collapsed { display: none; }
    /* ── Sub sections ── */
    .sub-section + .sub-section { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(62,33,21,0.06); }
    .sub-section h3 { font-size: 0.8rem; font-weight: 600; color: #A47551; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .item-list { list-style: none; }
    .item-list li { padding: 5px 0; border-bottom: 1px solid rgba(62,33,21,0.05); font-size: 0.9rem; }
    .item-list li:last-child { border-bottom: none; }
    .time-tag {
      display: inline-block; background: rgba(164,117,81,0.12);
      color: #A47551; font-size: 0.75rem; font-weight: 600;
      padding: 1px 7px; border-radius: 4px; margin-right: 6px;
    }
    .empty-note { color: #A47551; font-size: 0.85rem; font-style: italic; }
    /* ── Todos ── */
    .todo-item {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 7px 0; border-bottom: 1px solid rgba(62,33,21,0.05);
    }
    .todo-item:last-child { border-bottom: none; }
    .todo-item input[type="checkbox"] {
      width: 17px; height: 17px; accent-color: #A47551;
      flex-shrink: 0; margin-top: 3px; cursor: pointer;
    }
    .todo-item label { font-size: 0.9rem; cursor: pointer; flex: 1; }
    .todo-item.done label { text-decoration: line-through; color: #A47551; }
    .due-tag { font-size: 0.72rem; color: #A47551; margin-left: 4px; }
    .overdue { color: #CF202E !important; font-weight: 600; }
    /* ── Projects ── */
    .project-item {
      padding: 8px 12px; border-radius: 8px;
      background: rgba(164,117,81,0.07); margin-bottom: 8px;
      font-size: 0.88rem;
    }
    .project-item:last-child { margin-bottom: 0; }
    .project-name { font-weight: 600; color: #3E2115; }
    .project-desc { color: #A47551; font-size: 0.8rem; margin-top: 2px; }
    /* ── Top 3 Highlight ── */
    .highlight {
      background: linear-gradient(135deg, #3E2115 0%, #6B3D28 100%);
      color: #F9F5F0;
    }
    .highlight .card-header {
      background: rgba(255,255,255,0.07);
      border-bottom-color: rgba(255,255,255,0.12);
    }
    .highlight .card-header h2 { color: #FFD700; }
    .highlight .toggle-icon { color: #FFD700; }
    .top3-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    }
    .top3-item {
      background: rgba(255,255,255,0.08); border-radius: 10px;
      padding: 14px; border: 1px solid rgba(255,255,255,0.12);
    }
    .top3-num {
      font-size: 1.6rem; font-weight: 800; color: #FFD700;
      line-height: 1; margin-bottom: 6px;
    }
    .top3-action { font-size: 0.9rem; font-weight: 600; color: #F9F5F0; margin-bottom: 4px; }
    .top3-reason { font-size: 0.8rem; color: rgba(249,245,240,0.7); }
    /* ── Footer ── */
    footer {
      text-align: center; margin-top: 32px;
      color: #A47551; font-size: 0.85rem; font-style: italic;
    }
    /* ── Error state ── */
    .error-note {
      color: #CF202E; background: rgba(207,32,46,0.07);
      border-radius: 6px; padding: 6px 10px; font-size: 0.82rem;
    }
    /* ── Print ── */
    @media print {
      .toggle-icon { display: none; }
      .card-body.collapsed { display: block !important; }
      body { background: white; padding: 0; }
      .progress-bar { display: none; }
    }
    /* ── RWD ── */
    @media (max-width: 768px) {
      .bento-grid { grid-template-columns: 1fr; }
      .span-2, .span-3 { grid-column: span 1; }
      .top3-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<header>
  <h1>☀️ 早晨日報</h1>
  <p class="date">{YYYY}年{M}月{D}日（{週X}）</p>
  <div class="progress-bar">今日完成 <span id="done-count">0</span>&nbsp;/&nbsp;<span id="total-count">0</span> 項</div>
</header>

<main class="bento-grid">

  <!-- 昨日回顧 (span 2) -->
  <section class="card span-2">
    <div class="card-header" onclick="toggleCard(this)">
      <h2>📅 昨日回顧</h2>
      <span class="toggle-icon">▾</span>
    </div>
    <div class="card-body">
      <div class="sub-section">
        <h3>行程</h3>
        <ul class="item-list">
          <!-- 範例：<li><span class="time-tag">09:00</span>行程名稱</li> -->
          <!-- 若無：<li class="empty-note">昨天無排定行程</li> -->
          {昨日行程列表}
        </ul>
      </div>
      <div class="sub-section">
        <h3>完成任務</h3>
        <ul class="item-list">
          {昨日完成任務列表}
        </ul>
      </div>
      <div class="sub-section">
        <h3>重要信件</h3>
        <ul class="item-list">
          <!-- 範例：<li><strong>寄件人</strong> — 主旨</li> -->
          {昨日重要信件列表}
        </ul>
      </div>
    </div>
  </section>

  <!-- 今日行程 -->
  <section class="card">
    <div class="card-header" onclick="toggleCard(this)">
      <h2>📆 今日行程</h2>
      <span class="toggle-icon">▾</span>
    </div>
    <div class="card-body">
      <ul class="item-list">
        {今日行程列表}
      </ul>
    </div>
  </section>

  <!-- 今日待辦 -->
  <section class="card span-2">
    <div class="card-header" onclick="toggleCard(this)">
      <h2>✅ 今日待辦</h2>
      <span class="toggle-icon">▾</span>
    </div>
    <div class="card-body">
      <!-- 範例：
      <div class="todo-item" id="todo-wrap-1">
        <input type="checkbox" id="todo-1" onchange="onTodoChange(this)">
        <label for="todo-1">任務名稱 <span class="due-tag">到期：2026/06/02</span></label>
      </div>
      逾期任務在 due-tag 加 class="due-tag overdue"
      -->
      {今日待辦清單}
    </div>
  </section>

  <!-- 進行中專案 -->
  <section class="card">
    <div class="card-header" onclick="toggleCard(this)">
      <h2>🚀 進行中專案</h2>
      <span class="toggle-icon">▾</span>
    </div>
    <div class="card-body">
      <!-- 範例：
      <div class="project-item">
        <div class="project-name">專案名稱</div>
        <div class="project-desc">狀態描述</div>
      </div>
      -->
      {進行中專案列表}
    </div>
  </section>

  <!-- Top 3 建議行動 (span 3) -->
  <section class="card span-3 highlight">
    <div class="card-header" onclick="toggleCard(this)">
      <h2>💡 今日建議行動（Top 3）</h2>
      <span class="toggle-icon">▾</span>
    </div>
    <div class="card-body">
      <div class="top3-grid">
        <div class="top3-item">
          <div class="top3-num">1</div>
          <div class="top3-action">{行動一}</div>
          <div class="top3-reason">{原因一}</div>
        </div>
        <div class="top3-item">
          <div class="top3-num">2</div>
          <div class="top3-action">{行動二}</div>
          <div class="top3-reason">{原因二}</div>
        </div>
        <div class="top3-item">
          <div class="top3-num">3</div>
          <div class="top3-action">{行動三}</div>
          <div class="top3-reason">{原因三}</div>
        </div>
      </div>
    </div>
  </section>

</main>

<footer>早安，Rich！今天也是充滿可能性的一天。</footer>

<script>
  const STORAGE_KEY = 'morning-todos-{YYYY-MM-DD}';

  // 收合功能
  function toggleCard(header) {
    const body = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    const isCollapsed = body.classList.toggle('collapsed');
    icon.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
  }

  // 進度計算
  function updateProgress() {
    const all = document.querySelectorAll('.todo-item input[type="checkbox"]');
    const checked = document.querySelectorAll('.todo-item input[type="checkbox"]:checked');
    document.getElementById('total-count').textContent = all.length;
    document.getElementById('done-count').textContent = checked.length;
  }

  // Checkbox 變更
  function onTodoChange(cb) {
    const wrap = cb.closest('.todo-item');
    wrap.classList.toggle('done', cb.checked);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    saved[cb.id] = cb.checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    updateProgress();
  }

  // 初始化：從 localStorage 恢復狀態
  (function init() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    document.querySelectorAll('.todo-item input[type="checkbox"]').forEach(cb => {
      if (saved[cb.id]) {
        cb.checked = true;
        cb.closest('.todo-item').classList.add('done');
      }
    });
    updateProgress();
  })();
</script>

</body>
</html>
```

---

## 填入資料規則

| 佔位符 | 替換內容 |
|---|---|
| `{YYYY}` `{M}` `{D}` | 今天年/月/日（數字） |
| `{週X}` | 週一～週日 |
| `{YYYY-MM-DD}` | localStorage key 用，格式 `2026-06-02` |
| `{昨日行程列表}` | `<li>` 條目，無資料填 `<li class="empty-note">昨天無排定行程</li>` |
| `{昨日完成任務列表}` | `<li>` 條目 |
| `{昨日重要信件列表}` | `<li><strong>寄件人</strong> — 主旨</li>` |
| `{今日行程列表}` | `<li><span class="time-tag">HH:MM</span>行程名稱</li>` |
| `{今日待辦清單}` | `.todo-item` div 區塊，id 用任務流水號 `todo-1`、`todo-2`... |
| `{進行中專案列表}` | `.project-item` div 區塊 |
| `{行動一～三}` / `{原因一～三}` | 文字直接填入 |

---

## 注意事項

- 若某個資料來源查詢失敗，在對應區塊填入：`<li class="error-note">⚠️ 資料取得失敗，請稍後確認</li>`
- 待辦任務超過 10 筆，優先顯示**今天到期**或**逾期**的（逾期 due-tag 加 `overdue` class）
- 行程時間轉換為台灣時間（UTC+8）顯示
- 所有文字內容使用**繁體中文**
- HTML 必須為完整自含式，`{...}` 佔位符全部替換為實際資料後才寫檔
