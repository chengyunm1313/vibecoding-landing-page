/**
 * Vibe Coding 工作術報名 Webhook
 *
 * 注意：
 * Apps Script Web App 的 doPost(e) 事件物件不會提供 HTTP headers，
 * 因此這份範例改用 Webhook URL 上的共享 token 做第一層驗證。
 * 若日後改部署到 Cloud Run / Workers，可再切回 X-Line-Signature 驗證。
 */

const PROPERTIES = PropertiesService.getScriptProperties();
const REGISTRATION_SHEET_NAME = PROPERTIES.getProperty('REGISTRATION_SHEET_NAME') || 'registrations';
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

function handleEvent_(event) {
  if (!event || event.type !== 'message' || !event.message || event.message.type !== 'text') {
    return;
  }

  const userId = event.source && event.source.userId ? event.source.userId : '';
  const text = String(event.message.text || '').trim();

  if (text === '我已完成匯款') {
    replyText_(event.replyToken, '請輸入匯款帳號後五碼');
    return;
  }

  if (!/^\d{5}$/.test(text)) {
    replyText_(event.replyToken, '請輸入正確的5碼數字');
    return;
  }

  const displayName = getLineDisplayName_(userId);
  appendRegistration_({
    id: Utilities.getUuid(),
    timestamp: new Date(),
    userId: userId,
    displayName: displayName,
    last5: text,
    amount: COURSE_AMOUNT,
    status: 'pending',
    source: SOURCE,
    courseDate: COURSE_DATE,
    remark: '',
  });

  replyText_(event.replyToken, '已收到您的匯款資訊，將於 12 小時內完成確認。');
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
    const response = UrlFetchApp.fetch('https://api.line.me/v2/bot/profile/' + encodeURIComponent(userId), {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      muteHttpExceptions: true,
    });

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
    ContentService.MimeType.JSON,
  );
}
