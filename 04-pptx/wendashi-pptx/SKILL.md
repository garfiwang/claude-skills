---
name: wendashi-pptx
description: >
  製作問大師家族辦公室（Wendashi Family Office）品牌簡報的專屬技能。
  當使用者說「做問大師簡報」、「幫我做一份問大師的簡報」、「做一份信託簡報」、
  「做一份家族辦公室的簡報」、「做一份問大師風格的PPT」，或任何需要產出
  符合問大師品牌識別系統 PPTX 的需求，一律使用此技能。
  即使使用者只給主題或標題，也應觸發此技能，自動套用品牌色彩、版型和規範，
  產出可下載的 .pptx 檔案。
---

# 問大師家族辦公室 · 簡報製作技能

## 品牌色彩系統

```
深棕色  #3E2115  → Primary 主色（標題、Header 底色、章節頁背景）
金黃色  #FFD700  → Accent 強調（分隔線、Bullet 圓點、底部色條）
米白色  #F9F5F0  → Background 背景（所有內容頁主背景）
朱紅色  #CF202E  → Alert 警示（重要數字、警示訊息、數據強調）
暖棕色  #A47551  → Neutral 輔助（副標、頁碼、Caption）
```

**pptxgenjs 色碼（不加 # 號）：**
- deepBrown: `"3E2115"`
- gold:      `"FFD700"`
- cream:     `"F9F5F0"`
- red:       `"CF202E"`
- warmBrown: `"A47551"`
- white:     `"FFFFFF"`

---

## Logo 使用規範

| 版本 | 使用場景 | 規則 |
|------|---------|------|
| 標準版（米白底） | 所有米白色 `#F9F5F0` 背景頁面（內容頁、數據頁、兩欄頁、引言頁） | 使用書法 Logo PNG（透明背景），自然呈現原始配色，置於右下角固定位置 |
| 反白版（深棕底） | 深色背景頁面（章節頁、結尾頁） | **不放 Logo**，深棕背景上不加入任何 Logo 圖形 |

**Logo 三大禁止事項：**
- **禁止拉伸變形**：不得水平或垂直拉伸 Logo，必須保持原始比例縮放（固定 `w: 2.4, h: 0.35`）
- **禁止更換顏色**：不可對 Logo 圖像加上色彩濾鏡、更改不透明度或重新上色，以原始圖像呈現（`addImage` 不加任何濾鏡屬性）
- **固定右下角位置**：Logo 固定於 `x: 7.3, y: 5.2, w: 2.4, h: 0.35`，位置不可隨意移動，Logo 旁不加任何裝飾圖形

---

## 七種標準版型

| 版型 | 用途 | 背景 | 特徵 |
|------|------|------|------|
| 封面頁 | 每份簡報第一頁 | 米白+背板圖 | 金黃垂直線、主標題、Logo右下 |
| 章節頁 | 換主題分隔 | 深棕 | 大字幕號水印、金黃垂直線 |
| 內容頁（條列） | 標準論點頁 | 米白 | 深棕Header、金黃Bullet圓點 |
| 兩欄頁 | 比較對照 | 米白 | 左白卡右棕卡、金黃左側邊線 |
| 數據頁 | 大數字強調 | 米白 | 三色塊（深棕/金黃/朱紅） |
| 引言頁 | 金句 / 關鍵訊息 | 米白 | 金黃大 Highlight Bar |
| 結尾頁 | 感謝 / 聯絡資訊 | 深棕 | 金黃頂部色條（深棕底不放 Logo） |

---

## 固定設計元素（每頁必有）

1. **金黃底線**：每頁底部 `y: 5.5, h: 0.125`，色碼 `FFD700`
2. **Logo 圖檔**：僅米白底頁面放置，右下角固定 `x: 7.3, y: 5.2, w: 2.4, h: 0.35`；深棕底頁面（章節頁、結尾頁）不放 Logo
3. **Header 色塊**：內容頁/數據頁/兩欄頁用 `#3E2115` 深棕 Header，文字 `#FFD700`
4. **頁碼**：右上角 Header 區塊內，暖棕色，右對齊

---

## 技術規範

- **工具**：`pptxgenjs`（Node.js），`npm install -g pptxgenjs`
- **投影片尺寸**：`LAYOUT_16x9`（10" × 5.625"）
- **字型**：`fontFace: "Calibri"`（英數）/ 繁體中文字以 Calibri 呈現
- **色碼**：永遠不加 `#` 號，否則會造成檔案損毀
- **shadow 物件**：每次 `addShape` 使用 shadow 必須用 `makeShadow()` 工廠函式，不可重用同一物件
- **圖檔資源**：Logo 與封面背景圖存放於 `assets/` 資料夾，程式碼頂端必須加入：
  ```javascript
  const path = require("path");
  ```
  圖檔路徑一律使用 `path.join(__dirname, "assets/logo.png")` 形式

---

## 製作流程

### Step 1：讀取技能 + 確認需求

收到「做問大師簡報」後，確認：
- **主題**：簡報主題是什麼？（若未說明，直接問）
- **頁數**：幾頁？（預設：封面+章節+3~5張內容+結尾，共6~8頁）
- **內容**：有沒有提供文字大綱？（若無，依主題自動生成）

### Step 2：規劃版型配置

依主題決定版型順序，例如：
```
封面頁 → 章節頁 → 內容頁×3 → 數據頁 → 引言頁 → 結尾頁
```

### Step 3：撰寫 pptxgenjs 程式碼

**必須遵守的程式規範：**

```javascript
const pptxgen = require("pptxgenjs");
const path = require("path");

// ── 色彩常數
const C = {
  deepBrown: "3E2115",
  gold:      "FFD700",
  cream:     "F9F5F0",
  red:       "CF202E",
  warmBrown: "A47551",
  white:     "FFFFFF",
};

// ── Shadow 工廠（每次呼叫產生新物件，避免 pptxgenjs 物件污染）
function makeShadow() {
  return { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 };
}

// ── 金黃底線（每頁必加）
function addGoldBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.5, w: 10, h: 0.125,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 }
  });
}

// ── Logo（右下角，內容頁用）── 使用圖檔
function addLogo(slide) {
  slide.addImage({
    path: path.join(__dirname, "assets/logo.png"),
    x: 7.3, y: 5.2, w: 2.4, h: 0.35,
  });
}

// ── 深棕 Header（內容頁、數據頁、兩欄頁通用）
function addHeader(slide, title, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.95,
    fill: { color: C.deepBrown }, line: { color: C.deepBrown, width: 0 }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.1, h: 0.95,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 }
  });
  slide.addText(title, {
    x: 0.3, y: 0, w: 8, h: 0.95,
    fontSize: 22, fontFace: "Calibri", bold: true,
    color: C.gold, align: "left", valign: "middle", margin: 0
  });
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: 8.8, y: 0, w: 1, h: 0.95,
    fontSize: 14, fontFace: "Calibri",
    color: C.warmBrown, align: "right", valign: "middle", margin: 0
  });
}
```

### Step 4：版型程式碼模板

#### 封面頁
```javascript
{
  // 全頁滿版背景圖（已內建城市線稿、光暈、品牌 Logo）
  s.addImage({
    path: path.join(__dirname, "assets/cover_bg.png"),
    x: 0, y: 0, w: 10, h: 5.625,
  });
  // 金黃垂直裝飾線
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.3, w: 0.08, h: 2.6, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  // 主標題
  s.addText("【主標題】", { x: 0.8, y: 1.3, w: 5.0, h: 1.1, fontSize: 38, fontFace: "Calibri", bold: true, color: C.deepBrown, align: "left", valign: "middle", margin: 0 });
  // 金黃分隔線
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.52, w: 4.2, h: 0.035, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  // 副標題
  s.addText("【副標題 · 日期】", { x: 0.8, y: 2.65, w: 5.0, h: 0.55, fontSize: 15, fontFace: "Calibri", color: C.warmBrown, align: "left", valign: "top", margin: 0 });
  // 場合標籤
  s.addText("【場合】", { x: 0.8, y: 3.3, w: 3.2, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0, fill: { color: C.deepBrown }, shape: pres.shapes.RECTANGLE });
  // 注意：封面背景圖右下角已內嵌 Logo，不需再疊加
  addGoldBar(s);
}
```

#### 章節頁
```javascript
{
  s.background = { color: C.deepBrown };
  // 大字幕號水印
  s.addText("01", { x: 6.0, y: 0.4, w: 3.8, h: 4.5, fontSize: 200, fontFace: "Calibri", bold: true, color: C.gold, transparency: 80, align: "right", valign: "middle", margin: 0 });
  // 金黃垂直線
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.4, w: 0.1, h: 2.5, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("SECTION 01", { x: 1.0, y: 1.4, w: 5, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.gold, align: "left", valign: "middle", margin: 0 });
  s.addText("【章節標題】", { x: 1.0, y: 2.0, w: 5.5, h: 1.1, fontSize: 36, fontFace: "Calibri", bold: true, color: C.white, align: "left", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 3.2, w: 3.5, h: 0.04, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("【章節副標】", { x: 1.0, y: 3.35, w: 5.5, h: 0.5, fontSize: 15, fontFace: "Calibri", color: C.warmBrown, align: "left", valign: "top", margin: 0 });
  // 注意：章節頁為深棕底（反白版），不放 Logo
}
```

#### 內容頁（條列）
```javascript
{
  s.background = { color: C.cream };
  addHeader(s, "【頁面標題】", pageNum);
  // 金黃圓點 Bullet + 內容
  const bullets = ["要點一", "要點二", "要點三", "要點四"];
  bullets.forEach((text, i) => {
    const yPos = 1.25 + i * 0.88;
    s.addShape(pres.shapes.OVAL, { x: 0.45, y: yPos + 0.13, w: 0.13, h: 0.13, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
    s.addText(text, { x: 0.72, y: yPos, w: 8.8, h: 0.6, fontSize: 15, fontFace: "Calibri", color: C.deepBrown, align: "left", valign: "top", margin: 0 });
  });
  addLogo(s);
  addGoldBar(s);
}
```

#### 數據頁（三色塊）
```javascript
{
  s.background = { color: C.cream };
  addHeader(s, "【頁面標題】", pageNum);
  const stats = [
    { num: "85%",   label: "說明標籤", sub: "補充說明", color: C.deepBrown, textColor: C.gold,      subColor: "C9B9A8" },
    { num: "3,000", label: "說明標籤", sub: "補充說明", color: C.gold,      textColor: C.deepBrown, subColor: C.warmBrown },
    { num: "20年",  label: "說明標籤", sub: "補充說明", color: C.red,       textColor: C.white,     subColor: "F5BCBC" },
  ];
  stats.forEach((st, i) => {
    const x = 0.4 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.15, w: 2.9, h: 3.0, fill: { color: st.color }, shadow: makeShadow(), line: { color: st.color, width: 0 } });
    s.addText(st.num,   { x: x+0.1, y: 1.4,  w: 2.7, h: 1.3, fontSize: 52, fontFace: "Calibri", bold: true, color: st.textColor, align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x+0.5, y: 2.75, w: 1.9, h: 0.04, fill: { color: st.subColor }, line: { color: st.subColor, width: 0 } });
    s.addText(st.label, { x: x+0.1, y: 2.85, w: 2.7, h: 0.45, fontSize: 15, fontFace: "Calibri", bold: true, color: st.textColor, align: "center", valign: "top", margin: 0 });
    s.addText(st.sub,   { x: x+0.1, y: 3.35, w: 2.7, h: 0.5,  fontSize: 12, fontFace: "Calibri", color: st.subColor, align: "center", valign: "top", margin: 0 });
  });
  addLogo(s);
  addGoldBar(s);
}
```

#### 引言頁
```javascript
{
  s.background = { color: C.cream };
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.7, w: 8.6, h: 2.0, fill: { color: C.gold }, shadow: makeShadow(), line: { color: C.gold, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.7, w: 0.15, h: 2.0, fill: { color: C.deepBrown }, line: { color: C.deepBrown, width: 0 } });
  s.addText("【金句內容】", { x: 1.1, y: 1.72, w: 8.0, h: 1.96, fontSize: 26, fontFace: "Calibri", bold: true, color: C.deepBrown, align: "left", valign: "middle", margin: 0 });
  s.addText("— 【引述來源】", { x: 1.1, y: 3.82, w: 6.0, h: 0.45, fontSize: 14, fontFace: "Calibri", italic: true, color: C.warmBrown, align: "left", margin: 0 });
  addLogo(s);
  addGoldBar(s);
}
```

#### 兩欄頁
```javascript
{
  s.background = { color: C.cream };
  addHeader(s, "【頁面標題】", pageNum);
  // 左欄（白底）
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.1, w: 4.35, h: 3.95, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E0D8CF", width: 0.5 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.1, w: 0.1, h: 3.95, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("【左欄標題】", { x: 0.65, y: 1.2, w: 3.85, h: 0.5, fontSize: 18, fontFace: "Calibri", bold: true, color: C.deepBrown, align: "left", valign: "top", margin: 0 });
  s.addText("【左欄內容說明文字】", { x: 0.65, y: 1.82, w: 3.8, h: 2.9, fontSize: 13, fontFace: "Calibri", color: C.deepBrown, align: "left", valign: "top", margin: 0 });
  // 右欄（深棕底）
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.1, w: 4.35, h: 3.95, fill: { color: C.deepBrown }, shadow: makeShadow(), line: { color: C.deepBrown, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.1, w: 0.1, h: 3.95, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("【右欄標題】", { x: 5.6, y: 1.2, w: 3.8, h: 0.5, fontSize: 18, fontFace: "Calibri", bold: true, color: C.gold, align: "left", valign: "top", margin: 0 });
  s.addText("【右欄內容說明文字】", { x: 5.6, y: 1.82, w: 3.8, h: 2.9, fontSize: 13, fontFace: "Calibri", color: "E8DDD5", align: "left", valign: "top", margin: 0 });
  addLogo(s);
  addGoldBar(s);
}
```

#### 結尾頁
```javascript
{
  s.background = { color: C.deepBrown };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.18, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("感謝您的聆聽", { x: 1, y: 1.2, w: 8, h: 1.2, fontSize: 44, fontFace: "Calibri", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 2.55, w: 3.0, h: 0.05, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("【副標語或 CTA 文字】", { x: 1, y: 2.75, w: 8, h: 0.55, fontSize: 17, fontFace: "Calibri", color: C.warmBrown, align: "center", valign: "top", margin: 0 });
  // 聯絡資訊框
  s.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 3.5, w: 5.0, h: 1.3, fill: { color: "FFFFFF", transparency: 92 }, line: { color: C.gold, width: 1 } });
  s.addText([{ text: "【聯絡方式 · E-mail · 電話】", options: { breakLine: true } }, { text: "www.wendashi.com.tw", options: { color: C.gold } }], { x: 2.5, y: 3.5, w: 5.0, h: 1.3, fontSize: 13, fontFace: "Calibri", color: "C9B9A8", align: "center", valign: "middle", margin: 0 });
  // 注意：結尾頁為深棕底（反白版），不放 Logo
}
```

---

### Step 5：QA 檢查清單

產出 PPTX 後，必須轉成圖片進行視覺 QA：

```bash
python3 scripts/office/soffice.py --headless --convert-to pdf output.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 output.pdf slide
ls -1 "$PWD"/slide-*.jpg
```

**檢查重點：**
- [ ] 每頁底部有金黃底線
- [ ] Logo 僅出現於米白底頁面，右下角位置正確（`x:7.3, y:5.2`）
- [ ] 章節頁、結尾頁無 Logo（深棕底反白版）
- [ ] Logo 無拉伸變形、無色彩濾鏡
- [ ] Header 深棕底、金黃文字
- [ ] 無文字溢出或元件重疊
- [ ] 章節頁：深棕背景、金黃垂直線
- [ ] 數據頁：三色塊完整顯示

---

## 常見錯誤避免

| 錯誤 | 正確做法 |
|------|---------|
| `color: "#FFD700"` | `color: "FFD700"`（不加 #） |
| 重用 shadow 物件 | 每次呼叫 `makeShadow()` 產生新物件 |
| Logo 位置錯誤 | 右下角固定 `x:7.3, y:5.2, w:2.4, h:0.35` |
| 忘記金黃底線 | 每頁都呼叫 `addGoldBar(s)` |
| 圖檔路徑寫死絕對路徑 | 使用 `path.join(__dirname, "assets/logo.png")` |
| 封面頁再疊加 Logo 圖 | 封面背景圖右下角已內嵌 Logo，無需再疊加 |
| 章節頁放 Logo | 章節頁為深棕底（反白版），不放任何 Logo |
| 結尾頁放 Logo | 結尾頁為深棕底（反白版），不放任何 Logo |
| Logo 拉伸變形 | 固定比例 `w:2.4, h:0.35`，禁止任意調整寬高 |
| Logo 加濾鏡或調透明度 | `addImage` 不加任何濾鏡屬性，以原始圖像呈現 |
| Logo 旁加裝飾圖形 | Logo 右下角位置獨立，旁邊不加任何裝飾元素 |

---

## 輸出格式

- 檔名格式：`問大師_{主題}_{YYYYMMDD}.pptx`
- 輸出路徑：`/mnt/user-data/outputs/`
- 完成後使用 `present_files` 工具提供下載連結
