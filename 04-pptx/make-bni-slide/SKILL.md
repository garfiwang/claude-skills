---
name: 製作 BNI 簡報
version: 1.0.0
description: 當使用者要求「製作 BNI 簡報」、「做 BNI 簡報」或提及此觸發詞時，將引導使用者選擇簡報格式（PPTX 或 HTML），並依據 BNI 官方配色與規格自動化生成簡報。
changelog:
  - version: 1.0.0
    date: 2026-07-01
    note: 初始版本，支援 HTML/PPTX 雙格式 BNI 簡報產出與自動部署
---

# 製作 BNI 簡報 技能指令

當使用者輸入包含「製作 BNI 簡報」之觸發詞時，你必須依循此技能指南執行工作流程。

---

## 1. 互動開場 (必須第一步執行)

聽到觸發字後，**請不要直接生成內容**，第一時間必須先向使用者回傳以下詢問：

> **請問你要做哪一種版本的簡報？**
>
> 1. **PPTX** (下載後可在 Office PPT 或 Keynote 中編輯與報告的經典簡報)
> 2. **HTML** (由 Reveal.js 驅動的互動式簡報，支援卡片網格與單鍵預演登記，可直接部署至 GitHub Pages)

---

## 2. 根據使用者的選擇進行實作

### 方案 A：如果使用者選擇 HTML

你必須依照以下精確的設計規範與流程製作：

#### A-1. 視覺設計與配色系統 (亮色系白底)
- **背景設定**：全域投影片背景使用本地的 `bnilogo.png`。
- **背景尺寸與不透明度**：
  - 必須設定為 **`data-background-size="contain"`** (確保左下 Logo 與右下弧線在任何螢幕比例下都不會超出邊界被截斷)。
  - 不設透明度 (以 **100% 原始色彩** 呈現，即不使用 `data-background-opacity`)。由於圖片主體為白色，它能與 Reveal.js 投影片的白色背景完美融合。
- **字型與顏色對比度**：
  - **主色 (BNI 紅)**：`#d12031`（大標題與重點強調，在白底上非常醒目）。
  - **內文/次標題 (炭灰深藍)**：`#1a2530`（極佳的閱讀易讀性，不易疲勞）。
  - **強調色 (暗金/琥珀)**：`#b67b12`（在白底上具有足夠對比度，用於點綴提示）。
- **字級調整 (防止折字)**：
  - 封面的主標題字體大小設定為 **`1.5em !important;`** (相較預設大標題縮小 2 級)，避免長句換行時單個字體落單的突兀折行。
  - 主內容均集中在中央，與角落 Logo 和弧線完美錯開，保持文字的極致易讀性 (Readability)。

#### A-2. 內容拆分與卡片化
- **封面頁**：引導關注主題，字級精簡化。
- **EDM 資訊頁**：採用卡片網格 (`display: grid`) 呈現，配上微陰影框，截止日期使用虛線紅框搭配脈動動畫。
- **預演清單頁**：使用帶有左邊框的待辦事項樣式，並為登記網址設計明顯的「BNI 紅色實心按鈕」。

#### A-3. 本地預覽與 GitHub Pages 部署
1. 寫入 `index.html`。
2. 啟動本地 Python Web 伺服器並自動開啟預覽：
   ```bash
   python3 -m http.server 8000 & sleep 1 && open http://localhost:8000
   ```
3. 等使用者滿意並確認後，使用 GitHub CLI 建立倉庫並發佈：
   ```bash
   git init
   git config user.email "<email>"
   git config user.name "<username>"
   git checkout -b main
   git add index.html bnilogo.png
   git commit -m "feat: BNI Presentation HTML Slide"
   gh repo create <repo-name> --public --source=. --push
   gh api repos/<username>/<repo-name>/pages --method POST -f "source[branch]=main" -f "source[path]=/"
   ```

---

### 方案 B：如果使用者選擇 PPTX

你必須使用 Python `python-pptx` 函式庫 or 內建 PPTX 簡報排版指令：
1. **背景底圖**：以 1920x1080 的 `bnilogo.png` 作為每一頁投影片的 Slide Background，保證左下 Logo 和右下弧線清晰展現。
2. **顏色一致性**：投影片內文標題一律使用 BNI 紅 (`RGB: 209, 32, 49`)，內容使用深炭灰 (`RGB: 26, 37, 48`)。
3. **版面規劃**：將 EDM 欄位和預演清單排版成高質感卡片佈局，且內容不要壓迫到投影片左下角與右下角底圖。
4. **輸出檔案**：將產生的 `.pptx` 檔儲存在專案目錄，並提供下載連結給使用者。
