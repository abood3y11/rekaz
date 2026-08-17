# ركاز — صفحة الهبوط | Rekaz Landing Page

صفحة هبوط عربية (RTL) لخدمات تأجير الشاحنات القلابة والخدمات اللوجستية، مع مشهد ثلاثي الأبعاد مربوط بالتمرير (Three.js + GSAP ScrollTrigger + Lenis).

## الملفات

| الملف | الوصف |
|---|---|
| `index.html` | الصفحة كاملة (HTML + CSS + JS في ملف واحد) |
| `assets/rekaz.png` | الشعار الأصلي |
| `assets/rekaz-logo.png` | نسخة مقصوصة من الشعار للعرض في الصفحة |
| `assets/rekaz.ico` | أيقونة المتصفح (favicon) |
| `apps-script/Code.gs` | كود Google Apps Script لاستقبال طلبات النموذج في Google Sheets |

## ربط نموذج «اطلب عرض سعر» بـ Google Sheets

أي شخص يعبّئ النموذج تصل بياناته لملف Google Sheets عندك. خطوات التفعيل (مرة واحدة، ٥ دقائق):

1. أنشئ ملف **Google Sheets** جديد من [sheets.new](https://sheets.new).
2. من القائمة: **Extensions ← Apps Script**.
3. احذف الكود الموجود والصق محتوى `apps-script/Code.gs` ثم احفظ.
4. اضغط **Deploy ← New deployment**، واختر النوع **Web app** بالإعدادات:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. وافق على الأذونات، ثم انسخ رابط الـ Web app (ينتهي بـ `/exec`).
6. افتح `index.html` وابحث عن السطر:
   ```js
   var SHEETS_ENDPOINT=''; // ← ضع هنا رابط النشر من Google Apps Script
   ```
   وضع الرابط بين علامتي التنصيص.

بعدها كل طلب يُرسل من النموذج يظهر صفاً جديداً في ورقة «الطلبات» مع التاريخ والوقت.

> ملاحظة: إذا تُرك `SHEETS_ENDPOINT` فارغاً تعمل الصفحة طبيعياً وتعرض رسالة النجاح، لكن دون إرسال البيانات (وضع تجريبي).

## التشغيل محلياً

افتح `index.html` مباشرة في المتصفح — لا يحتاج خادماً. المكتبات (GSAP، Lenis، Three.js) تُحمَّل من CDN.
