# 專欄新聞速讀網頁 ── 踩坑紀錄與工程經驗庫 (Troubleshooting & Pitfalls)

本文檔詳細記錄了在開發「重點速讀 + 全文閱讀」雙模式排版技能過程中，所遭遇的 **8 大技術地雷** 與對應的最佳實踐方案。

---

## 1. 🕳️ 行動端視區高度陷阱（iOS Safari 100vh 遮蔽問題）

* **症狀**：在 iPhone Safari 或 LINE / WeChat 內嵌瀏覽器開啟時，滑到最底下發現「下一頁」按鈕被系統底部網址列遮住，或底部出現多餘黑邊。
* **原因分析**：經典 CSS `height: 100vh` 在 iOS Safari 上會忽略動態縮放的導覽列與工具列，導致計算高度大於實際可視高度。
* **解決方案**：
  ```css
  /* 採用動態高度與 calc 扣除 header */
  height: calc(100vh - 62px);
  height: calc(100dvh - 62px);
  overflow: hidden;
  ```
  並將 Footer 控制列設定在 Flex Column 的最底層，自然貼齊底部。

---

## 2. 🕳️ 傳統 PPT 框架（Reveal.js）的縮放崩潰

* **症狀**：使用傳統投影片庫做手機版時，文字等比縮小至 30%～40%，成為不可讀的「螞蟻字」，上下留有 50% 黑色無用空間。
* **原因分析**：Reveal.js 等桌面演講框架採用強制等比比例縮放（Scale Transform），無法原生適應行動端螢幕流動。
* **解決方案**：
  - **嚴禁在手機模式中使用 Reveal.js**。
  - 改用 **Swiper.js** 配合現代標準 Web 像素渲染，字體維持在 `17px ~ 22px`，大標題 `28px ~ 36px`。

---

## 3. 🕳️ DOM 閉合錯誤引發的卡片重疊

* **症狀**：左右滑動時發現第 3 頁文字底下壓著第 4 頁的標題，或滑動到最後一頁卡住。
* **原因分析**：HTML 模板中 `.swiper-slide` 內部的 `<div>` 標籤遺漏閉合，導致多個卡片層次錯亂。
* **解決方案**：
  - 嚴格維持 `.swiper-wrapper` 內部剛好 6 個獨立完整閉合的 `.swiper-slide` 容器。
  - 每頁內含獨立的 `.mobile-slide-content` 做上下捲動。

---

## 4. 🕳️ 功能過載（Feature Creep）導致使用者體驗下降

* **症狀**：網頁中塞入「桌面演講簡報」、「利差試算小工具」、「多重主題切換」等多餘功能，導致首頁過載、使用者難以抓住文章重點。
* **原因分析**：過度設計（Over-engineering），偏離了「將專欄清晰傳遞給讀者」的第一原則。
* **解決方案**：
  - **克制設計原則**：只保留「重點速讀」與「全文閱讀」兩個互補模式。
  - 移除多餘互動計算器與笨重投影片，回歸乾淨純粹的內容呈現。

---

## 5. 🕳️ 瀏覽器強快取導致更新看不到

* **症狀**：GitHub Pages 重新部署成功後，在手機或客戶裝置打開依然是舊版本內容。
* **原因分析**：LINE、Safari 與 Chrome 對靜態 HTML 檔案有長效快取策略。
* **解決方案**：
  在 `<head>` 中加入三組標準防快取標頭：
  ```html
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  ```

---

## 6. 🕳️ 寬螢幕桌面端拉伸變形

* **症狀**：在 27 吋電腦螢幕或筆電全螢幕瀏覽時，卡片文字被拉扯至 1920px 寬，行距過長極難閱讀。
* **解決方案**：
  - 在外層容器加上 `max-w-lg`（約 512px 寬度）與 `mx-auto`，並給予細微邊框與柔和陰影。
  - 在電腦螢幕上呈現如精緻 Mobile App 介面，兼顧大螢幕的高級感與閱讀流暢度。

---

## 7. 🕳️ 觸控手勢與垂直捲動衝突

* **症狀**：卡片內文較長時，手指在螢幕上下滑動常誤觸發左右切換頁面。
* **解決方案**：
  在 Swiper 初始化中維持適度阻尼感，並在內文容器加上 `-webkit-overflow-scrolling: touch`：
  ```javascript
  const mobileSwiper = new Swiper(".mobileSwiper", {
    direction: "horizontal",
    speed: 350,
    touchRatio: 1.0,
    resistanceRatio: 0.85
  });
  ```

---

## 8. 🕳️ 全文閱讀模式的字級與段落呼吸感

* **症狀**：全文模式文字過小（如 14px），段落緊黏，年長者或高階客戶閱讀吃力。
* **解決方案**：
  - 基礎字體設為 **`18px ~ 19.5px`**。
  - 行高設為 **`1.9`**，段落間距設為 `space-y-6`。
  - 首行縮排 `indent-8`（約 2 個中文字），重現經典專欄閱讀質感。
