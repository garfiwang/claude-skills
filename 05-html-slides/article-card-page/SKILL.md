---
name: article-card-page
version: 1.2.0
description: |
  專欄新聞速讀網頁製作技能：自動將新聞、專欄、長文或圖片教材，重構為「手機優先滑動卡片（重點速讀）＋ 全文閱讀」高質感雙模式網頁，並自動部署至 GitHub Pages。
  
  當使用者說「專欄排版」、「專欄文章排版」、「精選文章排版」、「文章排版」、「文章轉網頁」、「新聞速讀排版」、「專欄轉網頁」、「製作文章速讀網頁」、「新聞網頁排版」、「做成重點速讀網頁」、「製作卡片速讀網頁」、「文章卡片排版」、「專欄卡片排版」或「文章雙模式發布」時務必使用此 Skill。
changelog:
  - version: 1.2.0
    date: 2026-09-17
    note: 新增多組高頻觸發關鍵詞，擴充工程踩坑經驗庫與標準模板
  - version: 1.1.0
    date: 2026-09-17
    note: 移除傳統簡報與試算小工具，確立極致純粹的雙模式閱讀架構
  - version: 1.0.0
    date: 2026-09-17
    note: 初始建立手機優先 Swiper 6 頁速讀卡片與全文長文閱讀雙模式技能
---

# 專欄新聞速讀網頁製作技能指令（Article Card & Full-Text Webpage）

當使用者提供一篇文章、專欄、新聞圖片或長篇文字，並希望排版成現代化網頁時，必須嚴格遵循本技能的工作流程、雙模式架構與自動發布 SOP。

---

## 1. 核心定位與設計理念

1. **雙模式架構（極致簡約、專注閱讀）**：
   - 📱 **重點速讀模式（Slide Card View）**：以 Swiper.js 手機優先滑動卡片呈現，將長文提煉為 **5～7 頁核心精華卡片**，適合手機滑動、社群分享與快速掌握重點。桌面端自動居中（`max-w-lg`）呈現如 App 般的高質感體驗。
   - 📜 **全文閱讀模式（Full Article Mode）**：100% 完整收錄原專欄所有文字與段落，搭配經典新聞報頭、關鍵數據摘要框與精緻排版，供讀者深度細讀。
2. **無多餘冗餘功能**：
   - 不添加額外無關的試算小工具、多餘懸浮按鈕或傳統笨重投影片模式。
   - 頂部導覽列僅保留：**出處標籤 + 專欄標題/作者 +「重點速讀」/「全文閱讀」雙切換 Tab**。

---

## 2. 📱 重點速讀卡片（Swiper Deck）黃金 6 頁結構

| 頁碼 | 頁面主題 | 內容要素與排版規範 |
|---|---|---|
| **Slide 1** | **封面與案例背景** | 出處期數徽章、大主標題（`Noto Serif TC` 金黃漸層或亮白）、副標題、真實案例背景卡。 |
| **Slide 2** | **核心盲點與問題** | 標籤「核心盲點 01」、核心問題大標、3 大條列關鍵分析點、作者提醒警示卡。 |
| **Slide 3** | **關鍵數據/前後對比** | 標籤「數據對比 02」、3 條橫向數據大字對比卡（大字數字 `28px~36px`）、利差/趨勢小結。 |
| **Slide 4** | **市場反常/外部局勢** | 標籤「市場現象 03」、黑天鵝或反常經濟現象卡片（搭配 emoji 如 🇨🇳 🇯🇵 ⚠️）、局勢引言。 |
| **Slide 5** | **行動指南/戰術建議** | 標籤「行動指南 04」、三大編號行動方針卡（`1. 安全第一` `2. 分流配置` `3. 雙邊防禦`）。 |
| **Slide 6** | **專家金句與總結** | 標籤「專家金句」、紅色高對比引言卡（標註作者姓名/職稱）、3 點核心總結條列。 |

---

## 3. 視覺規範與技術標準

* **技術棧**：Tailwind CSS (CDN) + Swiper.js v11 + Google Fonts (`Noto Sans TC` 與 `Noto Serif TC`)。
* **配色方案**：
  - 深黑背景：`#0B0F19` 與 `#0F172A`
  - 品牌強調紅：`#C8102E`
  - 金黃亮色：`#F59E0B`
  - 玻璃卡片：`rgba(30, 41, 59, 0.8)` 搭配 `border: 1px solid rgba(255, 255, 255, 0.1)`
* **底部控制列**：
  - 包含 `‹ 上一頁`、`左右滑動 • 可上下滾動`、`下一頁 ›`（最後一頁自動變為 `回到首頁 ↺`）。
  - 分頁點點（Swiper pagination）自然吸附在底部。

---

## 4. 標準 HTML 核心代碼模板

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <title>{{頁面標題}}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body { font-family: 'Noto Sans TC', sans-serif; background-color: #0B0F19; color: #F8FAFC; }
    .mobile-slide-content { height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 1.5rem 1.25rem 2rem 1.25rem; }
    .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.35); opacity: 1; width: 7px; height: 7px; transition: all 0.3s ease; }
    .swiper-pagination-bullet-active { background: #F59E0B !important; width: 24px; border-radius: 6px; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">

  <!-- 頂部導覽列 -->
  <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6">
    <div class="max-w-4xl mx-auto flex items-center justify-between gap-3">
      <div class="flex items-center space-x-3">
        <span class="inline-flex items-center justify-center px-2.5 py-1 text-xs font-black tracking-wider bg-red-600 text-white rounded shadow-sm">
          {{出處媒體}}
        </span>
        <div>
          <h1 class="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5 line-clamp-1">
            <span>{{文章標題}}</span>
          </h1>
          <p class="text-[11px] text-slate-400 hidden sm:block">專欄作者：{{作者與職稱}}</p>
        </div>
      </div>

      <!-- 雙模式切換 Tab -->
      <div class="bg-slate-800/90 p-1 rounded-xl flex text-xs font-bold border border-slate-700 shadow-inner">
        <button id="tab-mobile-slide" onclick="switchMainView('slide')" class="px-3 py-1.5 rounded-lg transition-all text-white bg-red-600 shadow flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          <span>重點速讀</span>
        </button>
        <button id="tab-article" onclick="switchMainView('article')" class="px-3 py-1.5 rounded-lg transition-all text-slate-300 hover:text-white flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          <span>全文閱讀</span>
        </button>
      </div>
    </div>
  </header>

  <!-- 模式 1：重點速讀 -->
  <main id="view-mobile-slide" class="flex-1 flex flex-col items-center justify-center h-[calc(100vh-62px)] w-full overflow-hidden bg-slate-950">
    <div class="w-full max-w-lg h-full flex flex-col bg-slate-900/60 sm:border-x sm:border-slate-800 shadow-2xl relative">
      <div class="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span class="font-bold tracking-wider text-slate-200">文章焦點速讀</span>
        </div>
        <div id="mobile-page-indicator" class="font-mono font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
          1 / 6
        </div>
      </div>

      <div class="swiper mobileSwiper flex-1 w-full h-full">
        <div class="swiper-wrapper">
          <!-- 6 頁 Slide 結構 -->
        </div>
        <div class="swiper-pagination py-2 shrink-0"></div>
      </div>

      <div class="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-t border-slate-800 shrink-0">
        <button id="btn-prev" class="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold transition">
          ‹ 上一頁
        </button>
        <span class="text-[11px] text-slate-400">左右滑動 • 可上下滾動</span>
        <button id="btn-next" class="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-black transition shadow-md shadow-amber-500/20">
          下一頁 ›
        </button>
      </div>
    </div>
  </main>

  <!-- 模式 2：全文長文閱讀 -->
  <section id="view-article" class="hidden flex-1 py-8 px-4 sm:px-6 max-w-3xl mx-auto w-full">
    <div class="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-200">
      <!-- 完整逐字文章內容 -->
    </div>
  </section>

  <!-- 頁尾 -->
  <footer class="bg-slate-900 border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-400">
    <p>{{專欄與版權資訊}}</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script>
    function switchMainView(view) {
      const slideView = document.getElementById('view-mobile-slide');
      const articleView = document.getElementById('view-article');
      const tabSlide = document.getElementById('tab-mobile-slide');
      const tabArticle = document.getElementById('tab-article');

      if (view === 'slide') {
        slideView.classList.remove('hidden');
        articleView.classList.add('hidden');
        tabSlide.className = "px-3 py-1.5 rounded-lg transition-all text-white bg-red-600 shadow flex items-center gap-1.5";
        tabArticle.className = "px-3 py-1.5 rounded-lg transition-all text-slate-300 hover:text-white flex items-center gap-1.5";
      } else if (view === 'article') {
        slideView.classList.add('hidden');
        articleView.classList.remove('hidden');
        tabArticle.className = "px-3 py-1.5 rounded-lg transition-all text-white bg-red-600 shadow flex items-center gap-1.5";
        tabSlide.className = "px-3 py-1.5 rounded-lg transition-all text-slate-300 hover:text-white flex items-center gap-1.5";
      }
    }

    const mobileSwiper = new Swiper(".mobileSwiper", {
      direction: "horizontal", loop: false, speed: 350,
      pagination: { el: ".swiper-pagination", clickable: true },
      keyboard: { enabled: true },
      on: {
        slideChange: function () {
          const total = this.slides.length;
          const current = this.activeIndex + 1;
          document.getElementById('mobile-page-indicator').textContent = `${current} / ${total}`;
          document.getElementById('btn-prev').style.opacity = current === 1 ? '0.35' : '1';
          document.getElementById('btn-next').textContent = current === total ? '回到首頁 ↺' : '下一頁 ›';
        }
      }
    });

    document.getElementById('btn-prev').addEventListener('click', () => mobileSwiper.slidePrev());
    document.getElementById('btn-next').addEventListener('click', () => {
      if (mobileSwiper.activeIndex === mobileSwiper.slides.length - 1) mobileSwiper.slideTo(0);
      else mobileSwiper.slideNext();
    });
  </script>
</body>
</html>
```

---

## 5. 自動化發布 SOP

1. **建立專屬目錄與檔案**：
   - 建立 `index.html` 與 `README.md`。
2. **建立公開倉庫並推送**：
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "feat: 新增專欄速讀與全文閱讀發布網頁"
   gh repo create garfiwang/<repo-name> --public --source=. --remote=origin --push
   ```
3. **啟用 GitHub Pages**：
   ```bash
   gh api --method POST repos/garfiwang/<repo-name>/pages -F "source[branch]=main" -F "source[path]=/"
   ```
4. **驗證與打開網頁**：
   ```bash
   open https://garfiwang.github.io/<repo-name>/
   ```
