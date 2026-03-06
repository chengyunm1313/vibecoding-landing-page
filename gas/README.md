# GAS Webhook 部署說明

## 檔案

- `webhook.gs`：LINE Webhook 入口、Google Sheet 寫入、錯誤紀錄
- `appsscript.json`：Apps Script manifest

## 建議工作表

- `registrations`
- `error_logs`

## Script Properties

- `SPREADSHEET_ID`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `WEBHOOK_SHARED_TOKEN`
- `REGISTRATION_SHEET_NAME`
- `ERROR_LOG_SHEET_NAME`
- `COURSE_AMOUNT`
- `COURSE_DATE`
- `REGISTRATION_SOURCE`

## 部署步驟

1. 建立新的 Apps Script 專案。
2. 建立 `registrations` 與 `error_logs` 工作表。
3. 將 `webhook.gs` 與 `appsscript.json` 複製到專案。
4. 在 `Project Settings > Script Properties` 設定所需環境值。
5. 以 `Deploy > New deployment > Web app` 發布。
6. `Execute as` 選擇 `Me`，`Who has access` 選擇 `Anyone`。
7. 將部署網址加上 `?token=你的共享 token` 後填入 LINE Webhook URL。

## 注意事項

- Apps Script Web App 的 `doPost(e)` 事件物件不會提供 request headers，因此無法直接在這份程式中讀取 `X-Line-Signature`。
- 若未來要做真正的 LINE Signature 驗證，建議把 Webhook 入口搬到 Cloud Run、Cloudflare Workers 或其他能讀取原始 headers 的環境。
