---
name: pptx-legal-slide
version: 1.1.0
description: >
  問大師家族辦公室「簡報法規版」投影片製作技能。當使用者說「簡報法規版」、
  「做一張法規投影片」、「製作判決投影片」、「幫我做法條投影片」、
  「法規簡報」、「條文投影片」，立即觸發此技能，依照問大師品牌格式
  （深棕 + 金黃 + 米白）製作引用法條或判決的單頁 PPTX 投影片。
  適用場景：引用保險法條文、引用法院判決、引用遺產稅法規、
  引用任何法律條文或司法裁判作為課程教材投影片。
changelog:
  - version: 1.1.0
    date: 2026-07-03
    note: 新增浮水印啟用/停用選擇功能與浮水印規範說明
  - version: 1.0.0
    date: 2026-06-12
    note: 初始版本
---

# 簡報法規版技能

## 功能概述

製作問大師家族辦公室品牌風格的法規/判決引用類型 PPTX 投影片，版面採用深棕色標題列 + 金色強調 + 米白底色的一貫設計語言。

## 步驟一：收集資訊與浮水印確認

若使用者未完整提供以下資訊，依序詢問：

1. **主標題**（顯示在頂部深棕色標題列）
2. **法規/判決標籤**（深棕色標籤區的金色標題，例如：「保險法 112 條」或「臺灣高等法院民事判決 91年度重家上字第8號（節錄整理）」）
3. **條文內容**（1–5 條，每條一個 bullet，可直接貼原文）
4. **資料來源附註**（底部小字，例如：「* 資料來源：全國法規資料庫」）
5. **輸出檔名**（建議格式：`問大師_[主題]_[YYYYMMDD].pptx`，例如 `問大師_法院市價判定_20260510.pptx`）
6. **是否需要背景浮水印**（必須提供選項讓使用者選擇）：
   - 1. 我要有浮水印
   - 2. 我不要有浮水印

輸出路徑預設為：`/Users/garfiwang/Documents/Claude/[簡報] 課程使用PPT/`

## 步驟一點五：浮水印圖示設計與排版規範（僅在選擇「我要有浮水印」時執行）

若使用者選擇 **「1. 我要有浮水印」**，必須依循以下規範進行圖示生成與後處理：

### 1. 浮水印圖示生成
* **提示詞規範**：必須要求「高對比的單色線條設計」。
* **推薦 Prompt 格式**：
  > `A minimal, modern flat vector icon showing [主題內容]. The icon is drawn in elegant gold lines (#C9A227) on a solid dark brown square background (#3E2115). High contrast, premium look, clean outline, no text.`
* **禁用項**：禁止文字、複雜漸層、立體浮雕。

### 2. 圖像後處理與不透明度轉換
* **自動去背**：使用 Python 腳本（PIL/Numpy）進行色彩過濾，將非金黃色線條的背景像素之 Alpha 值設為 `0`。
* **色彩與不透明度轉換**：
  * 將金色線條轉換為品牌文字色 `#3E2115`（RGB: `62, 33, 21`）。
  * 中央背景浮水印不透明度固定為 **`8%`** (Alpha = `20/255`)，以確保文字閱讀清晰。
  * 右下角裝飾圖示不透明度固定為 **`12%`** (Alpha = `30/255`)。

### 3. 排版與圖層排序
* **尺寸**：固定為 **`3.75` x `3.75` 英吋**。
* **座標**：水平 `Left = 3.125"`，垂直 `Top = 1.40"`（置中於內容區域）。
* **圖層順序**：必須將浮水印移至**最底層 (Send to Back)**，即在 XML 的 `spTree` 中插入至 index `2`。

---

## 步驟二：建立投影片 XML

### 投影片規格

- **尺寸**：9144000 × 5143500 EMU（16:9 寬螢幕）
- **字型**：全站統一使用 `Microsoft JhengHei`
- **色碼**（OOXML 不加 `#`）：
  | 名稱 | 色碼 | 用途 |
  |------|------|------|
  | 深棕 | `3E2115` | 標題列、標籤背景 |
  | 金黃 | `FFD700` | 強調色、分隔線、底條、標籤文字 |
  | 米白 | `F9F5F0` | 投影片背景 |
  | 暖棕 | `A47551` | 附註文字 |
  | 白色 | scheme `bg1` | 標題文字 |

### 版面結構（EMU 座標）

| 元素 | x | y | w | h | 說明 |
|------|---|---|---|---|------|
| 背景 | — | — | — | — | 填色 `F9F5F0` |
| 標題列（深棕） | 0 | 0 | 9144000 | 960120 | 頂部深棕色條 |
| 金色細條（左） | 0 | 0 | 109728 | 960120 | 標題列左側金色 accent |
| 標題文字框 | 274320 | 0 | 8595360 | 960120 | 白色粗體，30pt，水平/垂直置中 |
| 標籤背景（深棕） | 365760 | 1100000 | 8412480 | 430000 | 法規/判決標籤底色 |
| 標籤文字框 | 365760 | 1100000 | 8412480 | 430000 | 金黃色粗體，18pt，置中 |
| 金色分隔線 | 365760 | 1580000 | 8412480 | 50292 | 細金色橫線 |
| 條文內容框 | 365760 | 1670000 | 8412480 | 3050000 | 深棕色文字，16pt |
| 來源附註框 | 365760 | 4780000 | 8412480 | 220000 | 暖棕色，12pt |
| 底部金色條 | 0 | 5029200 | 9144000 | 114300 | 全寬金色底條 |

### 條文格式

每條以 `• ` 開頭（「• 」+ 空格），放在同一個文字框的不同 `<a:p>` 段落：

```xml
<a:pPr marL="342900" indent="-342900">
  <a:buNone/>
  <a:lnSpc><a:spcPts val="2100"/></a:lnSpc>
  <a:spcBef><a:spcPts val="0"/></a:spcBef>
  <a:spcAft><a:spcPts val="800"/></a:spcAft>   <!-- 最後一條用 0 -->
</a:pPr>
```

最後一條的 `<a:spcAft>` 設為 `val="0"`。

## 步驟三：建立 PPTX 檔案

**方法：複製模板 → 解包 → 修改 slide1.xml → 重新打包**

```bash
# 1. 複製模板（沿用所有主題/佈景設定）
TEMPLATE="/Users/garfiwang/Documents/Claude/[簡報] 課程使用PPT/問大師_指定受益人不受民法限制_20260510.pptx"
SKILL_SCRIPTS="/Users/garfiwang/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/4ad30aa1-bf06-4506-840e-dcf952dba530/12158b27-92ff-4cfb-8714-6ab3a4e263f3/skills/pptx/scripts/office"

# 2. 解包模板到暫存目錄
rm -rf /tmp/pptx_legal_work
python3 "$SKILL_SCRIPTS/unpack.py" "$TEMPLATE" /tmp/pptx_legal_work

# 3. 用 Write 工具寫入新的 slide1.xml（依據收集到的內容）

# 4. 從解包目錄打包（注意：必須 cd 進目錄才能打包）
OUTPUT_PPTX="[完整輸出路徑]"
cd /tmp/pptx_legal_work && zip -r /tmp/legal_output.pptx . 2>&1
cp /tmp/legal_output.pptx "$OUTPUT_PPTX"
```

> **重要**：`unpack.py` 路徑中有空格，指令中要加引號。打包時必須先 `cd` 進解包目錄，再執行 `zip -r`，否則路徑結構會錯誤。

## 步驟四：視覺 QA

```bash
# 產生縮圖（環境沒有 LibreOffice，用系統 Quick Look）
qlmanage -t -s 1200 -o /tmp/ "$OUTPUT_PPTX" 2>/dev/null

# 縮圖路徑會是 /tmp/[檔名].png
```

用 Read 工具讀取 PNG 圖片，逐一確認：
- [ ] 標題文字是否完整顯示（注意長標題是否被截斷）
- [ ] 標籤文字是否正確
- [ ] 條文是否全部顯示（無超出邊框）
- [ ] 來源附註是否在底部金條上方
- [ ] 整體配色是否正確（深棕/金黃/米白）

若有問題，修改 slide1.xml 後重新打包再確認。

## slide1.xml 完整模板

下方為標準 XML 骨架，`{{變數}}` 替換為實際內容：

```xml
<?xml version="1.0" encoding="utf-8"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="F9F5F0"/></a:solidFill>
        <a:effectLst/>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>

      <!-- 標題列（深棕底） -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="2" name="Shape 0"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="0" y="0"/><a:ext cx="9144000" cy="960120"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:solidFill><a:srgbClr val="3E2115"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="3E2115"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        </p:spPr>
        <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-TW" altLang="en-US"><a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/></a:endParaRPr></a:p></p:txBody>
      </p:sp>

      <!-- 金色細條（左側 accent） -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="3" name="Shape 1"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="0" y="0"/><a:ext cx="109728" cy="960120"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:solidFill><a:srgbClr val="FFD700"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="FFD700"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        </p:spPr>
        <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-TW" altLang="en-US"><a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/></a:endParaRPr></a:p></p:txBody>
      </p:sp>

      <!-- 浮水印圖示 (僅在選擇「我要有浮水印」時插入於此，作為最底層，注意圖片的 relationship rId 對應) -->
      <!--
      <p:pic>
        <p:nvPicPr>
          <p:cNvPr id="11" name="Watermark Image"/>
          <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>
          <p:nvPr/>
        </p:nvPicPr>
        <p:blipFill>
          <a:blip r:embed="rId2"/>
          <a:stretch><a:fillRect/></a:stretch>
        </p:blipFill>
        <p:spPr>
          <a:xfrm>
            <a:off x="2857500" y="1280160"/>
            <a:ext cx="3429000" cy="3429000"/>
          </a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        </p:spPr>
      </p:pic>
      -->

      <!-- 標題文字 -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="Text 2"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="274320" y="0"/><a:ext cx="8595360" cy="960120"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:pPr marL="0" indent="0" algn="ctr"><a:buNone/></a:pPr>
            <a:r>
              <a:rPr lang="en-US" sz="3000" b="1" dirty="0">
                <a:solidFill><a:schemeClr val="bg1"/></a:solidFill>
                <a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:ea typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:cs typeface="Calibri" pitchFamily="34" charset="-120"/>
              </a:rPr>
              <a:t>{{主標題}}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- 法規標籤背景（深棕） -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Shape 3"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="365760" y="1100000"/><a:ext cx="8412480" cy="430000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:solidFill><a:srgbClr val="3E2115"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="3E2115"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        </p:spPr>
        <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-TW" altLang="en-US"><a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/></a:endParaRPr></a:p></p:txBody>
      </p:sp>

      <!-- 法規標籤文字（金黃） -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="Text 4"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="365760" y="1100000"/><a:ext cx="8412480" cy="430000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="91440" tIns="0" rIns="91440" bIns="0" rtlCol="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:pPr marL="0" indent="0" algn="ctr"><a:buNone/></a:pPr>
            <a:r>
              <a:rPr lang="en-US" sz="1800" b="1" dirty="0">
                <a:solidFill><a:srgbClr val="FFD700"/></a:solidFill>
                <a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:ea typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:cs typeface="Calibri" pitchFamily="34" charset="-120"/>
              </a:rPr>
              <a:t>{{法規標籤}}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- 金色分隔線 -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="7" name="Shape 5"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="365760" y="1580000"/><a:ext cx="8412480" cy="50292"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:solidFill><a:srgbClr val="FFD700"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="FFD700"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        </p:spPr>
        <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-TW" altLang="en-US"><a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/></a:endParaRPr></a:p></p:txBody>
      </p:sp>

      <!-- 條文內容（所有 bullet 放同一個文字框） -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="8" name="Text 6"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="365760" y="1670000"/><a:ext cx="8412480" cy="3050000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="91440" rIns="0" bIns="0" rtlCol="0" anchor="t"/>
          <a:lstStyle/>
          <!-- 每條重複以下 <a:p> 區塊，最後一條 spcAft 改為 0 -->
          <a:p>
            <a:pPr marL="342900" indent="-342900">
              <a:buNone/>
              <a:lnSpc><a:spcPts val="2100"/></a:lnSpc>
              <a:spcBef><a:spcPts val="0"/></a:spcBef>
              <a:spcAft><a:spcPts val="800"/></a:spcAft>
            </a:pPr>
            <a:r>
              <a:rPr lang="en-US" sz="1600" dirty="0">
                <a:solidFill><a:srgbClr val="3E2115"/></a:solidFill>
                <a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:ea typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:cs typeface="Calibri" pitchFamily="34" charset="-120"/>
              </a:rPr>
              <a:t>• {{條文一}}</a:t>
            </a:r>
          </a:p>
          <!-- 重複 <a:p> 加入更多條文 -->
        </p:txBody>
      </p:sp>

      <!-- 來源附註 -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="9" name="Text 7"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="365760" y="4780000"/><a:ext cx="8412480" cy="220000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:pPr marL="0" indent="0" algn="l"><a:buNone/></a:pPr>
            <a:r>
              <a:rPr lang="en-US" sz="1200" dirty="0">
                <a:solidFill><a:srgbClr val="A47551"/></a:solidFill>
                <a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:ea typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/>
                <a:cs typeface="Calibri" pitchFamily="34" charset="-120"/>
              </a:rPr>
              <a:t>{{來源附註}}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- 底部金色條 -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="10" name="Shape 8"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="0" y="5029200"/><a:ext cx="9144000" cy="114300"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:solidFill><a:srgbClr val="FFD700"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="FFD700"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        </p:spPr>
        <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-TW" altLang="en-US"><a:latin typeface="Microsoft JhengHei" panose="020B0604030504040204" pitchFamily="34" charset="-120"/></a:endParaRPr></a:p></p:txBody>
      </p:sp>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>
```

## 注意事項

- **標題長度**：30pt 字型在 8.5 吋寬的標題列中，約可容納 20 個中文字不換行；超過 20 字會自動換行並垂直置中，外觀仍正常
- **條文長度**：16pt 字型在 8.4 吋寬的內容框中，每行約容納 35 個中文字；3 條長條文總高度約 3000000 EMU，已有足夠空間
- **模板路徑不可刪除**：`問大師_指定受益人不受民法限制_20260510.pptx` 是所有新投影片的 PPTX 結構來源，確保其存在
- **unpack.py 相依套件**：需要 `defusedxml`（`pip3 install defusedxml`）
