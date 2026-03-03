# Vibe Coding Landing Page

這個專案是《Vibe Coding 工作術》的一頁式銷售網站，使用 `Next.js App Router + TypeScript + Tailwind CSS` 建置，採靜態匯出部署到 GitHub Pages，並預留 LINE 官方帳號、GAS Webhook、Google Sheet 的整合流程。

## 專案內容

- 前端銷售頁：單頁式 landing page，包含 Hero、成果展示、講師介紹、課程內容、價格、FAQ、CTA。
- 追蹤機制：支援 GA4 與 Meta Pixel。
- 靜態部署：透過 GitHub Actions 自動 build 並部署到 GitHub Pages。
- GAS 範本：提供 LINE Webhook 寫入 Google Sheet 的 Apps Script 範例。

## 需求環境

- Node.js `20+`
- npm `10+`

目前本機實測版本：

- Node.js `v22.22.0`
- npm `10.9.4`

## 安裝與啟動

在專案根目錄執行：

```bash
npm install
```

啟動本機開發站：

```bash
npm run dev
```

預設開發網址：

```text
http://localhost:3000
```

## 可用指令

```bash
npm run dev
```

啟動本機開發模式。

```bash
npm run lint
```

執行 ESLint 檢查。

```bash
npm run build
```

執行 Next.js production build，並依 `next.config.mjs` 產出靜態匯出內容到 `out/`。

```bash
npm run export
```

目前等同於 `npm run build`。

## 專案結構

```text
app/                  Next.js App Router 頁面與全域設定
components/           UI 元件與 landing page 各區塊
data/                 商業內容與 placeholder 單一來源
docx/                 PRD 與規格文件
gas/                  Google Apps Script Webhook 範例
lib/                  追蹤與共用邏輯
public/               靜態圖片與 SVG 資產
types/                TypeScript 型別定義
.github/workflows/    GitHub Actions 部署流程
```

## 內容修改方式

頁面文案、價格、日期、FAQ、見證、LINE 連結集中在：

- [data/landing-content.ts](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/data/landing-content.ts)

目前以下欄位仍是 placeholder，正式上線前請直接搜尋後替換：

- `{{COURSE_DATE}}`
- `{{COURSE_TIME}}`
- `{{COURSE_VENUE}}`
- `{{PRICE_STANDARD}}`
- `{{PRICE_EARLY_BIRD}}`
- `{{EARLY_BIRD_DEADLINE}}`
- `{{SEATS_LEFT}}`
- `{{CONTACT_EMAIL}}`

## 環境變數

這個專案使用公開環境變數注入前端追蹤與外部連結：

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LINE_OA_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

本機可用以下方式啟動：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
NEXT_PUBLIC_LINE_OA_URL=https://lin.ee/xxxxxxx \
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
NEXT_PUBLIC_META_PIXEL_ID=1234567890 \
npm run dev
```

若未設定：

- LINE 連結會退回 `https://lin.ee/xxxxxxx`
- GA4 / Meta Pixel 不會報錯，但也不會送出追蹤事件

## GitHub Pages 部署

部署 workflow 檔案位於：

- [.github/workflows/deploy-pages.yml](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/.github/workflows/deploy-pages.yml)

流程如下：

1. `pull_request` 到 `main` 時執行 `npm ci`、`npm run lint`、`npm run build`
2. `push` 到 `main` 時，除驗證外還會上傳 `out/` 並部署到 GitHub Pages
3. Pages Source 需設定為 `GitHub Actions`

建議在 GitHub repository 的 `Settings > Secrets and variables > Actions` 設定：

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LINE_OA_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

## 靜態匯出設定

專案在 [next.config.mjs](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/next.config.mjs) 內設定：

- `output: 'export'`
- `images.unoptimized = true`
- `basePath` / `assetPrefix` 於 production 使用 `/vibecoding-landing-page`

如果 GitHub repo 名稱改變，請同步修改：

- [next.config.mjs](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/next.config.mjs)

## GAS Webhook 使用方式

GAS 範例位於：

- [gas/webhook.gs](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/gas/webhook.gs)
- [gas/appsscript.json](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/gas/appsscript.json)
- [gas/README.md](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/gas/README.md)

這份範例會：

- 接收 LINE Webhook 文字訊息
- 驗證五碼後寫入 `registrations`
- 發生錯誤時寫入 `error_logs`
- 回覆使用者確認訊息

注意：

- 目前 GAS 版本採 `?token=` 共享 token 驗證
- 因 Apps Script Web App 無法直接讀 request headers，所以這份程式沒有實作真正的 `X-Line-Signature` 驗證
- 若需要正式簽章驗證，建議改放到 Cloud Run、Workers 或其他可存取 headers 的執行環境

## 驗證方式

本機修改後建議至少執行：

```bash
npm run lint
npm run build
```

目前這兩個指令已可通過。

## 參考文件

- [docx/PRD-go.md](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/docx/PRD-go.md)
- [gas/README.md](/Users/hsuhsiang/Desktop/project/vibecoding-landing-page/gas/README.md)
