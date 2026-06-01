---
name: weekly-schedule-report
description: 每週一早上自動產生本週優先任務報告（WIP 專案、待辦任務、行程），並透過 Claude in Chrome 自動發送 Email 至 garfiwang@gmail.com
---

每週一早上 08:00 執行以下任務：

1. 查詢 Notion 的 [G] Projects Database，找出所有 Status = WIP 的專案
2. 查詢 Notion 的 [G] Tasks Database，找出未完成（Done = NO）且到期日在接下來七天內的任務
3. 查詢 Google Calendar，取得接下來七天的所有行程
4. 整合以上資料，產出本週優先任務報告
5. 使用 Gmail MCP 的 gmail_create_draft 工具，將報告建立為草稿，收件人為 garfiwang@gmail.com，主旨格式為「📋 本週優先任務報告｜YYYY年M月D日（週X）」，內容為繁體中文 HTML 格式（包含：WIP 專案表格、待完成任務、本週行程、本週三大優先行動）
6. 草稿建立成功後，使用 Claude in Chrome 完成以下自動發送步驟：
   a. 使用 navigate 工具開啟 https://mail.google.com
   b. 等待 Gmail 載入完成後，使用 find 工具定位左側「草稿」(Drafts) 資料夾並點擊
   c. 找到剛才建立的草稿（主旨包含「本週優先任務報告」），點擊開啟
   d. 找到「傳送」(Send) 按鈕並點擊發送
   e. 確認信件已成功送出

注意事項：
- 若 Gmail 介面顯示為英文，Drafts 資料夾名稱為 "Drafts"，發送按鈕為 "Send"
- 若 Claude in Chrome 無法找到草稿或發送按鈕，請回報錯誤訊息，但仍繼續完成其他步驟
- 整個流程為自動執行，無需等待使用者輸入