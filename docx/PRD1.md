# 產品需求文件 PRD

## 產品名稱

《Vibe Coding 工作術》實戰課程銷售與報名系統

講師：享哥

---

# 一、產品目標

## 商業目標

1. 建立可自動化收款報名流程
2. 降低人工客服成本
3. 所有報名資料自動儲存於 Google Sheet
4. 建立可複製的課程銷售系統

---

# 二、整體系統架構

## 架構總覽

```
GitHub Pages（銷售頁）
        ↓
CTA → 加入 LINE 官方帳號
        ↓
LINE Messaging API
        ↓
Webhook
        ↓
Google Apps Script (GAS)
        ↓
Google Sheet（報名資料庫）
```

---

# 三、前端系統（銷售頁）

## 部署環境

- Hosting：GitHub Pages
- Repo：vibe-coding-landing
- URL 格式：

  ```
  https://username.github.io/vibe-coding-landing/
  ```

---

## 功能需求

### 1. 一頁式銷售頁

必備區塊：

1. Hero 區
2. 課程介紹
3. 課程時間與地點
4. 價格與優惠方案
5. 成果展示
6. 報名流程說明
7. FAQ
8. CTA 按鈕（至少 3 處）

---

### 2. CTA 功能

所有「報名」按鈕導向：

```
https://lin.ee/你的LINE連結
```

---

### 3. 追蹤需求

- 可加入 GA4
- 可加入 Meta Pixel
- 點擊 CTA 記錄 event

---

# 四、LINE 官方帳號設計

## 模式

使用 Messaging API + Webhook 模式

---

## Rich Menu 設計

按鈕區塊：

1. 查看課程資訊
2. 查看價格方案
3. 報名課程
4. 聯絡客服

---

# 五、LINE 報名流程設計

## 1️⃣ 加入好友

自動回覆：

- 歡迎訊息
- 課程簡介
- 引導點擊「報名課程」

---

## 2️⃣ 點擊報名課程

回覆內容：

- 當前優惠價格
- 匯款資訊按鈕
- 匯款流程說明

---

## 3️⃣ 匯款資訊內容

提供：

- 銀行名稱
- 代碼
- 帳號
- 金額
- 提示：匯款後輸入「我已完成匯款」

---

## 4️⃣ 使用者輸入「我已完成匯款」

回覆：

請輸入匯款帳號後五碼

---

## 5️⃣ 使用者輸入五碼

LINE 將訊息送至 Webhook

---

# 六、GAS 後端設計

## 1. Webhook 接收

接收：

- userId
- displayName
- message text
- timestamp

---

## 2. 邏輯判斷

如果訊息為五碼數字：

- 寫入 Google Sheet
- 設定狀態為「待對帳」

---

## 3. 寫入 Google Sheet 結構

Sheet 名稱：registrations

| 欄位        | 說明                |
| ----------- | ------------------- |
| Timestamp   | 報名時間            |
| userId      | LINE userId         |
| displayName | LINE 顯示名稱       |
| last5       | 匯款後五碼          |
| amount      | 應收金額            |
| status      | pending / confirmed |
| source      | landing             |
| remark      | 備註                |

---

# 七、對帳流程

## 人工對帳流程

1. 管理員檢視銀行入帳
2. 比對後五碼 + 金額
3. 將 Sheet 狀態改為 confirmed

---

## GAS 進階功能（可選）

- 定時檢查 Sheet
- 如果 status = confirmed
- 使用 push API 傳送：

```
🎉 恭喜！您的報名已確認成功
```

---

# 八、資料流程

```
使用者加入LINE
        ↓
點擊報名
        ↓
匯款
        ↓
輸入後五碼
        ↓
LINE Webhook
        ↓
GAS
        ↓
Google Sheet
        ↓
人工對帳
        ↓
更新狀態
        ↓
LINE 推播成功通知
```

---

# 九、權限與安全性

1. GAS Web App 設為 Only Me 執行
2. Webhook 使用 LINE Signature 驗證
3. 不儲存敏感銀行完整帳號
4. Google Sheet 僅管理員可存取

---

# 十、非功能需求

- 報名資料不得遺失
- Webhook 失敗需有 log
- Sheet 不得超過 10,000 筆未清理

---

# 十一、驗收標準

## 前端

- GitHub Pages 正常上線
- 所有 CTA 正確導向 LINE

## LINE

- 加入好友自動回覆正常
- 匯款流程順暢

## 後端

- 輸入後五碼能寫入 Sheet
- 資料欄位完整
- 對帳成功後能推播通知

---

# 十二、技術堆疊

前端：

- HTML / Tailwind / JS
- GitHub Pages

後端：

- Google Apps Script
- Google Sheet

整合：

- LINE Messaging API

---

# 十三、後續擴充方向

1. 金流串接（TapPay / 綠界）
2. 自動發送電子發票
3. 會員分群標籤
4. 自動寄送課前教材
5. 自動建立學員名冊

---

# 十四、專案里程碑

Phase 1

- 銷售頁完成
- LINE 流程完成

Phase 2

- GAS 串接完成
- Sheet 儲存正常

Phase 3

- 對帳流程完成
- 成功推播完成
