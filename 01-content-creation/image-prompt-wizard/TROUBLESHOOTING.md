# 踩坑紀錄與疑難排解指南 (Troubleshooting) - image-prompt-wizard

本文檔記錄了 `image-prompt-wizard` 在為 Midjourney, DALL-E 3, SD, FLUX 等生成提示詞時的常見地雷與避坑解法。

---

## 🧭 常見問題索引與排查手冊

### ⚠️ 陷阱 1：中文直譯為英文 Prompt 效果不佳
* **問題現象**：中文詩意詞彙（如「空靈仙境」、「意境深遠」）直接翻譯成英文後，繪圖模型無法理解具體視覺元素。
* **避坑解法**：轉換為具體物理光影與構圖詞，例如 `ethereal atmosphere, mist drifting across mountain peaks, soft morning sunlight ray, volumetric lighting`。

### ⚠️ 陷阱 2：缺少畫面長寬比 (Aspect Ratio)
* **問題現象**：Midjourney 預設產出 1:1 正方形圖片，若用於簡報或 FB 貼文橫幅會被強行裁切。
* **避坑解法**：在提示詞尾端自動標註平台參數，例如 `--ar 16:9` (簡報/電腦版) 或 `--ar 4:5` (Instagram/手機直式)。

### ⚠️ 陷阱 3：文字渲染變形與亂碼
* **問題現象**：在提示詞中要求在圖片內生成中文字，繪圖模型常畫出錯字或偽文字火星文。
* **避坑解法**：提示詞要求留出負空間（`negative space for text overlay`），文字統一於後製（Canva / PPT）中加上。

---

*最後更新時間：2026-09-17*
