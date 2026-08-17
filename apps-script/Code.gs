/**
 * ركاز — استقبال طلبات عرض السعر في Google Sheets
 *
 * طريقة التركيب (مرة واحدة):
 * 1) أنشئ ملف Google Sheets جديد.
 * 2) من القائمة: Extensions ← Apps Script، واحذف أي كود موجود والصق هذا الملف.
 * 3) اضغط Deploy ← New deployment ← النوع: Web app.
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4) انسخ رابط الـ Web app (ينتهي بـ /exec) وضعه في rekaz.html
 *    داخل المتغيّر SHEETS_ENDPOINT.
 */

var SHEET_NAME = 'الطلبات';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['التاريخ', 'الاسم', 'الشركة', 'الجوال', 'البريد الإلكتروني', 'الخدمة المطلوبة', 'عدد الشاحنات', 'موقع المشروع ومدته']);
      sheet.setRightToLeft(true);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#0D4F45').setFontColor('#FFFFFF');
    }
    var p = (e && e.parameter) || {};
    sheet.appendRow([
      new Date(),
      p.name || '',
      p.company || '',
      p.phone || '',
      p.email || '',
      p.service || '',
      p.trucks || '',
      p.location || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
