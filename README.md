# Vibe Coding Landing Page

這是一個給課程／服務型產品使用的一頁式銷售網站範本，技術組合是 `Next.js App Router + TypeScript + Tailwind CSS`，網站可靜態部署到 GitHub Pages，報名流程可串接 `LINE 官方帳號 + Google Apps Script（GAS）+ Google Sheet`。

如果你是程式小白，這份 README 不是只告訴你「指令怎麼下」，而是會先告訴你：

- 前端在做什麼
- 後端在做什麼
- LINE 官方帳號要怎麼設定
- Google Sheet / GAS 在整個流程裡扮演什麼角色
- 你應該先做哪一步、再做哪一步

你可以把這個專案理解成一個「從零到一把招生頁做出來」的骨架。

---

## 1. 先看懂整體：這個專案到底在做什麼？

### 1.1 你最後會得到什麼

完成後，你會有：

- 一個可公開瀏覽的招生／銷售頁網站
- 一個可導流到 LINE 官方帳號的 CTA 按鈕
- 一個可接收 LINE 訊息的 Webhook
- 一份自動寫入 Google Sheet 的報名紀錄表

### 1.2 這個專案的架構

```text
使用者打開網站
  -> 點擊「加入 LINE / 立即報名」
  -> 進入 LINE 官方帳號
  -> 使用者傳送訊息（例如：我已完成匯款）
  -> LINE Webhook 呼叫 GAS
  -> GAS 把資料寫進 Google Sheet
  -> 你在 Google Sheet 查看報名資料
```

### 1.3 前端、後端、資料庫，各自是什麼？

如果你是初學者，先把這三個詞分清楚：

- 前端：使用者看得到的畫面，也就是這個 landing page 網站
- 後端：接收資料、處理邏輯、回傳結果的地方；這個專案裡目前用 `GAS Webhook` 取代傳統後端伺服器
- 資料庫：存資料的地方；這個專案先用 `Google Sheet` 當成簡易資料庫

也就是說，這個專案不是「網站 + 複雜後端主機」，而是：

```text
靜態網站（前端）+ LINE 官方帳號 + GAS（輕量後端）+ Google Sheet（資料表）
```

這個組合很適合初學者，因為：

- 前端好上手，可以先看到成果
- 不用一開始就學資料庫主機、雲端伺服器
- 可以先把報名流程跑通，再慢慢升級

---

## 2. 建議你照這個順序做

請不要一開始就想把全部做完。最好的方式是分成 4 個階段：

### 階段 A：先把網站跑起來

目標：先看到畫面，知道你改哪裡會發生什麼事。

### 階段 B：把文案、價格、日期、按鈕換成你的內容

目標：先做出一個「看起來像你的產品」的頁面。

### 階段 C：串接 LINE 官方帳號

目標：讓網站按鈕真的可以把人導到你的 LINE。

### 階段 D：串接 GAS 與 Google Sheet

目標：讓 LINE 來的資料真的可以被記錄下來。

你可以先做到階段 B 就上線；如果你想做完整報名流程，再做 C 與 D。

---

## 3. 你需要準備什麼

### 3.1 帳號

- GitHub 帳號
- Google 帳號
- LINE 個人帳號
- LINE 官方帳號

### 3.2 電腦環境

- Node.js `20+`
- npm `10+`

目前這個專案本機曾使用以下版本：

- Node.js `v22.22.0`
- npm `10.9.4`

### 3.3 你至少要知道的 3 件事

- 你現在改的是「網站原始碼」，不是 Word 文件
- 每次修改後，要回到瀏覽器重新看結果
- 很多設定不是改在網站裡，而是改在 GitHub、LINE、Google Apps Script 後台

---

## 4. 第一步：先把網站跑起來

在專案根目錄執行：

```bash
npm install
```

啟動本機開發站：

```bash
npm run dev
```

打開：

```text
http://localhost:3000
```

如果成功，你會先看到一個可瀏覽的一頁式 landing page。

### 4.1 常用指令

```bash
npm run dev
```

啟動本機開發模式。

```bash
npm run lint
```

檢查程式碼格式與規則。

```bash
npm run build
```

執行正式建置，並輸出靜態網站到 `out/`。

```bash
npm run export
```

目前等同於 `npm run build`。

---

## 5. 第二步：先改成你的內容

如果你完全不懂程式，先只改內容，不要先碰元件邏輯。

### 5.1 最重要的內容檔案

大部分文案都集中在：

- `data/landing-content.ts`

你可以把它理解成「整頁文案總表」。

### 5.2 這個檔案裡有哪些東西？

- `hero`：頁面最上方主視覺區
- `outcomes`：你能交付什麼成果
- `painPoints`：目標客戶痛點
- `instructor`：講師介紹
- `curriculum`：課程大綱
- `schedule`：日期、時間、地點
- `pricing`：價格方案
- `signupFlow`：報名流程
- `faq`：常見問題
- `finalCta`：頁面最下方 CTA
- `footer`：聯絡方式與隱私說明

### 5.3 你應該先改哪些 placeholder？

請直接搜尋以下字串並替換成正式內容：

- `{{COURSE_DATE}}`
- `{{COURSE_TIME}}`
- `{{COURSE_VENUE}}`
- `{{PRICE_STANDARD}}`
- `{{PRICE_EARLY_BIRD}}`
- `{{EARLY_BIRD_DEADLINE}}`
- `{{SEATS_LEFT}}`
- `{{CONTACT_EMAIL}}`

### 5.4 如果你想換圖片

靜態圖片放在：

- `public/`

目前講師圖與示意圖在：

- `public/instructor-placeholder.svg`
- `public/hero-dashboard.svg`

你可以直接換檔案，或改 `data/landing-content.ts` 裡對應的圖片路徑。

---

## 6. 第三步：先理解這個專案裡「前端」和「後端」分別在哪裡

### 6.1 前端在哪裡？

前端主要在這幾個資料夾：

- `app/`：Next.js 頁面進入點與全域設定
- `components/`：每個畫面區塊的元件
- `data/`：頁面文案與資料來源
- `public/`：圖片、SVG 等靜態資產

### 6.2 後端在哪裡？

這個專案沒有傳統的 Node.js 後端 API，而是把「接收 LINE Webhook、寫入 Google Sheet」的工作交給：

- `gas/webhook.gs`

這支 Apps Script 就是目前的「輕量後端」。

### 6.3 為什麼這樣做？

因為你現在的需求不是做一個大型會員系統，而是先完成：

- 網站可以展示
- 使用者可以進 LINE
- 使用者資料可以被紀錄

對初學者來說，這樣最容易先做出成果。

---

## 7. 第四步：設定環境變數

這個專案透過公開環境變數控制網站網址、LINE 連結、GA4、Meta Pixel。

會用到的變數有：

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LINE_OA_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

### 7.1 本機開發最簡單做法

你可以在啟動前直接帶入：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
NEXT_PUBLIC_LINE_OA_URL=https://lin.ee/xxxxxxx \
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
NEXT_PUBLIC_META_PIXEL_ID=1234567890 \
npm run dev
```

### 7.2 如果你是初學者，我更建議你建立 `.env.local`

內容可以像這樣：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_LINE_OA_URL=https://lin.ee/你的LINE連結
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

之後只要執行：

```bash
npm run dev
```

### 7.3 這些值沒填會怎樣？

- 沒填 `NEXT_PUBLIC_LINE_OA_URL`：按鈕會退回預設 placeholder
- 沒填 GA4 / Meta Pixel：頁面仍可運作，但不會送追蹤事件

---

## 8. 第五步：從零開始設定 LINE 官方帳號

這一段是很多人最卡的地方。你可以把它拆成兩件事：

- 先有一個 LINE 官方帳號
- 再讓這個官方帳號具備 Messaging API / Webhook 能力

### 8.1 你需要知道的名詞

- LINE 官方帳號：使用者加入好友、接收訊息的帳號
- Messaging API channel：讓你的程式可以跟 LINE 平台串接的設定入口
- Webhook：當使用者傳訊息時，LINE 會把事件送到你指定的網址
- Channel Access Token：你的程式呼叫 LINE API 時要用的憑證

### 8.2 建立 LINE 官方帳號

建議流程：

1. 先登入 LINE Official Account Manager
2. 建立一個新的官方帳號
3. 完成基本資料，例如名稱、頭像、簡介

建立完成後，你就會有一個可以被加入好友的 LINE 官方帳號。

### 8.3 啟用 Messaging API

建立官方帳號後，請到 LINE Developers Console，替這個官方帳號建立或啟用對應的 Messaging API channel。

你之後會用到的資料通常包括：

- `Channel ID`
- `Channel secret`
- `Channel access token`

這個專案的 GAS 範例目前實際會用到的是：

- `LINE_CHANNEL_ACCESS_TOKEN`

也就是說，你至少要先拿到可以讓 GAS 呼叫回覆訊息 API 的 access token。

### 8.4 先不要急著填 Webhook URL

很多新手會一開始就在 LINE 後台找 Webhook URL，但其實正確順序是：

1. 先建立 LINE 官方帳號
2. 先建立 GAS Web App
3. 取得 GAS 部署網址
4. 再把那個網址貼回 LINE Webhook URL

因為 Webhook URL 本質上就是「LINE 要把事件送到哪裡」，你得先有那個網址。

### 8.5 把加好友連結放到網站上

你的網站 CTA 實際上是透過：

- `NEXT_PUBLIC_LINE_OA_URL`

來決定要導去哪裡。

如果你目前只想完成最基本版本，你可以先只做這一步：

1. 取得你的 LINE 官方帳號加好友連結
2. 填進 `NEXT_PUBLIC_LINE_OA_URL`
3. 網站按鈕就能先把人導到 LINE

也就是說，即使你還沒做 Webhook，網站也可以先上線。

### 8.6 建議你在 LINE 官方帳號後台檢查的項目

如果你要做自動化串接，建議檢查：

- Webhook 是否啟用
- 歡迎訊息是否符合你的招生流程
- 自動回應功能是否會跟 Webhook 邏輯互相干擾
- 圖文選單是否需要先關閉或簡化

如果你現在只是做 MVP，先把「可加入好友」與「可收訊息」搞定就夠了。

---

## 9. 第六步：從零開始設定 Google Sheet 與 GAS

這個步驟是在做「後端」。

### 9.1 先建立 Google Sheet

建立一份新的 Google Sheet，建議至少有兩個工作表：

- `registrations`
- `error_logs`

你也可以先加上表頭，方便之後閱讀，例如 `registrations` 可放：

```text
id | timestamp | userId | displayName | last5 | amount | status | source | courseDate | remark
```

### 9.2 建立 Apps Script 專案

做法：

1. 打開 Google Apps Script
2. 建立新的 Apps Script 專案
3. 把 `gas/webhook.gs` 內容貼進去
4. 把 `gas/appsscript.json` 內容同步設定好

相關檔案在：

- `gas/webhook.gs`
- `gas/appsscript.json`
- `gas/README.md`

### 9.3 這支 GAS 在做什麼？

目前邏輯很單純：

- 接收 LINE 傳來的 webhook 事件
- 檢查網址上的共享 token
- 如果使用者傳了 `我已完成匯款`，就回覆「請輸入匯款帳號後五碼」
- 如果使用者真的輸入 5 碼數字，就把資料寫進 `registrations`
- 如果發生錯誤，就寫進 `error_logs`

### 9.4 你需要設定的 Script Properties

請到 Apps Script 的 `Project Settings > Script Properties`，設定以下值：

- `SPREADSHEET_ID`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `WEBHOOK_SHARED_TOKEN`
- `REGISTRATION_SHEET_NAME`
- `ERROR_LOG_SHEET_NAME`
- `COURSE_AMOUNT`
- `COURSE_DATE`
- `REGISTRATION_SOURCE`

### 9.5 每個值是什麼意思？

| 變數 | 用途 |
| --- | --- |
| `SPREADSHEET_ID` | 你的 Google Sheet ID |
| `LINE_CHANNEL_ACCESS_TOKEN` | 讓 GAS 可以回覆 LINE 使用者訊息 |
| `WEBHOOK_SHARED_TOKEN` | 這個範例用來驗證 Webhook URL 的共享 token |
| `REGISTRATION_SHEET_NAME` | 報名工作表名稱，預設 `registrations` |
| `ERROR_LOG_SHEET_NAME` | 錯誤紀錄工作表名稱，預設 `error_logs` |
| `COURSE_AMOUNT` | 匯款金額 |
| `COURSE_DATE` | 課程日期 |
| `REGISTRATION_SOURCE` | 報名來源，例如 `landing` |

### 9.6 部署 GAS Web App

在 Apps Script 中：

1. 點 `Deploy`
2. 點 `New deployment`
3. 類型選 `Web app`
4. `Execute as` 選 `Me`
5. `Who has access` 選 `Anyone`

完成後，你會拿到一個 Web App URL。

### 9.7 這個專案的 GAS 驗證方式

這份範例不是用 `X-Line-Signature` 驗證，而是用：

```text
?token=你的共享token
```

也就是說，你最後填到 LINE 的 Webhook URL 會長得像：

```text
https://script.google.com/macros/s/你的部署ID/exec?token=你的共享token
```

### 9.8 為什麼不用 X-Line-Signature？

因為 Apps Script Web App 的 `doPost(e)` 拿不到原始 request headers，所以這份範例先用共享 token 做最小可用驗證。

如果你未來要做正式商業環境、重視安全性，建議把 Webhook 搬到：

- Cloudflare Workers
- Google Cloud Run
- 其他可讀取 request headers 的後端環境

---

## 10. 第七步：把 LINE Webhook 連到 GAS

當你已經有 GAS Web App URL，就可以回到 LINE 後台設定 Webhook。

### 10.1 設定流程

1. 打開 LINE Developers Console
2. 找到你的 Messaging API channel
3. 進入 Messaging API 相關設定頁
4. 把 GAS Web App URL 貼到 Webhook URL
5. 按 Verify
6. 成功後啟用 Webhook

### 10.2 驗證成功後你可以怎麼測

1. 把你的 LINE 官方帳號加入好友
2. 傳送 `我已完成匯款`
3. 看是否收到回覆：`請輸入匯款帳號後五碼`
4. 再傳 `12345`
5. 回到 Google Sheet，看 `registrations` 是否新增一筆資料

### 10.3 如果沒成功，先檢查這 5 件事

- `LINE_CHANNEL_ACCESS_TOKEN` 是否填對
- `WEBHOOK_SHARED_TOKEN` 是否與 URL 上的 token 一致
- `SPREADSHEET_ID` 是否正確
- `registrations` / `error_logs` 工作表名稱是否正確
- LINE Webhook 是否真的已啟用

---

## 11. 第八步：把網站 CTA 串到你的 LINE

這個網站上的 CTA 最終會導到：

- `NEXT_PUBLIC_LINE_OA_URL`

你只要把它換成你的 LINE 官方帳號連結，按鈕就會生效。

### 11.1 最小可行版本（推薦新手先做）

如果你現在還不想做 Webhook，只想先讓網站可以導流：

1. 先建立 LINE 官方帳號
2. 拿到加好友連結
3. 設定 `NEXT_PUBLIC_LINE_OA_URL`
4. 重新啟動 `npm run dev`

這樣就已經可以先上線收名單，只是後續要人工在 LINE 裡面處理。

### 11.2 完整版本

如果你想讓流程更完整：

1. 網站導流到 LINE
2. LINE 把訊息事件送到 GAS
3. GAS 寫到 Google Sheet
4. 你在 Sheet 對帳、追蹤、管理名單

這就是這個專案目前設計好的完整路線。

---

## 12. 第九步：部署到 GitHub Pages

這個專案已經內建 GitHub Actions workflow，可以自動部署到 GitHub Pages。

部署檔案在：

- `.github/workflows/deploy-pages.yml`

### 12.1 部署前你要知道一件事

`next.config.mjs` 裡有這段：

- `output: 'export'`
- production 時會使用 repo 名稱當作 `basePath`

目前 repo 名稱寫死為：

- `vibecoding-landing-page`

如果你的 GitHub repository 名稱不是這個，請同步修改：

- `next.config.mjs`

### 12.2 GitHub Pages 設定流程

1. 把專案推到 GitHub repository
2. 到 GitHub `Settings > Pages`
3. 確認部署來源使用 `GitHub Actions`

### 12.3 建議設定 GitHub Actions Variables

到：

- `Settings > Secrets and variables > Actions`

設定：

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LINE_OA_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

### 12.4 GitHub Actions 目前會做什麼

- `pull_request` 到 `main`：會先跑 `npm ci`、`npm run lint`、`npm run build`
- `push` 到 `main`：除了 build，還會把 `out/` 部署到 GitHub Pages

---

## 13. 第十步：GA4 / Meta Pixel 要不要現在就做？

答案是：可以晚一點。

如果你是初學者，建議優先順序是：

1. 先把網站跑起來
2. 先把內容改好
3. 先把 LINE 串好
4. 再補 GA4 / Meta Pixel

因為沒有追蹤碼不會讓網站壞掉，但沒有 CTA、沒有 LINE、沒有報名流程，網站就沒有實際商業用途。

---

## 14. 專案結構速讀版

```text
app/                  Next.js App Router 頁面與全域設定
components/           UI 元件與 landing page 各區塊
data/                 頁面文案與商業內容
docx/                 PRD 與規格文件
gas/                  Google Apps Script Webhook 範例
lib/                  追蹤與共用邏輯
public/               靜態圖片與 SVG 資產
types/                TypeScript 型別定義
.github/workflows/    GitHub Actions 自動部署流程
```

---

## 15. 你最常會改哪些檔案？

### 15.1 改文案

- `data/landing-content.ts`

### 15.2 改版面區塊

- `components/landing/hero.tsx`
- `components/landing/pricing.tsx`
- `components/landing/faq.tsx`
- 其他 `components/landing/*`

### 15.3 改全站樣式

- `app/globals.css`

### 15.4 改 SEO、GA、Meta Pixel

- `app/layout.tsx`
- `lib/analytics.ts`

### 15.5 改 Webhook 後端

- `gas/webhook.gs`

---

## 16. 驗證方式

每次修改後，至少建議做這兩件事：

```bash
npm run lint
npm run build
```

如果你有做 LINE + GAS 串接，請再補做這個人工測試：

1. 網站 CTA 是否能正確打開 LINE
2. LINE 傳 `我已完成匯款` 是否有收到回覆
3. LINE 傳 5 碼數字後，Google Sheet 是否新增資料

---

## 17. 常見卡關點

### 問題 1：我只想做網站，不想先碰後端，可以嗎？

可以。你只要先完成：

- `npm install`
- `npm run dev`
- 修改 `data/landing-content.ts`
- 設定 `NEXT_PUBLIC_LINE_OA_URL`

這樣就能先做出可用的招生頁。

### 問題 2：我一定要懂 React / Next.js 嗎？

不用一開始就全部懂。你只要先知道：

- `data/landing-content.ts` 是文案資料
- `components/landing/` 是畫面區塊
- 改內容先從資料檔開始，不要先改元件邏輯

### 問題 3：GAS 算不算後端？

算。雖然它不是傳統伺服器，但它確實有在：

- 接收 Webhook
- 處理資料
- 寫入資料表
- 回覆訊息

所以它就是這個專案目前的後端。

### 問題 4：Google Sheet 可以當正式資料庫嗎？

小量、手動營運、驗證流程階段可以。

如果未來你有這些需求，就要考慮升級：

- 資料量變大
- 權限管理變複雜
- 自動化流程更多
- 要做真正的簽章驗證與錯誤監控

---

## 18. 建議你的學習順序

如果你是完全新手，我建議這樣學：

1. 先把網站跑起來
2. 先學會改文案與圖片
3. 先理解 `data/landing-content.ts` 與 `components/landing/` 的關係
4. 再理解環境變數是什麼
5. 再設定 LINE 官方帳號
6. 再設定 GAS / Google Sheet
7. 最後才處理 GA4、Meta Pixel、SEO 細節

這樣你比較不會在一開始就被太多平台設定淹沒。

---

## 19. 官方參考文件

以下是這次 README 對應的官方文件，之後如果 LINE 後台畫面有變，你可以以官方文件為準：

- LINE Developers Messaging API 文件：https://developers.line.biz/en/docs/messaging-api/overview/
- LINE Developers Webhooks 文件：https://developers.line.biz/en/docs/messaging-api/receiving-messages/
- LINE Developers Channel access token 文件：https://developers.line.biz/en/docs/messaging-api/channel-access-tokens/
- LINE Official Account Manager 說明中心：https://help2.line.me/official_account/

專案內部補充文件：

- `gas/README.md`
- `docx/PRD-go.md`

---

## 20. 一句話總結

如果你現在還很亂，只要先記住這句話：

```text
先把網站跑起來，再改成你的內容，再把按鈕導到 LINE，最後才串 Webhook 和 Google Sheet。
```

照這個順序做，你比較不會卡住。
