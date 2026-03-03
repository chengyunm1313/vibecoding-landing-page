# 🚀 PRD-go｜Vibe Coding 實戰課程 — 完整產品需求文件

> **文件版本**：v1.0
> **最後更新**：2026-03-04
> **負責人**：享哥（徐享）
> **文件定位**：統合行銷策略、系統架構、技術規格的完整可執行 PRD

---

## 目錄

1. [產品概要](#1-產品概要)
2. [目標受眾與轉換策略](#2-目標受眾與轉換策略)
3. [系統架構總覽](#3-系統架構總覽)
4. [前端系統 — 一頁式銷售頁](#4-前端系統--一頁式銷售頁)
5. [LINE 官方帳號系統](#5-line-官方帳號系統)
6. [GAS 後端系統](#6-gas-後端系統)
7. [Google Sheet 資料庫](#7-google-sheet-資料庫)
8. [對帳與通知機制](#8-對帳與通知機制)
9. [錯誤處理機制](#9-錯誤處理機制)
10. [安全性設計](#10-安全性設計)
11. [效能與非功能需求](#11-效能與非功能需求)
12. [追蹤與數據優化](#12-追蹤與數據優化)
13. [技術堆疊](#13-技術堆疊)
14. [部署步驟](#14-部署步驟)
15. [驗收標準](#15-驗收標準)
16. [專案里程碑](#16-專案里程碑)
17. [後續擴充方向](#17-後續擴充方向)
18. [風險與回滾策略](#18-風險與回滾策略)

---

## 1. 產品概要

### 1.1 產品名稱

**《Vibe Coding 工作術》實戰課程銷售與報名系統**

### 1.2 產品定位

用 AI 幫助零程式基礎的學員，跟享哥一起在 3 小時內做出可上線的銷售頁。

### 1.3 商業目標

1. 建立可自動化收款報名流程
2. 降低人工客服成本
3. 所有報名資料自動儲存於 Google Sheet
4. 建立可複製的課程銷售系統
5. 建立名單（Email / LINE）
6. 建立信任與專業形象（享哥講師）

### 1.4 範圍

**包含（In Scope）**：

- 一頁式銷售頁設計與內容
- LINE 官方帳號報名流程
- GAS 後端 Webhook 處理
- Google Sheet 資料庫
- 人工對帳流程
- GA4 / Meta Pixel 追蹤設定

**不包含（Out of Scope）**：

- 第三方金流串接（TapPay / 綠界）
- 自動發票系統
- 後台管理 Dashboard
- 會員分群標籤系統

---

## 2. 目標受眾與轉換策略

### 2.1 目標受眾

- 零程式基礎但想快速做出銷售頁 & 名單機制的**創業者**
- 行銷人想親手完成網站部署與追蹤設定
- 需要與工程師協作並降低溝通門檻的**跨部門人員**

### 2.2 痛點挖掘

- 想做可上線的銷售頁但技術門檻太高？
- 常跟工程師雞同鴨講，進度被延誤？
- 課程學了很多但沒作品可用？

### 2.3 價值主張

Vibe Coding 幫你用「感覺派程式素養」直接產出成果並提升溝通能力。

### 2.4 轉換策略

- ✔ 名額倒數 + 早鳥優惠提升急迫感
- ✔ 社會證明放在 CTA 前增加信任
- ✔ 把「成果作品」前置呈現在 Hero 下方
- ✔ 使用信任圖標（名額倒數、過去案例數字）
- ✔ CTA 顏色對比強烈、直覺性強

---

## 3. 系統架構總覽

### 3.1 架構圖

```
[ GitHub Repo（main / pull_request）]
         │
         ▼
[ GitHub Actions CI/CD ]
         │
         ▼
[ GitHub Pages（靜態銷售頁）]
         │
         ▼  CTA → 加入 LINE 官方帳號
[ LINE Official Account ]
         │
         ▼  Messaging API
[ LINE Webhook ]
         │
         ▼
[ Google Apps Script Web App ]
         │
         ▼
[ Google Sheet（報名資料庫）]
```

### 3.2 資料流程

```
使用者瀏覽銷售頁
    ↓
點擊 CTA 加入 LINE
    ↓
LINE 自動回覆歡迎訊息
    ↓
點擊「報名課程」
    ↓
取得匯款資訊 → 匯款
    ↓
輸入「我已完成匯款」
    ↓
輸入匯款帳號後五碼
    ↓
LINE Webhook → GAS
    ↓
GAS 寫入 Google Sheet
    ↓
人工對帳 → 更新狀態
    ↓
LINE 推播報名成功通知
```

---

## 4. 前端系統 — 一頁式銷售頁

### 4.1 部署環境

| 項目         | 規格                                              |
| ------------ | ------------------------------------------------- |
| Hosting      | GitHub Pages                                      |
| CI/CD        | GitHub Actions                                    |
| Repo         | `vibe-coding-landing`                             |
| Production   | `main`                                            |
| Preview 檢查 | `pull_request`                                    |
| URL          | `https://username.github.io/vibe-coding-landing/` |
| 技術         | Next.js + TailwindCSS（Static Export）            |

**GitHub Pages 與 Actions 設定**：

```
Settings → Pages
Source: GitHub Actions

Workflow file:
.github/workflows/deploy-pages.yml

Trigger:
- push to main：自動部署正式站
- pull_request：執行 build / lint 驗證，不直接部署
```

### 4.1.1 GitHub CI/CD 自動部署規格

| 項目           | 規格                                                         |
| -------------- | ------------------------------------------------------------ |
| Workflow 名稱  | `deploy-pages`                                               |
| Workflow 檔案  | `.github/workflows/deploy-pages.yml`                         |
| 觸發條件       | `push` 至 `main`、`pull_request` 至 `main`                   |
| Build 指令     | `npm ci` → `npm run build`                                   |
| 輸出目錄       | `out/`（Next.js Static Export）                              |
| 部署方式       | `actions/upload-pages-artifact` + `actions/deploy-pages`     |
| Node.js 版本   | `20.x`                                                       |
| 權限需求       | `contents: read`、`pages: write`、`id-token: write`          |
| 併發控制       | 同一時間僅保留一個正式部署工作，避免重複覆蓋                 |
| 失敗處理       | Build 失敗時不得部署，於 GitHub Actions 顯示失敗紀錄         |
| 回滾方式       | 以 `git revert` 回退上一版後重新觸發 workflow 自動部署       |

**建議 workflow 結構**：

1. `build` job：安裝依賴、執行 build、上傳 Pages artifact
2. `deploy` job：僅在 `push` 到 `main` 成功後執行 Pages 部署
3. `pull_request` 僅驗證，不發布正式站

### 4.2 銷售頁區塊架構

以下為必備區塊與內容要求：

---

#### 區塊 1：Hero 區（首屏）

| 項目   | 內容                                                           |
| ------ | -------------------------------------------------------------- |
| 主標題 | 用 AI 跟 _享哥_ 一起做出你的第一個銷售頁！                     |
| 副標   | 零程式基礎、快速上手、可部署上線 — 3 小時完成你的 MVP 銷售頁。 |
| 主 CTA | 👉 現在報名（搭配倒數優惠／早鳥價格）                          |
| 次 CTA | 👉 查看課程亮點                                                |

---

#### 區塊 2：痛點與價值主張

呈現目標受眾的核心痛點，並以 Vibe Coding 作為解決方案。

---

#### 區塊 3：講師介紹

**講師：享哥（徐享）**
生成式 AI 應用規劃師，擁有多年行銷實戰與 AI 應用經驗。

> ✔ 超過 10 年數位行銷＋自動化整合經驗
> ✔ AI 實作與跨團隊溝通實戰者
> ✔ 多場企業與院校講師經歷
> ✔ 擅長讓不懂程式的人「做得懂、做得出」

---

#### 區塊 4：課程核心內容

**教學方式**：活動式實作 + 即時 Debug + 可上線成果 + 小班互動 + 課後資源

**學習地圖**：

1. Vibe Coding 核心概念
2. 實作你的第一個銷售頁
3. Next.js / TailwindCSS 基礎快速入門（理解不是寫）
4. 設置追蹤：GA4、GTM、像素碼
5. 上線部署與版本管理

---

#### 區塊 5：課程時間與地點

具體開課日期、地點、上課時長。

---

#### 區塊 6：產出示例（成果展示）

用 visual card 呈現落地成果：

- 銷售頁樣板
- 名單表單 + 追蹤觸發設定
- 實際上線網址操作步驟截圖

---

#### 區塊 7：社會證明（Testimonials）

- _「跟享哥一起做完的銷售頁真的上線了！」_
- _「不懂程式也能部署 + 追蹤設定！」_
- _「實際可用、可複製的流程太實在！」_

（如果沒有可先用課後作品評語或同儕 feedback）

---

#### 區塊 8：價格方案與 CTA

| 方案         | 價格      |
| ------------ | --------- |
| 單人票       | NT$ X,XXX |
| 早鳥優惠     | NT$ Y,YYY |
| 雙人團報優惠 | 另洽      |

**行動按鈕**（至少 3 處 CTA）：

- 👉 立即報名
- 👉 加入 LINE 了解最新課程

建議：固定浮動 CTA

---

#### 區塊 9：報名流程說明

圖示化說明報名步驟：加入 LINE → 點擊報名 → 匯款 → 輸入後五碼 → 完成。

---

#### 區塊 10：FAQ（常見問題）

- 是否需要寫程式？
- 上課需準備什麼工具？
- 上課後是否有教材？
- 退款／改期政策

---

### 4.3 CTA 技術規格

所有報名按鈕導向 LINE 官方帳號：

```html
<a href="https://lin.ee/xxxxxxx" target="_blank" rel="noopener noreferrer"> 立即報名 </a>
```

點擊 CTA 同時觸發 GA4 / Pixel 事件追蹤。

---

## 5. LINE 官方帳號系統

### 5.1 技術模式

- LINE Messaging API
- Webhook 啟用
- Channel Type：Messaging API
- Auto-reply：**關閉**（由 Webhook 接管）

### 5.2 Webhook 設定

```
Webhook URL：https://script.google.com/macros/s/DEPLOY_ID/exec
```

### 5.3 Rich Menu 設計

| 按鈕     | 功能             |
| -------- | ---------------- |
| 查看課程 | 回覆課程資訊     |
| 查看價格 | 回覆價格方案     |
| 報名課程 | 進入報名流程     |
| 聯絡客服 | 顯示客服聯絡方式 |

### 5.4 對話流程狀態機

#### 狀態定義

| State           | 說明                 |
| --------------- | -------------------- |
| idle            | 未進入報名流程       |
| waiting_payment | 已索取匯款資訊       |
| waiting_last5   | 等待輸入後五碼       |
| pending         | 已填寫後五碼，待對帳 |
| confirmed       | 對帳成功             |

#### 狀態轉換流程

```
加入好友 → idle
    │
    ├── 點擊「報名課程」→ waiting_payment
    │       │
    │       └── 輸入「我已完成匯款」→ waiting_last5
    │               │
    │               └── 輸入 5 碼數字 → pending
    │                       │
    │                       └── 人工確認 → confirmed
```

### 5.5 報名流程詳細設計

**Step 1：加入好友**

自動回覆：

- 歡迎訊息
- 課程簡介
- 引導點擊「報名課程」

**Step 2：點擊報名課程**

回覆：

- 當前優惠價格
- 匯款資訊按鈕
- 匯款流程說明

**Step 3：匯款資訊**

提供：

- 銀行名稱 / 代碼 / 帳號 / 金額
- 提示：匯款後輸入「我已完成匯款」

**Step 4：使用者輸入「我已完成匯款」**

回覆：請輸入匯款帳號後五碼

**Step 5：使用者輸入五碼**

- LINE 將訊息送至 Webhook
- GAS 處理並寫入 Google Sheet
- 回覆確認收到訊息

---

## 6. GAS 後端系統

### 6.1 部署方式

| 項目       | 設定    |
| ---------- | ------- |
| Type       | Web App |
| Execute as | Me      |
| Access     | Anyone  |

### 6.2 doPost(e) 處理流程

```
Step 1：驗證 X-Line-Signature（使用 Channel Secret）
    ↓
Step 2：解析 JSON → JSON.parse(e.postData.contents)
    ↓
Step 3：判斷訊息類型 → event.type === 'message' && event.message.type === 'text'
    ↓
Step 4：判斷是否為五碼數字 → /^\d{5}$/
    ↓
Step 5：寫入 Google Sheet → sheet.appendRow([...])
    ↓
Step 6：回覆 LINE 確認訊息
```

### 6.3 Webhook 接收資料格式

```json
{
	"events": [
		{
			"type": "message",
			"replyToken": "...",
			"source": {
				"userId": "Uxxxxxxxx"
			},
			"message": {
				"type": "text",
				"text": "11879"
			},
			"timestamp": 123456789
		}
	]
}
```

### 6.4 回覆訊息範例

```javascript
UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
	method: 'post',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
	},
	payload: JSON.stringify({
		replyToken: replyToken,
		messages: [
			{
				type: 'text',
				text: '已收到您的匯款資訊，將於12小時內完成確認。',
			},
		],
	}),
});
```

---

## 7. Google Sheet 資料庫

### 7.1 Sheet 名稱

```
registrations
```

### 7.2 欄位定義

| Column      | Type     | 說明                | 必要 |
| ----------- | -------- | ------------------- | ---- |
| id          | UUID     | 主鍵                | ✔    |
| timestamp   | DateTime | 建立時間            | ✔    |
| userId      | String   | LINE userId         | ✔    |
| displayName | String   | LINE 顯示名稱       | ✔    |
| last5       | String   | 匯款後五碼          | ✔    |
| amount      | Number   | 應收金額            | ✔    |
| status      | String   | pending / confirmed | ✔    |
| source      | String   | landing             | ✔    |
| courseDate  | String   | 課程日期            | ✔    |
| remark      | String   | 備註                |      |

### 7.3 新增資料範例

```javascript
sheet.appendRow([
	uuid,
	new Date(),
	userId,
	displayName,
	last5,
	3000,
	'pending',
	'landing',
	'2025-10-12',
]);
```

---

## 8. 對帳與通知機制

### 8.1 人工對帳流程

1. 管理員檢視銀行入帳
2. 比對後五碼 + 金額
3. 將 Google Sheet 中 `status` 更新為 `confirmed`

### 8.2 自動通知機制（可選）

- GAS 定時檢查 Sheet
- 當 `status` 更新為 `confirmed` 時
- 觸發 LINE Push Message API：

```
🎉 恭喜！您的報名已確認成功
```

---

## 9. 錯誤處理機制

### 9.1 非五碼數字

回覆：

```
請輸入正確的5碼數字
```

### 9.2 Webhook 失敗

- 記錄至另一個 Sheet：`error_logs`
- 寫入欄位：

| Column       | 說明         |
| ------------ | ------------ |
| timestamp    | 錯誤發生時間 |
| errorMessage | 錯誤訊息     |
| rawPayload   | 原始請求內容 |

### 9.3 其他例外

- 所有未捕捉例外記錄至 `error_logs`
- 避免向使用者暴露技術錯誤

---

## 10. 安全性設計

1. ✔ 使用 LINE Signature 驗證 Webhook 來源
2. ✔ 不儲存完整銀行帳號（僅後五碼）
3. ✔ Google Sheet 僅管理員可存取
4. ✔ GAS Web App 設為 Only Me 執行
5. ✔ GAS 不公開程式碼
6. ✔ Channel Access Token 存於 Script Properties，不寫死在程式碼中

---

## 11. 效能與非功能需求

| 項目           | 要求                     |
| -------------- | ------------------------ |
| Webhook 吞吐量 | 支援 100 筆/分鐘         |
| 寫入時間       | < 2 秒                   |
| 資料完整性     | 報名資料不得遺失         |
| Webhook 失敗   | 需有錯誤日誌             |
| Sheet 資料量   | 不得超過 10,000 筆未清理 |

---

## 12. 追蹤與數據優化

### 12.1 追蹤工具

- ✔ GA4（Google Analytics 4）
- ✔ Facebook / Meta Pixel

### 12.2 事件追蹤

- CTA 點擊事件
- 完成報名事件
- 頁面滾動深度

### 12.3 A/B 測試

- 按鈕文字（優先測試）
- 報名流程（優先測試）
- 標題與行動文案

---

## 13. 技術堆疊

| 層級   | 技術                               |
| ------ | ---------------------------------- |
| 前端   | Next.js + TailwindCSS              |
| CI/CD  | GitHub Actions                     |
| 部署   | GitHub Pages                       |
| 後端   | Google Apps Script                 |
| 資料庫 | Google Sheet                       |
| 通訊   | LINE Messaging API                 |
| 追蹤   | GA4 + Meta Pixel                   |

---

## 14. 部署步驟

### Phase 1：前端

1. 建立 GitHub Repo `vibe-coding-landing`
2. 建立 Next.js + TailwindCSS 專案並開發一頁式銷售頁
3. 啟用 GitHub Pages，Source 設為 `GitHub Actions`
4. 建立 `.github/workflows/deploy-pages.yml`
5. 設定 Next.js Static Export，確認輸出至 `out/`
6. 設定 `push main` 自動部署、`pull_request` 自動驗證
7. 驗證 workflow 成功與正式站上線狀態

### Phase 2：LINE

1. 建立 LINE 官方帳號
2. 啟用 Messaging API
3. 設計 Rich Menu
4. 設計自動回覆訊息流程

### Phase 3：後端

1. 建立 Google Sheet（`registrations` + `error_logs`）
2. 建立 GAS 專案
3. 寫入 Webhook 程式（doPost）
4. 部署 Web App
5. 設定 LINE Webhook URL

### Phase 4：整合測試

1. 測試加入好友
2. 測試匯款流程
3. 驗證寫入資料
4. 測試對帳推播
5. 安裝 GA4 + Pixel

---

## 15. 驗收標準

### 前端驗收

- [ ] GitHub Pages 正常上線
- [ ] `push` 至 `main` 可自動觸發正式部署
- [ ] `pull_request` 可自動執行 build 驗證
- [ ] GitHub Actions workflow 全部成功
- [ ] 所有 CTA 正確導向 LINE
- [ ] 銷售頁所有區塊正確呈現
- [ ] 行動裝置響應式正常
- [ ] GA4 / Pixel 事件觸發正常
- [ ] 部署失敗時不會覆蓋既有正式站版本

### LINE 驗收

- [ ] 加入好友自動回覆正常
- [ ] Rich Menu 按鈕功能正常
- [ ] 報名流程狀態轉換正確
- [ ] 匯款流程順暢

### 後端驗收

- [ ] Webhook 正確接收
- [ ] 五碼驗證成功
- [ ] Sheet 正確新增資料（欄位完整）
- [ ] LINE 回覆正常
- [ ] 對帳後可推播成功訊息
- [ ] 無未捕捉例外錯誤
- [ ] 錯誤日誌正常記錄

---

## 16. 專案里程碑

| 階段    | 內容                       | 預估時間 |
| ------- | -------------------------- | -------- |
| Phase 1 | 銷售頁完成 + 上線          | Week 1   |
| Phase 2 | LINE 帳號 + 報名流程完成   | Week 2   |
| Phase 3 | GAS 串接 + Sheet 儲存正常  | Week 3   |
| Phase 4 | 對帳流程 + 推播 + 整合測試 | Week 4   |

---

## 17. 後續擴充方向

1. 金流串接（TapPay / 綠界）
2. 自動發送電子發票
3. 會員分群標籤
4. 自動寄送課前教材
5. 自動建立學員名冊
6. 建立後台 Dashboard
7. 串接 Google Calendar
8. 多梯次課程管理

---

## 18. 風險與回滾策略

| 風險                          | 影響程度 | 緩解措施                                                     |
| ----------------------------- | -------- | ------------------------------------------------------------ |
| LINE Webhook 掛掉             | 高       | 啟用 `error_logs` 記錄，設定人工備援通道                     |
| GAS 部署失敗                  | 高       | 保留前一版本 Deploy ID，可即時切回                           |
| Google Sheet 資料超量         | 中       | 定期歸檔已確認資料，保持 Sheet 在 10,000 筆以下              |
| GitHub Actions build 失敗     | 中       | 將部署與 build 分離，build 未通過不得部署，直接於 PR 修復     |
| GitHub Pages 部署失敗或異常   | 中       | 以 `git revert` 回退到前一個穩定 commit，重新觸發自動部署     |
| GitHub Pages 權限設定錯誤     | 中       | 專案建立時先完成 Pages 與 Actions 權限檢查，首次部署前先做 dry run |
| LINE Channel Token 洩漏       | 高       | Token 僅存於 Script Properties，定期輪換                     |
| 匯款後五碼衝突                | 低       | 結合金額 + 時間進行人工比對                                  |

---

> **📌 本文件為完整可執行 PRD，涵蓋行銷內容策略、系統架構設計、技術實作規格。各階段開發團隊可依此文件直接進行實作。**
