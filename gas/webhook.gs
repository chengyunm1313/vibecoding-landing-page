/**
 * Vibe Coding 工作術報名 Webhook
 *
 * 注意：
 * Apps Script Web App 的 doPost(e) 事件物件不會提供 HTTP headers，
 * 因此這份範例改用 Webhook URL 上的共享 token 做第一層驗證。
 * 若日後改部署到 Cloud Run / Workers，可再切回 X-Line-Signature 驗證。
 */

const PROPERTIES = PropertiesService.getScriptProperties();
const REGISTRATION_SHEET_NAME =
	PROPERTIES.getProperty('REGISTRATION_SHEET_NAME') || 'registrations';
const ERROR_LOG_SHEET_NAME = PROPERTIES.getProperty('ERROR_LOG_SHEET_NAME') || 'error_logs';
const CHANNEL_ACCESS_TOKEN = PROPERTIES.getProperty('LINE_CHANNEL_ACCESS_TOKEN') || '';
const WEBHOOK_SHARED_TOKEN = PROPERTIES.getProperty('WEBHOOK_SHARED_TOKEN') || '';
const COURSE_AMOUNT = Number(PROPERTIES.getProperty('COURSE_AMOUNT') || '3000');
const COURSE_DATE = PROPERTIES.getProperty('COURSE_DATE') || '{{COURSE_DATE}}';
const SOURCE = PROPERTIES.getProperty('REGISTRATION_SOURCE') || 'landing';
const SPREADSHEET_ID = PROPERTIES.getProperty('SPREADSHEET_ID') || '';

function doPost(e) {
	try {
		validateSharedToken_(e);

		const payload = JSON.parse(getPostBody_(e));
		const events = payload.events || [];

		events.forEach((event) => {
			handleEvent_(event);
		});

		return jsonResponse_({ ok: true });
	} catch (error) {
		recordError_(error, e);
		return jsonResponse_({
			ok: false,
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

// --- State Management ---
const STATE_CACHE_TIME = 600; // 10分鐘 (秒)
const STATE_WAITING_LAST5 = 'WAITING_LAST5';

function handleEvent_(event) {
	if (!event || event.type !== 'message' || !event.message || event.message.type !== 'text') {
		return;
	}

	const eventId = event.webhookEventId || (event.message && event.message.id) || '';
	if (eventId && isDuplicateEvent_(eventId)) {
		return;
	}

	const userId = event.source && event.source.userId ? event.source.userId : '';
	const text = String(event.message.text || '').trim();
	const cache = CacheService.getScriptCache();
	const userStateKey = userId + '_state';
	const currentState = cache.get(userStateKey);
	// 1. 全域指令：報名 (直接回覆首頁卡片並清除任何卡住的狀態)
	if (text === '報名') {
		cache.remove(userStateKey);
		replyWelcomeMessage_(event.replyToken, userId);
		return;
	}

	// 2. 處理「取消」動作
	if (text === '取消') {
		if (currentState) {
			cache.remove(userStateKey);
			replyText_(event.replyToken, '❌ 已取消目前的匯款回報流程。您可以隨時點擊「報名」重新開始。');
		} else {
			// 沒在流程中也按取消
			replyWelcomeMessage_(event.replyToken, userId);
		}
		return;
	}

	// 3. 處理「查看價格方案」
	if (text === '查看價格方案') {
		cache.remove(userStateKey);
		replyText_(
			event.replyToken,
			'💰 【優惠方案】\n\n超早鳥：NTD 3,000（優惠倒數中！）\n原價　：NTD 4,500\n\n👉 點擊下方選單的「報名」即可開始報名流程！'
		);
		return;
	}

	// 4. 處理「複製匯款資訊」
	if (text === '複製匯款資訊') {
		cache.remove(userStateKey);
		const bankInfo =
			'【匯款資訊總覽】\n銀行：玉山銀行 (808)\n戶名：陳威達\n帳號：0370968229188\n金額：NT$ 3,000\n\n💡 提示：您可以長按上方訊息單獨複製銀行代碼或帳號\n✅ 完成匯款後，請點擊「我已完成匯款」或是輸入「我已完成匯款」';
		replyText_(event.replyToken, bankInfo);
		return;
	}

	// 5. 處理「我已完成匯款」
	if (text === '我已完成匯款') {
		// 設定狀態為等待輸入五碼，存活 10 分鐘
		cache.put(userStateKey, STATE_WAITING_LAST5, STATE_CACHE_TIME);
		replyFlexMessage_(event.replyToken, '確認匯款完成', getConfirmFlex_());
		return;
	}

	// 6. 處理 5 碼數字 (全域接受：不管使用者有沒有先按按鈕，只要給 5 碼數字就受理，並清除狀態)
	if (/^\d{5}$/.test(text)) {
		cache.remove(userStateKey);

		const displayName = getLineDisplayName_(userId);
		appendRegistration_({
			id: eventId || Utilities.getUuid(),
			timestamp: new Date(),
			userId: userId,
			displayName: displayName,
			last5: text,
			amount: COURSE_AMOUNT, // 使用變數
			status: 'pending',
			source: SOURCE,
			courseDate: COURSE_DATE,
			remark: '',
		});

		replyFlexMessage_(event.replyToken, '報名成功', getSuccessFlex_());
		return;
	}

	// 7. 狀態機內的防呆：如果使用者正在等 5 碼，卻輸入了其他不符格式的文字 (上面已排除報名/取消/選單等關鍵字)
	if (currentState === STATE_WAITING_LAST5) {
		replyText_(
			event.replyToken,
			'⚠️ 格式錯誤！\n請輸入正確的 5 碼數字。\n（若想中斷流程，請輸入「取消」）'
		);
		return;
	}

	// 8. 其他關鍵字或未捕捉的對話都回傳歡迎 Flex 卡片
	replyWelcomeMessage_(event.replyToken, userId);
}

function replyWelcomeMessage_(replyToken, userId) {
	const displayName = getLineDisplayName_(userId) || '朋友';
	// 先傳一段歡迎純文字，再傳 Flex 卡片
	const welcomeText = `👋 哈囉～${displayName}！\n我是您的課程助理 🐈\n\n很高興您對「Vibe Coding 工作術」課程感興趣 🎉\n👉 報名請直接點擊下方報名資訊，或輸入關鍵字「報名」即可！`;

	const payload = {
		replyToken: replyToken,
		messages: [
			{ type: 'text', text: welcomeText },
			{ type: 'flex', altText: 'Vibe Coding 課程報名資訊', contents: getWelcomeFlex_() },
		],
	};

	callLineApi_('https://api.line.me/v2/bot/message/reply', payload);
}

function replyFlexMessage_(replyToken, altText, flexContents) {
	const payload = {
		replyToken: replyToken,
		messages: [
			{
				type: 'flex',
				altText: altText,
				contents: flexContents,
			},
		],
	};
	callLineApi_('https://api.line.me/v2/bot/message/reply', payload);
}

// --- Flex Message JSON Generators ---

function getWelcomeFlex_() {
	return {
		type: 'bubble',
		size: 'kilo',
		header: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '《Vibe Coding 工作術》',
					color: '#ffffff',
					weight: 'bold',
					size: 'lg',
					align: 'center',
				},
			],
			backgroundColor: '#6B5B95',
			paddingAll: '16px',
		},
		body: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'box',
					layout: 'horizontal',
					contents: [
						{ type: 'text', text: '📅', size: 'sm', flex: 0 },
						{
							type: 'text',
							text: ' 課程日期',
							size: 'sm',
							weight: 'bold',
							color: '#E06B65',
							margin: 'sm',
						},
					],
					margin: 'md',
				},
				{
					type: 'text',
					text: '10/12 整日線下大課 + 四週實戰陪跑',
					size: 'sm',
					wrap: true,
					margin: 'sm',
				},
				{
					type: 'box',
					layout: 'horizontal',
					contents: [
						{ type: 'text', text: '📍', size: 'sm', flex: 0 },
						{
							type: 'text',
							text: ' 上課地點',
							size: 'sm',
							weight: 'bold',
							color: '#E06B65',
							margin: 'sm',
						},
					],
					margin: 'md',
				},
				{
					type: 'text',
					text: '臺北市中山區民權西路20號 2樓-204房',
					size: 'sm',
					wrap: true,
					margin: 'sm',
				},
				{
					type: 'text',
					text: '(民權西路捷運站走路 2 分鐘)',
					size: 'xs',
					color: '#888888',
					wrap: true,
					margin: 'xs',
				},
				{ type: 'separator', margin: 'lg' },
				{
					type: 'box',
					layout: 'horizontal',
					contents: [
						{ type: 'text', text: '💰', size: 'sm', flex: 0 },
						{ type: 'text', text: ' 課程費用', size: 'sm', weight: 'bold', margin: 'sm' },
					],
					margin: 'lg',
				},
				{
					type: 'box',
					layout: 'horizontal',
					contents: [
						{ type: 'text', text: '原價', size: 'sm', color: '#888888' },
						{
							type: 'text',
							text: 'NT$ 4,500',
							size: 'sm',
							color: '#888888',
							align: 'end',
							decoration: 'line-through',
						},
					],
					margin: 'sm',
				},
				{
					type: 'box',
					layout: 'horizontal',
					contents: [
						{ type: 'text', text: '超早鳥優惠', size: 'md', weight: 'bold', color: '#E06B65' },
						{
							type: 'text',
							text: 'NT$ 3,000',
							size: 'md',
							weight: 'bold',
							color: '#E06B65',
							align: 'end',
						},
					],
					margin: 'sm',
				},
				{
					type: 'box',
					layout: 'vertical',
					contents: [
						{
							type: 'text',
							text: '⏰ 優惠倒數中！省下 NT$ 1,500',
							size: 'sm',
							color: '#E06B65',
							weight: 'bold',
							align: 'center',
						},
					],
					backgroundColor: '#FFF5F0',
					cornerRadius: 'md',
					paddingAll: '10px',
					margin: 'md',
				},
				{
					type: 'box',
					layout: 'vertical',
					contents: [
						{
							type: 'text',
							text: '📋 報名流程',
							size: 'sm',
							weight: 'bold',
							color: '#5A7371',
							margin: 'sm',
						},
						{
							type: 'text',
							text: '1. 點選「複製匯款資訊」取得帳戶\n2. 完成匯款後點選「我已完成匯款」\n3. 將有專人確認並發送報名成功通知',
							size: 'xs',
							color: '#666666',
							wrap: true,
							margin: 'sm',
						},
					],
					backgroundColor: '#F4F0E6',
					cornerRadius: 'md',
					paddingAll: '12px',
					margin: 'md',
				},
			],
			paddingAll: '20px',
		},
		footer: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'button',
					action: { type: 'message', label: '我已完成匯款', text: '我已完成匯款' },
					style: 'primary',
					color: '#6B5B95',
					height: 'sm',
					margin: 'sm',
				},
				{
					type: 'button',
					action: { type: 'message', label: '📋 複製匯款資訊', text: '複製匯款資訊' },
					style: 'secondary',
					color: '#EEEEEE',
					height: 'sm',
					margin: 'sm',
				},
				{
					type: 'button',
					action: { type: 'message', label: '💰 查看價格方案', text: '查看價格方案' },
					style: 'secondary',
					color: '#EEEEEE',
					height: 'sm',
					margin: 'sm',
				},
				{
					type: 'button',
					action: {
						type: 'uri',
						label: '瞭解更多課程內容',
						uri: 'https://chengyunm1313.github.io/vibecoding-landing-page',
					},
					style: 'link',
					height: 'sm',
					margin: 'sm',
				},
			],
			paddingAll: '20px',
		},
	};
}

function getConfirmFlex_() {
	return {
		type: 'bubble',
		size: 'kilo',
		header: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '✅ 確認匯款完成',
					color: '#ffffff',
					weight: 'bold',
					size: 'lg',
				},
			],
			backgroundColor: '#6B5B95',
			paddingAll: '16px',
		},
		body: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '您是否確定已完成匯款？',
					weight: 'bold',
					size: 'md',
					margin: 'md',
				},
				{
					type: 'text',
					text: '完成後將會有專人協助幫您確認訂單',
					size: 'sm',
					color: '#888888',
					margin: 'sm',
					wrap: true,
				},
				{
					type: 'box',
					layout: 'vertical',
					contents: [
						{
							type: 'text',
							text: '📌 請提供匯款後五碼',
							weight: 'bold',
							size: 'sm',
							color: '#E06B65',
						},
						{
							type: 'text',
							text: '為了加速對帳，請在下方對話框直接「輸入」您的匯款帳號後五碼',
							size: 'xs',
							color: '#666666',
							wrap: true,
							margin: 'sm',
						},
					],
					backgroundColor: '#FFF5F0',
					cornerRadius: 'md',
					paddingAll: '12px',
					margin: 'lg',
				},
				{
					type: 'box',
					layout: 'vertical',
					contents: [
						{
							type: 'text',
							text: '💡 提示',
							weight: 'bold',
							size: 'sm',
							color: '#D4A373',
						},
						{
							type: 'text',
							text: '請直接輸入後五碼數字\n例如：12345',
							size: 'xs',
							color: '#666666',
							wrap: true,
							margin: 'sm',
						},
					],
					backgroundColor: '#F4F4F4',
					cornerRadius: 'md',
					paddingAll: '12px',
					margin: 'md',
				},
			],
			paddingAll: '20px',
		},
		footer: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'button',
					action: { type: 'message', label: '取消', text: '取消' },
					style: 'secondary',
					color: '#EEEEEE',
					height: 'sm',
				},
			],
			paddingAll: '20px',
		},
	};
}

function getSuccessFlex_() {
	return {
		type: 'bubble',
		size: 'kilo',
		header: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '🎉 報名成功！',
					color: '#ffffff',
					weight: 'bold',
					size: 'lg',
				},
			],
			backgroundColor: '#5A9E66',
			paddingAll: '16px',
		},
		body: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '感謝您的報名！',
					weight: 'bold',
					size: 'md',
					margin: 'md',
				},
				{
					type: 'text',
					text: '我們已收到您的匯款後五碼資訊。\n\n經專人核對無誤後，將會以 LINE 通知您加入專屬報名者群組，請稍候 12 小時。期待在課程見到您！',
					size: 'sm',
					color: '#666666',
					wrap: true,
					margin: 'md',
				},
			],
			paddingAll: '20px',
		},
	};
}

/**
 * 檢查事件是否已處理過（去重）
 * 比對 registrations 工作表的 id 欄（A 欄）是否已存在相同 eventId
 */
function isDuplicateEvent_(eventId) {
	try {
		const sheet = getSheet_(REGISTRATION_SHEET_NAME);
		const lastRow = sheet.getLastRow();

		if (lastRow < 2) {
			return false;
		}

		// 只讀取 A 欄（id 欄），從第 2 列開始（跳過表頭）
		const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

		for (var i = 0; i < ids.length; i++) {
			if (String(ids[i][0]) === eventId) {
				return true;
			}
		}

		return false;
	} catch (error) {
		// 查詢失敗時不阻擋寫入，避免誤擋正常事件
		console.error('去重檢查失敗：', error);
		return false;
	}
}

function validateSharedToken_(e) {
	if (!WEBHOOK_SHARED_TOKEN) {
		throw new Error('缺少 WEBHOOK_SHARED_TOKEN 設定');
	}

	const token = e && e.parameter ? e.parameter.token : '';
	if (token !== WEBHOOK_SHARED_TOKEN) {
		throw new Error('Webhook token 驗證失敗');
	}
}

function getPostBody_(e) {
	if (!e || !e.postData || !e.postData.contents) {
		throw new Error('缺少 POST payload');
	}

	return e.postData.contents;
}

function getSpreadsheet_() {
	if (!SPREADSHEET_ID) {
		throw new Error('缺少 SPREADSHEET_ID 設定');
	}

	return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function appendRegistration_(row) {
	const sheet = getSheet_(REGISTRATION_SHEET_NAME);
	sheet.appendRow([
		row.id,
		row.timestamp,
		row.userId,
		row.displayName,
		row.last5,
		row.amount,
		row.status,
		row.source,
		row.courseDate,
		row.remark,
	]);
}

function recordError_(error, e) {
	try {
		const sheet = getSheet_(ERROR_LOG_SHEET_NAME);
		sheet.appendRow([
			new Date(),
			error instanceof Error ? error.message : String(error),
			e && e.postData && e.postData.contents ? e.postData.contents : '',
		]);
	} catch (loggingError) {
		console.error(loggingError);
	}
}

function getSheet_(sheetName) {
	const spreadsheet = getSpreadsheet_();
	const sheet = spreadsheet.getSheetByName(sheetName);

	if (!sheet) {
		throw new Error('找不到工作表：' + sheetName);
	}

	return sheet;
}

function getLineDisplayName_(userId) {
	if (!userId || !CHANNEL_ACCESS_TOKEN) {
		return 'LINE 使用者';
	}

	try {
		const response = UrlFetchApp.fetch(
			'https://api.line.me/v2/bot/profile/' + encodeURIComponent(userId),
			{
				method: 'get',
				headers: {
					Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
				},
				muteHttpExceptions: true,
			}
		);

		if (response.getResponseCode() !== 200) {
			return 'LINE 使用者';
		}

		const data = JSON.parse(response.getContentText());
		return data.displayName || 'LINE 使用者';
	} catch (error) {
		console.error(error);
		return 'LINE 使用者';
	}
}

function replyText_(replyToken, text) {
	if (!replyToken || !CHANNEL_ACCESS_TOKEN) {
		return;
	}

	UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
		method: 'post',
		contentType: 'application/json',
		headers: {
			Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
		},
		payload: JSON.stringify({
			replyToken: replyToken,
			messages: [
				{
					type: 'text',
					text: text,
				},
			],
		}),
		muteHttpExceptions: true,
	});
}

function jsonResponse_(payload) {
	return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
		ContentService.MimeType.JSON
	);
}

/**
 * 處理 POST 請求到 LINE API
 */
function callLineApi_(url, payload) {
	if (!CHANNEL_ACCESS_TOKEN) {
		console.error('沒有設定 LINE_CHANNEL_ACCESS_TOKEN');
		return;
	}

	try {
		UrlFetchApp.fetch(url, {
			method: 'post',
			contentType: 'application/json',
			headers: {
				Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
			},
			payload: JSON.stringify(payload),
			muteHttpExceptions: true,
		});
	} catch (e) {
		console.error('LINE API 呼叫失敗:', e);
	}
}
