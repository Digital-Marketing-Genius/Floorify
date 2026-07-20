var FLOORIFY_LEADS_CONFIG = {
  sheetName: 'Leads',
  notifyEmail: 'boramedianetwork@gmail.com'
};

var FLOORIFY_LEAD_HEADERS = [
  'Timestamp',
  'Form Type',
  'Booking Type',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Preferred Date',
  'Project Location',
  'Project Type',
  'Interest Area',
  'Project Description',
  'Page URL'
];

function doGet() {
  return jsonResponse_({
    success: true,
    service: 'Floorify lead capture',
    message: 'Endpoint is ready'
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    var data = parseRequestData_(e);

    // Bots commonly fill fields hidden from real visitors.
    if (safeValue_(data.website)) {
      return jsonResponse_({ success: true, message: 'Lead accepted' });
    }

    var lead = normalizeLeadData_(data);
    validateLead_(lead);

    var sheet = getOrCreateSheet_(FLOORIFY_LEADS_CONFIG.sheetName);
    ensureHeaders_(sheet);

    sheet.appendRow([
      lead.timestamp,
      safeCellValue_(lead.formType),
      safeCellValue_(lead.bookingType),
      safeCellValue_(lead.firstName),
      safeCellValue_(lead.lastName),
      safeCellValue_(lead.email),
      safeCellValue_(lead.phone),
      safeCellValue_(lead.preferredDate),
      safeCellValue_(lead.projectLocation),
      safeCellValue_(lead.projectType),
      safeCellValue_(lead.interestArea),
      safeCellValue_(lead.projectDescription),
      safeCellValue_(lead.pageUrl)
    ]);

    sendNotificationEmail_(lead, FLOORIFY_LEADS_CONFIG.notifyEmail);

    return jsonResponse_({
      success: true,
      message: 'Lead saved successfully'
    });
  } catch (error) {
    console.error(error);
    return jsonResponse_({
      success: false,
      error: error && error.message ? error.message : String(error)
    });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function getOrCreateSheet_(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, FLOORIFY_LEAD_HEADERS.length);
  var currentHeaders = headerRange.getDisplayValues()[0];

  if (currentHeaders.join('|') !== FLOORIFY_LEAD_HEADERS.join('|')) {
    headerRange.setValues([FLOORIFY_LEAD_HEADERS]);
  }

  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function parseRequestData_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('No POST data received.');
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error('The submitted form data was not valid JSON.');
  }
}

function normalizeLeadData_(data) {
  var rawFormType = safeValue_(data.formType);
  var rawBookingType = safeValue_(data.bookingType);

  var formType = rawFormType;
  if (/estimate|quote/i.test(rawFormType)) {
    formType = 'Quote Request';
  } else if (/booking/i.test(rawFormType)) {
    formType = 'Booking Request';
  }

  var bookingType = rawBookingType;
  if (/^inperson$/i.test(rawBookingType)) {
    bookingType = 'In-person';
  } else if (/^virtual$/i.test(rawBookingType)) {
    bookingType = 'Virtual';
  }

  return {
    timestamp: new Date(),
    formType: safeValue_(formType || 'Website Lead'),
    bookingType: safeValue_(bookingType),
    firstName: safeValue_(data.firstName),
    lastName: safeValue_(data.lastName),
    email: safeValue_(data.email),
    phone: safeValue_(data.phone),
    preferredDate: safeValue_(data.preferredDate),
    projectLocation: safeValue_(data.projectLocation),
    projectType: safeValue_(data.projectType),
    interestArea: safeValue_(data.interestArea),
    projectDescription: safeValue_(data.projectDescription),
    pageUrl: safeValue_(data.pageUrl)
  };
}

function validateLead_(lead) {
  if (!lead.firstName || !lead.lastName || !lead.email || !lead.phone) {
    throw new Error('First name, last name, email and phone are required.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    throw new Error('A valid email address is required.');
  }
}

function safeValue_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function safeCellValue_(value) {
  var text = safeValue_(value);
  return /^[=+@]/.test(text) ? "'" + text : text;
}

function sendNotificationEmail_(lead, notifyEmail) {
  MailApp.sendEmail({
    to: notifyEmail,
    subject: buildEmailSubject_(lead),
    body: buildEmailBody_(lead),
    replyTo: lead.email
  });
}

function buildEmailSubject_(lead) {
  if (lead.formType === 'Quote Request') {
    return 'New Quote Request - Floorify';
  }

  if (lead.formType === 'Booking Request') {
    return 'New Booking Request - Floorify' +
      (lead.bookingType ? ' - ' + lead.bookingType : '');
  }

  return 'New Lead - Floorify';
}

function buildEmailBody_(lead) {
  var lines = [
    'A new lead has been submitted from the Floorify website.',
    '',
    '==============================',
    'LEAD DETAILS',
    '==============================',
    '',
    'Form Type: ' + displayOrNA_(lead.formType),
    'Booking Type: ' + displayOrNA_(lead.bookingType),
    'First Name: ' + displayOrNA_(lead.firstName),
    'Last Name: ' + displayOrNA_(lead.lastName),
    'Email: ' + displayOrNA_(lead.email),
    'Phone: ' + displayOrNA_(lead.phone),
    'Preferred Date: ' + displayOrNA_(lead.preferredDate),
    'Project Location: ' + displayOrNA_(lead.projectLocation),
    'Project Type: ' + displayOrNA_(lead.projectType),
    'Interest Area: ' + displayOrNA_(lead.interestArea),
    '',
    'Project Description:',
    displayOrNA_(lead.projectDescription),
    '',
    'Page URL: ' + displayOrNA_(lead.pageUrl),
    '',
    'Submitted At: ' + Utilities.formatDate(
      lead.timestamp,
      Session.getScriptTimeZone(),
      'yyyy-MM-dd HH:mm:ss'
    )
  ];

  return lines.join('\n');
}

function displayOrNA_(value) {
  return safeValue_(value) || 'N/A';
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
