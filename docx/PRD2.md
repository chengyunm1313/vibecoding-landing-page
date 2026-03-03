很好，下面是 **工程師可直接實作的技術規格書（Technical Specification Document）**。

這份文件是「實作層級」，包含：

- 系統架構
- API 規格
- Webhook 格式
- GAS 程式邏輯
- Google Sheet Schema
- LINE Bot Flow State Machine
- 部署規格
- 錯誤處理機制
- 安全性設計

---

# 技術規格書

## 專案名稱

Vibe Coding 工作術 報名與收款系統

講師：享哥

---

# 1. 系統總覽

## 1.1 架構圖

```
[ GitHub Pages ]
        │
        ▼
[ LINE Official Account ]
        │
        ▼
[ LINE Webhook ]
        │
        ▼
[ Google Apps Script Web App ]
        │
        ▼
[ Google Sheet Database ]
```

---

# 2. 前端系統（GitHub Pages）

## 2.1 技術規格

- 純靜態網站
- HTML + TailwindCSS + Vanilla JS
- 不使用後端
- 所有報名透過 LINE 完成

---

## 2.2 部署規格

### Repository

```
repo name: vibe-coding-landing
branch: main
```

### GitHub Pages 設定

```
Settings → Pages
Source: Deploy from branch
Branch: main / root
```

---

## 2.3 CTA 規格

所有報名按鈕：

```
<a href="https://lin.ee/xxxxxxx" target="_blank">
```

必須加上：

```
rel="noopener noreferrer"
```

---

# 3. LINE 官方帳號系統

## 3.1 技術模式

- LINE Messaging API
- Webhook Enabled
- Channel Type: Messaging API

---

## 3.2 Webhook 設定

Webhook URL：

```
https://script.google.com/macros/s/DEPLOY_ID/exec
```

必須：

- 啟用 Webhook
- 關閉 Auto-reply

---

# 4. LINE 對話流程狀態機設計

## 4.1 狀態定義

| State           | 說明                 |
| --------------- | -------------------- |
| idle            | 未進入報名流程       |
| waiting_payment | 已索取匯款資訊       |
| waiting_last5   | 等待輸入後五碼       |
| pending         | 已填寫後五碼，待對帳 |
| confirmed       | 對帳成功             |

---

## 4.2 狀態流程

```
加入好友 → idle
點擊報名 → waiting_payment
輸入「我已完成匯款」 → waiting_last5
輸入5碼 → pending
人工確認 → confirmed
```

---

# 5. Webhook API 規格

## 5.1 LINE 傳入格式

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

---

# 6. GAS 後端規格

## 6.1 部署方式

- Type: Web App
- Execute as: Me
- Access: Anyone

---

## 6.2 doPost(e) 處理流程

### Step 1：驗證 Signature

```
X-Line-Signature
```

使用 Channel Secret 驗證。

---

### Step 2：解析 JSON

```javascript
const data = JSON.parse(e.postData.contents);
```

---

### Step 3：判斷訊息類型

條件：

```
event.type === 'message'
event.message.type === 'text'
```

---

### Step 4：判斷是否為五碼數字

Regex：

```
/^\d{5}$/
```

---

# 7. Google Sheet Schema

## 7.1 Sheet 名稱

```
registrations
```

---

## 7.2 欄位定義

| Column      | Type     | 說明                |
| ----------- | -------- | ------------------- |
| id          | UUID     | 主鍵                |
| timestamp   | DateTime | 建立時間            |
| userId      | String   | LINE ID             |
| displayName | String   | LINE 名稱           |
| last5       | String   | 匯款後五碼          |
| amount      | Number   | 應收金額            |
| status      | String   | pending / confirmed |
| source      | String   | landing             |
| courseDate  | String   | 課程日期            |

---

# 8. GAS 業務邏輯

## 8.1 新增報名資料

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

## 8.2 回覆成功訊息

使用 reply API：

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

# 9. 對帳機制

## 9.1 人工流程

1. 檢視銀行入帳
2. 比對後五碼
3. 更新 status 為 confirmed

---

## 9.2 GAS 自動通知機制

當 status 更新為 confirmed：

- 觸發 pushMessage API

---

# 10. 錯誤處理機制

## 10.1 非五碼數字

回覆：

```
請輸入正確的5碼數字
```

---

## 10.2 Webhook 失敗

- 記錄至另一個 Sheet：error_logs
- 寫入：

| timestamp | errorMessage | rawPayload |

---

# 11. 安全性設計

1. 驗證 LINE Signature
2. 不儲存完整銀行帳號
3. Google Sheet 限管理員權限
4. GAS 不公開程式碼
5. Channel Access Token 存於 Script Properties

---

# 12. 效能需求

- 支援同時 100 筆/分鐘 Webhook
- 寫入時間 < 2 秒
- 無資料遺失

---

# 13. 部署步驟總覽

1. 建立 Google Sheet
2. 建立 GAS 專案
3. 寫入 Webhook 程式
4. 部署 Web App
5. 設定 LINE Webhook URL
6. 測試加入好友
7. 測試匯款流程
8. 驗證寫入資料

---

# 14. 驗收標準（Engineering Acceptance Criteria）

- Webhook 正確接收
- 五碼驗證成功
- Sheet 正確新增資料
- LINE 回覆正常
- 對帳後可推播成功訊息
- 無未捕捉例外錯誤

---

# 15. 可擴充設計

- 改為串接第三方金流
- 自動寄送發票
- 建立後台 Dashboard
- 串接 Google Calendar
