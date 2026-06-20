#!/usr/bin/env node
"use strict";
/**
 * 新聞排版 PPTX 生成腳本
 * 用法：node build.js /path/to/config.json
 *
 * config.json 必填欄位：
 *   publication, date, reporter,
 *   headline_line1, subhead_line1,
 *   col1, col2, facts_title, facts[]
 * 選填：headline_line2, subhead_line2, legal_note, output
 */

const pptxgen = require("pptxgenjs");
const path    = require("path");
const fs      = require("fs");

// ─── Load config ─────────────────────────────────────────────────────────────
const configPath = process.argv[2];
if (!configPath) {
  console.error("Usage: node build.js /path/to/config.json");
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));

const publication   = cfg.publication   || "自由時報";
const date          = cfg.date          || "";
const reporter      = cfg.reporter      || "";
const headLine1     = cfg.headline_line1 || "";
const headLine2     = cfg.headline_line2 || "";
const subLine1      = cfg.subhead_line1  || "";
const subLine2      = cfg.subhead_line2  || "";
const col1Text      = cfg.col1           || "";
const col2Text      = cfg.col2           || "";
const factsTitle    = cfg.facts_title    || "關鍵資訊";
const factsData     = cfg.facts          || [];   // [["標籤","值"], …]
const legalNote     = cfg.legal_note     || "";
const imagePath     = cfg.image          || "";
const outputFile    = path.resolve(process.cwd(), cfg.output || "newspaper_output.pptx");

// ─── Constants ────────────────────────────────────────────────────────────────
const FONT   = "微軟正黑體";
const RED    = "CC0000";
const BLACK  = "111111";
const GRAY   = "555555";
const LGRAY  = "EFEFEF";
const BGRAY  = "F9F9F9";
const WHITE  = "FFFFFF";

// ─── Helper: Format Paragraphs with full-width double space indentation ────────
function formatParagraphs(text) {
  if (!text) return "";
  return text
    .split(/\r?\n/)
    .filter(p => p.trim() !== "")
    .map(p => {
      let trimmed = p.trim();
      if (!trimmed.startsWith("　") && !trimmed.startsWith("  ")) {
        return "　　" + trimmed;
      }
      return trimmed;
    })
    .join("\n");
}

// ─── Build slide ──────────────────────────────────────────────────────────────
const pres  = new pptxgen();
pres.layout = "LAYOUT_16x9";

const slide = pres.addSlide();
slide.background = { color: WHITE };

// Margins and usable width
const ML     = 0.20;  // left margin
const FULL_W = 9.60;  // usable width

// ── 1. Header ─────────────────────────────────────────────────────────────────
slide.addText(publication, {
  x: ML, y: 0.07, w: 2.0, h: 0.28,
  fontSize: 16, fontFace: FONT, bold: true,
  color: RED, align: "left", valign: "middle", margin: 0,
});
slide.addText(date, {
  x: 7.0, y: 0.07, w: 2.8, h: 0.28,
  fontSize: 10, fontFace: FONT,
  color: GRAY, align: "right", valign: "middle", margin: 0,
});
slide.addShape(pres.shapes.LINE, {
  x: ML, y: 0.38, w: FULL_W, h: 0,
  line: { color: BLACK, width: 2 },
});

// ── 2. Main headline (34pt, Bold) ─────────────────────────────────────────────
const headlineArr = headLine2
  ? [{ text: headLine1, options: { breakLine: true } }, { text: headLine2 }]
  : [{ text: headLine1 }];

slide.addText(headlineArr, {
  x: ML, y: 0.44, w: FULL_W, h: headLine2 ? 1.15 : 0.65,
  fontSize: 34, fontFace: FONT, bold: true,
  color: BLACK, align: "left", valign: "top", margin: 0,
});

const subY = headLine2 ? 1.63 : 1.14;

// ── 3. Sub-headline (14pt, Bold) ──────────────────────────────────────────────
const subArr = subLine2
  ? [{ text: subLine1, options: { breakLine: true } }, { text: subLine2 }]
  : [{ text: subLine1 }];

slide.addText(subArr, {
  x: ML, y: subY, w: FULL_W, h: subLine2 ? 0.65 : 0.38,
  fontSize: 14, fontFace: FONT, bold: true,
  color: "333333", align: "left", valign: "top", margin: 0,
});

const ruleY = subLine2 ? subY + 0.70 : subY + 0.42;

// Thin black divider line below subhead
slide.addShape(pres.shapes.LINE, {
  x: ML, y: ruleY, w: FULL_W, h: 0,
  line: { color: BLACK, width: 0.75 },
});

// ── 4. Dimensions and Layout parameters ───────────────────────────────────────
const BODY_Y = ruleY + 0.10;
const BODY_H = 5.38 - BODY_Y; // leave room for bottom line at 5.48

const COL_W  = 2.80;
const COL_GAP= 0.15;
const BOX_X  = ML + COL_W + COL_GAP + COL_W + COL_GAP; // 6.10"
const BOX_W  = 3.70; // 0.20 + 2.80 + 0.15 + 2.80 + 0.15 + 3.70 = 9.80 (leaves 0.20 right margin)

// ── 4. Body Columns ───────────────────────────────────────────────────────────
// Column 1 Red accent bar on the very left
slide.addShape(pres.shapes.RECTANGLE, {
  x: ML, y: BODY_Y, w: 0.05, h: BODY_H,
  fill: { color: RED }, line: { color: RED, width: 0 },
});

// Column 1 Text (with Reporter line prepended inside the same text block)
const col1Runs = [];
if (reporter) {
  col1Runs.push({
    text: reporter + "\n",
    options: { bold: true, fontSize: 10 }
  });
}
col1Runs.push({
  text: formatParagraphs(col1Text),
  options: { bold: false, fontSize: 10 }
});

slide.addText(col1Runs, {
  x: ML + 0.08, y: BODY_Y, w: COL_W - 0.08, h: BODY_H,
  fontFace: FONT, color: BLACK, align: "left", valign: "top",
  margin: [0, 2, 0, 2], paraSpaceAfter: 6,
});

// Column 2 Text (No vertical divider line to match modern clean layout)
slide.addText(formatParagraphs(col2Text), {
  x: ML + COL_W + COL_GAP, y: BODY_Y, w: COL_W, h: BODY_H,
  fontSize: 10, fontFace: FONT, color: BLACK, align: "left", valign: "top",
  margin: [0, 2, 0, 2], paraSpaceAfter: 6,
});

// ── 5. Right-side area: Image or Facts Table ──────────────────────────────────
if (imagePath && fs.existsSync(imagePath)) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: BOX_X, y: BODY_Y, w: BOX_W, h: BODY_H,
    fill: { color: "FAFAFA" }, line: { color: "CCCCCC", width: 0.5 },
  });
  slide.addImage({ path: imagePath, x: BOX_X + 0.05, y: BODY_Y + 0.05, w: BOX_W - 0.10, h: BODY_H - 0.10 });
} else {
  // Construct Facts Table Rows
  const tableRows = [];
  
  // Row 1: Title (Blue Header)
  tableRows.push([
    {
      text: factsTitle,
      options: {
        colspan: 2,
        fill: { color: "548CA8" },
        color: WHITE,
        fontFace: FONT,
        fontSize: 11,
        bold: true,
        align: "center",
        valign: "middle",
      }
    }
  ]);
  
  // Row 2: Sub-headers (項目, 內容)
  tableRows.push([
    {
      text: "項目",
      options: {
        fill: { color: WHITE },
        color: "333333",
        fontFace: FONT,
        fontSize: 9.5,
        bold: true,
        align: "left",
        valign: "middle",
      }
    },
    {
      text: "內容",
      options: {
        fill: { color: WHITE },
        color: "333333",
        fontFace: FONT,
        fontSize: 9.5,
        bold: true,
        align: "left",
        valign: "middle",
      }
    }
  ]);
  
  // Row 3+: Data Rows (Alternating background)
  const maxRows = Math.min(factsData.length, 7);
  for (let i = 0; i < maxRows; i++) {
    const [label, value] = factsData[i];
    const rowBg = (i % 2 === 1) ? "F2F6F8" : "FFFFFF";
    tableRows.push([
      {
        text: label,
        options: {
          fill: { color: rowBg },
          color: "333333",
          fontFace: FONT,
          fontSize: 9,
          bold: true,
          align: "left",
          valign: "top",
        }
      },
      {
        text: value,
        options: {
          fill: { color: rowBg },
          color: "333333",
          fontFace: FONT,
          fontSize: 9,
          align: "left",
          valign: "top",
        }
      }
    ]);
  }
  
  // Optional Legal Note Row
  if (legalNote) {
    tableRows.push([
      {
        text: legalNote,
        options: {
          colspan: 2,
          fill: { color: "FFEAEA" },
          color: RED,
          fontFace: FONT,
          fontSize: 9,
          bold: true,
          align: "center",
          valign: "middle",
        }
      }
    ]);
  }
  
  // Footer Row: Source and Maker
  const makerName = reporter.replace(/^記者/, "").split(/[／/]/)[0].trim();
  const makerText = makerName ? `${makerName}／製表` : "製表";
  tableRows.push([
    {
      text: "資料來源：採訪整理",
      options: {
        fill: { color: "F2F2F2" },
        color: "666666",
        fontFace: FONT,
        fontSize: 8,
        align: "left",
        valign: "middle",
      }
    },
    {
      text: makerText,
      options: {
        fill: { color: "F2F2F2" },
        color: "666666",
        fontFace: FONT,
        fontSize: 8,
        align: "right",
        valign: "middle",
      }
    }
  ]);
  
  slide.addTable(tableRows, {
    x: BOX_X,
    y: BODY_Y,
    w: BOX_W,
    colWidths: [0.95, 2.75],
    border: { type: "line", color: "CCCCCC", width: 0.5 },
  });
}

// ── 6. Bottom rule ────────────────────────────────────────────────────────────
slide.addShape(pres.shapes.LINE, {
  x: ML, y: 5.48, w: FULL_W, h: 0,
  line: { color: BLACK, width: 1.0 },
});

// ─── Write file ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: outputFile })
  .then(() => console.log("✅ 輸出：" + outputFile))
  .catch((err) => { console.error("❌ 錯誤：", err); process.exit(1); });
