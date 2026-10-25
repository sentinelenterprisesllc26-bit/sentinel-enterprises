/**
 * Sentinel Care automation — Google Apps Script (runs as Sentinelenterprisesllc26@gmail.com, free).
 * Setup: script.google.com > New project > paste this file. Project Settings > Script properties:
 *   SHARED_SECRET = same random value as Netlify CARE_SHARED_SECRET
 *   LIVE          = "true" only after approval. While not "true", every email goes to TEST_TO
 *                   with a [TEST] subject and no family is shared on any sheet.
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone) -> URL = CARE_APPS_SCRIPT_URL.
 * Run setupWeeklyTrigger() once (Mondays 8 AM Central).
 */
var TEMPLATE_ID = '1E-OpY19kfN76CbFdfbZYIfrDcxSHkrAiLK2h1kgZG0k';
var REGISTRY_ID = '1JcWY2o-1oNOG255EMYg3ccicSLXhsWpPSnN2-8BaP1o';
var FOLDER_ID   = '1ibEoYoSIl36SSmv4_2HQLATIig9H9ZFT';
var TEST_TO     = 'Sentinelenterprisesllc26@gmail.com';
var SITE        = 'https://sentinelenterprisesllc.com';
var DISCLAIMER  = 'Sentinel Care is a paperwork and organization service only. It is not medical, legal, tax, or financial advice.';

function props_() { return PropertiesService.getScriptProperties(); }
function isLive_() { return props_().getProperty('LIVE') === 'true'; }
function reg_() { return SpreadsheetApp.openById(REGISTRY_ID).getSheets()[0]; }
function cols_() { var s = reg_(); return s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0]; }
function findRow_(key, val) {
  var sh = reg_(), c = cols_().indexOf(key) + 1; if (!val || sh.getLastRow() < 2) return 0;
  var v = sh.getRange(2, c, sh.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < v.length; i++) if (String(v[i][0]) === String(val)) return i + 2;
  return 0;
}
function get_(row, key) { return reg_().getRange(row, cols_().indexOf(key) + 1).getValue(); }
function set_(row, obj) { var c = cols_(), sh = reg_(); for (var k in obj) if (c.indexOf(k) >= 0) sh.getRange(row, c.indexOf(k) + 1).setValue(obj[k]); }

function send_(to, subject, body) {
  var real = isLive_();
  GmailApp.sendEmail(real ? to : TEST_TO, real ? subject : '[TEST -> ' + to + '] ' + subject,
    body + '\n\n—\n' + DISCLAIMER + '\nQuestions? Just reply to this email.', { name: 'Sentinel Care', replyTo: TEST_TO });
}

function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var p = JSON.parse(e.postData.contents);
    if (!props_().getProperty('SHARED_SECRET') || p.secret !== props_().getProperty('SHARED_SECRET')) return out_({ ok: false, error: 'forbidden' });
    var ev = p.event;
    if (ev.type === 'purchase') return out_(onPurchase_(ev));
    if (ev.type === 'intake') return out_(onIntake_(ev));
    if (ev.type === 'cancel') return out_(onCancel_(ev));
    return out_({ ok: false, error: 'unknown type' });
  } finally { lock.releaseLock(); }
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function onPurchase_(ev) {
  if (findRow_('checkout_session', ev.session)) return { ok: true, duplicate: true };
  var name = ev.name || ev.email;
  var file = DriveApp.getFileById(TEMPLATE_ID).makeCopy('Sentinel Care - ' + name + ' Organizer', DriveApp.getFolderById(FOLDER_ID));
  if (isLive_()) file.addEditor(ev.email);
  reg_().appendRow([new Date(), 'active', ev.email, ev.email, '', '', '', '', '', ev.customer || '', ev.subscription || '', ev.session, file.getId(), file.getUrl(), '', ev.livemode]);
  send_(ev.email, 'Welcome to Sentinel Care — your family organizer is ready',
    welcome_(String(name).split(' ')[0], file.getUrl(), SITE + '/care/start?session_id=' + ev.session));
  return { ok: true, sheet: file.getUrl() };
}

function onIntake_(ev) {
  var row = findRow_('checkout_session', ev.session);
  if (!row) { onPurchase_({ email: ev.email, session: ev.session, livemode: ev.session.indexOf('cs_live_') === 0 }); row = findRow_('checkout_session', ev.session); }
  var f = ev.fields; set_(row, f);
  var ss = SpreadsheetApp.openById(get_(row, 'sheet_id'));
  if (f.family_name) DriveApp.getFileById(ss.getId()).setName('Sentinel Care - ' + f.family_name + ' Family Organizer');
  var start = ss.getSheetByName('Start Here');
  if (f.caregivers) start.getRange('A14').setValue('Caregivers: ' + f.caregivers);
  if (f.what_to_track) start.getRange('A15').setValue('We are tracking: ' + f.what_to_track);
  if (isLive_()) emails_(f.update_emails).forEach(function (m) { try { ss.addEditor(m); } catch (x) {} });
  return { ok: true };
}

function onCancel_(ev) {
  var row = findRow_('stripe_subscription', ev.subscription); if (!row) return { ok: true, unknown: true };
  if (get_(row, 'status') === 'canceled') return { ok: true, duplicate: true };
  set_(row, { status: 'canceled' });
  send_(get_(row, 'customer_email'), 'Your Sentinel Care plan has ended', cancel_(get_(row, 'sheet_url')));
  return { ok: true };
}

function emails_(s) { return String(s || '').split(/[,;\s]+/).filter(function (x) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x); }); }

/** Weekly (trigger): summarize the last 7 days of each ACTIVE family's Visit Log + Receipts. Canceled families are skipped. */
function weeklyUpdates() {
  var n = reg_().getLastRow(); if (n < 2) return;
  var end = new Date(), start = new Date(end.getTime() - 7 * 864e5);
  for (var r = 2; r <= n; r++) {
    if (get_(r, 'status') !== 'active' || !get_(r, 'sheet_id')) continue;
    var ss = SpreadsheetApp.openById(get_(r, 'sheet_id'));
    var s = summarize_(ss, start, end);
    var who = get_(r, 'loved_one_first_name') || 'your loved one';
    var to = emails_(get_(r, 'update_emails')); if (!to.length) to = [get_(r, 'customer_email')];
    ss.getSheetByName('Weekly Update').appendRow([end, s.visits, s.hours, s.receipts, s.total, s.plain, to.join(', ')]);
    send_(to.join(','), 'Weekly care update for ' + who + ' — week ending ' + Utilities.formatDate(end, 'America/Chicago', 'MMM d'), weekly_(who, s, ss.getUrl()));
    set_(r, { last_weekly_sent: end });
  }
}
function inWeek_(d, a, b) { d = new Date(d); return !isNaN(d) && d >= a && d <= b; }
function money_(x) { return Number(String(x).replace(/[$,]/g, '')) || 0; }
function summarize_(ss, a, b) {
  var v = ss.getSheetByName('Visit Log').getDataRange().getValues().slice(1).filter(function (x) { return inWeek_(x[0], a, b); });
  var rc = ss.getSheetByName('Receipts').getDataRange().getValues().slice(1).filter(function (x) { return inWeek_(x[0], a, b); });
  var hours = v.reduce(function (t, x) { return t + (Number(x[4]) || 0); }, 0);
  var total = rc.reduce(function (t, x) { return t + money_(x[3]); }, 0);
  var cg = {}; v.forEach(function (x) { if (x[1]) cg[x[1]] = 1; });
  var lines = v.map(function (x) { return '• ' + Utilities.formatDate(new Date(x[0]), 'America/Chicago', 'EEE MMM d') + ': ' + (x[1] || 'Caregiver') + (x[4] ? ' (' + x[4] + ' hrs)' : '') + (x[5] ? ' — ' + x[5] : '') + (x[6] ? '. Note: ' + x[6] : ''); });
  var rl = rc.map(function (x) { return '• ' + (x[2] || 'Expense') + ' — $' + money_(x[3]).toFixed(2) + (x[1] ? ' to ' + x[1] : '') + (x[4] ? ', paid by ' + x[4] : ''); });
  var plain = v.length ? v.length + ' visit(s) by ' + Object.keys(cg).join(', ') + ', ' + hours + ' hours total. ' + rc.length + ' receipt(s) totaling $' + total.toFixed(2) + '.' : 'No visits were logged this week.';
  return { visits: v.length, hours: hours, receipts: rc.length, total: total.toFixed(2), lines: lines, rlines: rl, plain: plain };
}
function setupWeeklyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'weeklyUpdates') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('weeklyUpdates').timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(8).inTimezone('America/Chicago').create();
}
/** Manual end-to-end test while LIVE is off: purchase -> intake -> weekly -> cancel. All emails go to TEST_TO. */
function selfTest() {
  var sess = 'cs_test_selftest' + Date.now(), sub = 'sub_test_' + Date.now();
  onPurchase_({ email: TEST_TO, name: 'Test Family', session: sess, subscription: sub, livemode: false });
  onIntake_({ session: sess, email: TEST_TO, fields: { family_name: 'Test', loved_one_first_name: 'Grandma', caregivers: 'Example Caregiver', what_to_track: 'visits, receipts', update_emails: TEST_TO } });
  weeklyUpdates();
  onCancel_({ subscription: sub });
}

// ---- Email copy (mirrors /workspace/sales-growth/care-automation/emails.md) ----
function welcome_(first, sheetUrl, intakeUrl) {
  return 'Hi ' + first + ',\n\nWelcome to Sentinel Care! Your family organizer is ready:\n' + sheetUrl +
    '\n\nIt has four tabs:\n• Visit Log: one row per caregiver visit\n• Receipts: one row per care bill or purchase\n• Schedule: who covers which days\n• Weekly Update: filled in for you every Monday\n\n' +
    'It works in the free Google Sheets app on any phone, so anyone you add can log a visit in under a minute.\n\n' +
    'If you haven\'t yet, take 2 minutes to tell us who\'s involved and who should get the weekly update:\n' + intakeUrl +
    '\n\nEvery Monday morning, everyone on your list gets a short plain-language summary of the week: visits, hours, and receipts.\n\n' +
    'Your first 28 days are free. You can manage or cancel anytime from your Stripe receipt email.\n\nWarmly,\nSentinel Care';
}
function weekly_(who, s, url) {
  return 'Hi,\n\nHere is this week\'s care update for ' + who + '.\n\nIn short: ' + s.plain +
    '\n\nVisits\n' + (s.lines.join('\n') || '• None logged') + '\n\nReceipts\n' + (s.rlines.join('\n') || '• None logged') +
    '\n\nSee or add details anytime: ' + url +
    '\n\nThis summary only repeats what your family logged. For any health question, please talk with your loved one\'s doctor or care team.\n\nSentinel Care';
}
function cancel_(url) {
  return 'Hi,\n\nYour Sentinel Care plan has ended and weekly updates have stopped. Thank you for letting us help your family stay organized.\n\n' +
    'Your organizer is still yours to keep and use: ' + url + '\n\nIf you ever want updates again, you can restart anytime at ' + SITE + '/care.\n\nWarmly,\nSentinel Care';
}
