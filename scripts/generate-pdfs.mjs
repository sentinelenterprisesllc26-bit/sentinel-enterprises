// Generates the 7 downloadable guide PDFs for Sentinel Enterprises LLC.
//
// Each PDF is built from plain PDF drawing primitives (rectangles, lines, text,
// circles) so the guides are richly illustrated and readable for anyone from a
// teenager to an 80-year-old. Run with: node scripts/generate-pdfs.mjs
//
// All output is written to public/downloads/.

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'downloads');

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
const NAVY = rgb(0x0f / 255, 0x17 / 255, 0x2a / 255); // #0f172a
const AMBER = rgb(0xf5 / 255, 0x9e / 255, 0x0b / 255); // #f59e0b
const LIGHT = rgb(0xf8 / 255, 0xfa / 255, 0xfc / 255); // #f8fafc
const DARK = rgb(0x1e / 255, 0x29 / 255, 0x3b / 255); // #1e293b
const SLATE = rgb(0x47 / 255, 0x55 / 255, 0x69 / 255); // #475569 muted text
const WHITE = rgb(1, 1, 1);
const RED = rgb(0xb9 / 255, 0x1c / 255, 0x1c / 255); // #b91c1c warning text
const REDBG = rgb(0xfe / 255, 0xf2 / 255, 0xf2 / 255); // #fef2f2 warning bg
const GREEN = rgb(0x15 / 255, 0x80 / 255, 0x3d / 255); // #15803d
const BORDER = rgb(0xcb / 255, 0xd5 / 255, 0xe1 / 255); // #cbd5e1

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 72;
const CONTENT_W = PAGE_W - MARGIN * 2; // 468

// ---------------------------------------------------------------------------
// Document builder
// ---------------------------------------------------------------------------
class Guide {
  constructor(doc, fonts, title, subtitle) {
    this.doc = doc;
    this.font = fonts.regular;
    this.bold = fonts.bold;
    this.title = title;
    this.subtitle = subtitle;
    this.pageNum = 0;
    this.page = null;
    this.y = 0;
  }

  // Start a fresh page with the standard header banner + footer.
  newPage({ banner = true } = {}) {
    this.page = this.doc.addPage([PAGE_W, PAGE_H]);
    this.pageNum += 1;
    if (banner) this._banner();
    else this.y = PAGE_H - MARGIN;
    this._footer();
    return this.page;
  }

  _banner() {
    const h = 96;
    // Navy header banner
    this.page.drawRectangle({ x: 0, y: PAGE_H - h, width: PAGE_W, height: h, color: NAVY });
    // Amber accent line underneath
    this.page.drawRectangle({ x: 0, y: PAGE_H - h - 5, width: PAGE_W, height: 5, color: AMBER });
    // Title
    this.page.drawText(this.title, {
      x: MARGIN, y: PAGE_H - 48, size: 20, font: this.bold, color: WHITE,
    });
    // Amber subtitle: company name
    this.page.drawText('Sentinel Enterprises LLC', {
      x: MARGIN, y: PAGE_H - 70, size: 11, font: this.bold, color: AMBER,
    });
    this.y = PAGE_H - h - 5 - 28;
  }

  _footer() {
    const fy = 40;
    this.page.drawLine({
      start: { x: MARGIN, y: fy + 14 }, end: { x: PAGE_W - MARGIN, y: fy + 14 },
      thickness: 0.75, color: BORDER,
    });
    this.page.drawText(`Page ${this.pageNum}`, {
      x: MARGIN, y: fy, size: 9, font: this.font, color: SLATE,
    });
    const credit = '© Sentinel Enterprises LLC | sentinelenterprisesllc.com';
    const w = this.font.widthOfTextAtSize(credit, 9);
    this.page.drawText(credit, {
      x: PAGE_W - MARGIN - w, y: fy, size: 9, font: this.font, color: SLATE,
    });
  }

  // Make sure there is at least `needed` vertical space; otherwise new page.
  ensure(needed) {
    if (this.y - needed < 64) this.newPage();
  }

  // ---- Text helpers ------------------------------------------------------
  _wrap(text, size, font, maxW) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // Section heading with a colored divider line under it.
  heading(text) {
    this.ensure(48);
    this.y -= 6;
    this.page.drawText(text, { x: MARGIN, y: this.y, size: 15, font: this.bold, color: NAVY });
    this.y -= 8;
    this.page.drawRectangle({ x: MARGIN, y: this.y, width: CONTENT_W, height: 2.5, color: AMBER });
    this.y -= 16;
  }

  divider() {
    this.ensure(20);
    this.y -= 6;
    this.page.drawLine({
      start: { x: MARGIN, y: this.y }, end: { x: PAGE_W - MARGIN, y: this.y },
      thickness: 1, color: BORDER,
    });
    this.y -= 14;
  }

  paragraph(text, { size = 11, color = DARK, font = this.font, gap = 8, x = MARGIN, maxW = CONTENT_W } = {}) {
    const lineH = size + 4;
    const lines = this._wrap(text, size, font, maxW);
    for (const line of lines) {
      this.ensure(lineH);
      this.page.drawText(line, { x, y: this.y, size, font, color });
      this.y -= lineH;
    }
    this.y -= gap;
  }

  // Big bold headline (used on cover pages).
  headline(text, { size = 22, color = NAVY } = {}) {
    const lineH = size + 6;
    const lines = this._wrap(text, size, this.bold, CONTENT_W);
    for (const line of lines) {
      this.ensure(lineH);
      this.page.drawText(line, { x: MARGIN, y: this.y, size, font: this.bold, color });
      this.y -= lineH;
    }
    this.y -= 8;
  }

  // Numbered step: amber circle with white number, bold title, wrapped body.
  numberedStep(n, title, body, { circleColor = AMBER } = {}) {
    this.ensure(50);
    const r = 13;
    const cx = MARGIN + r;
    const cy = this.y - r + 4;
    this.page.drawCircle({ x: cx, y: cy, size: r, color: circleColor });
    const label = String(n);
    const lw = this.bold.widthOfTextAtSize(label, 13);
    this.page.drawText(label, { x: cx - lw / 2, y: cy - 4.5, size: 13, font: this.bold, color: WHITE });

    const textX = MARGIN + r * 2 + 12;
    const textW = PAGE_W - MARGIN - textX;
    if (title) {
      this.page.drawText(title, { x: textX, y: this.y, size: 12, font: this.bold, color: NAVY });
      this.y -= 17;
    }
    if (body) {
      const lines = this._wrap(body, 11, this.font, textW);
      for (const line of lines) {
        this.ensure(15);
        this.page.drawText(line, { x: textX, y: this.y, size: 11, font: this.font, color: DARK });
        this.y -= 15;
      }
    }
    this.y -= 12;
  }

  // Callout box: tinted fill with a colored left border bar.
  callout(text, { title = null, variant = 'tip' } = {}) {
    let bg = LIGHT, bar = AMBER, tColor = DARK, hColor = NAVY;
    if (variant === 'warning') { bg = REDBG; bar = RED; hColor = RED; }
    if (variant === 'success') { bg = rgb(0xf0/255,0xfd/255,0xf4/255); bar = GREEN; hColor = GREEN; }

    const padX = 14, padY = 12;
    const innerX = MARGIN + 8 + padX;
    const innerW = CONTENT_W - 8 - padX * 2;
    const size = 11, lineH = 15;

    const titleLines = title ? this._wrap(title, 11.5, this.bold, innerW) : [];
    const bodyLines = this._wrap(text, size, this.font, innerW);
    const boxH = padY * 2 + titleLines.length * 16 + bodyLines.length * lineH;

    this.ensure(boxH + 10);
    const top = this.y + 4;
    const boxY = top - boxH;
    // Fill
    this.page.drawRectangle({ x: MARGIN, y: boxY, width: CONTENT_W, height: boxH, color: bg });
    // Left border bar
    this.page.drawRectangle({ x: MARGIN, y: boxY, width: 6, height: boxH, color: bar });

    let ty = top - padY - 11;
    for (const line of titleLines) {
      this.page.drawText(line, { x: innerX, y: ty, size: 11.5, font: this.bold, color: hColor });
      ty -= 16;
    }
    for (const line of bodyLines) {
      this.page.drawText(line, { x: innerX, y: ty, size, font: this.font, color: tColor });
      ty -= lineH;
    }
    this.y = boxY - 16;
  }

  // Checklist item: drawn checkbox square + wrapped label.
  checkItem(text, { bold = false } = {}) {
    const box = 11;
    const textX = MARGIN + box + 12;
    const textW = PAGE_W - MARGIN - textX;
    const font = bold ? this.bold : this.font;
    const lines = this._wrap(text, 11, font, textW);
    const need = Math.max(box + 6, lines.length * 15);
    this.ensure(need + 6);
    const boxTop = this.y + 1;
    this.page.drawRectangle({
      x: MARGIN, y: boxTop - box, width: box, height: box,
      borderColor: NAVY, borderWidth: 1.3, color: WHITE,
    });
    let ty = this.y;
    for (const line of lines) {
      this.page.drawText(line, { x: textX, y: ty, size: 11, font, color: DARK });
      ty -= 15;
    }
    this.y = boxTop - Math.max(box, lines.length * 15) - 8;
  }

  // A small caption / sub-label.
  caption(text, { x = MARGIN, color = SLATE, size = 9.5, gap = 8 } = {}) {
    this.ensure(size + gap);
    this.page.drawText(text, { x, y: this.y, size, font: this.font, color });
    this.y -= size + gap;
  }

  // Fill-in field: label text followed by an underline rule.
  fillField(label, { lineW = 240, gap = 14 } = {}) {
    this.ensure(24);
    const size = 11;
    this.page.drawText(label, { x: MARGIN, y: this.y, size, font: this.bold, color: NAVY });
    const lw = this.bold.widthOfTextAtSize(label, size);
    const lineStart = MARGIN + lw + 8;
    const lineEnd = Math.min(PAGE_W - MARGIN, lineStart + lineW);
    this.page.drawLine({
      start: { x: lineStart, y: this.y - 2 }, end: { x: lineEnd, y: this.y - 2 },
      thickness: 0.9, color: SLATE,
    });
    this.y -= gap + 10;
  }

  // A block of blank ruled writing lines.
  writeLines(count, { gap = 22 } = {}) {
    for (let i = 0; i < count; i++) {
      this.ensure(gap);
      this.page.drawLine({
        start: { x: MARGIN, y: this.y }, end: { x: PAGE_W - MARGIN, y: this.y },
        thickness: 0.8, color: BORDER,
      });
      this.y -= gap;
    }
    this.y -= 6;
  }

  space(h = 10) { this.y -= h; }

  // ---- Diagram primitives -----------------------------------------------
  // Horizontal flow of labeled boxes connected by arrows.
  flowBoxes(items, { boxH = 54, color = NAVY } = {}) {
    this.ensure(boxH + 24);
    const n = items.length;
    const arrowW = 22;
    const totalArrow = arrowW * (n - 1);
    const boxW = (CONTENT_W - totalArrow) / n;
    const top = this.y;
    let x = MARGIN;
    for (let i = 0; i < n; i++) {
      const boxY = top - boxH;
      this.page.drawRectangle({
        x, y: boxY, width: boxW, height: boxH,
        color: LIGHT, borderColor: color, borderWidth: 1.5,
      });
      // top accent
      this.page.drawRectangle({ x, y: top - 4, width: boxW, height: 4, color: AMBER });
      const lines = this._wrap(items[i], 9.5, this.bold, boxW - 12);
      let ty = boxY + boxH / 2 + (lines.length * 11) / 2 - 9;
      for (const line of lines) {
        const lw = this.bold.widthOfTextAtSize(line, 9.5);
        this.page.drawText(line, { x: x + boxW / 2 - lw / 2, y: ty, size: 9.5, font: this.bold, color });
        ty -= 11;
      }
      // arrow to next
      if (i < n - 1) {
        const ay = top - boxH / 2;
        const ax = x + boxW;
        this.page.drawLine({ start: { x: ax + 3, y: ay }, end: { x: ax + arrowW - 5, y: ay }, thickness: 2, color: AMBER });
        // arrowhead
        this.page.drawLine({ start: { x: ax + arrowW - 5, y: ay }, end: { x: ax + arrowW - 11, y: ay + 4 }, thickness: 2, color: AMBER });
        this.page.drawLine({ start: { x: ax + arrowW - 5, y: ay }, end: { x: ax + arrowW - 11, y: ay - 4 }, thickness: 2, color: AMBER });
      }
      x += boxW + arrowW;
    }
    this.y = top - boxH - 20;
  }
}

// ---------------------------------------------------------------------------
// Custom illustration helpers (shared shapes used across guides)
// ---------------------------------------------------------------------------

// A simple house/wallet icon drawn from a rectangle + triangle roof.
function drawHouse(page, x, y, w, h, fonts, label) {
  const body = h * 0.62;
  page.drawRectangle({ x, y, width: w, height: body, borderColor: NAVY, borderWidth: 1.6, color: LIGHT });
  // roof (triangle via SVG path)
  page.drawSvgPath(`M 0 0 L ${w / 2} ${-(h - body)} L ${w} 0 Z`, {
    x, y: y + body, borderColor: NAVY, borderWidth: 1.6, color: AMBER, scale: 1,
  });
  // door
  page.drawRectangle({ x: x + w / 2 - 7, y, width: 14, height: body * 0.55, color: NAVY });
  if (label) {
    const lw = fonts.bold.widthOfTextAtSize(label, 9);
    page.drawText(label, { x: x + w / 2 - lw / 2, y: y - 14, size: 9, font: fonts.bold, color: NAVY });
  }
}

// A key icon (circle head + shaft + teeth).
function drawKey(page, x, y, fonts, label) {
  page.drawCircle({ x: x + 8, y, size: 8, borderColor: NAVY, borderWidth: 2, color: AMBER });
  page.drawCircle({ x: x + 8, y, size: 3, color: WHITE });
  page.drawLine({ start: { x: x + 16, y }, end: { x: x + 44, y }, thickness: 2.4, color: NAVY });
  page.drawLine({ start: { x: x + 38, y }, end: { x: x + 38, y: y - 7 }, thickness: 2.4, color: NAVY });
  page.drawLine({ start: { x: x + 44, y }, end: { x: x + 44, y: y - 7 }, thickness: 2.4, color: NAVY });
  if (label) {
    page.drawText(label, { x: x - 4, y: y - 22, size: 9, font: fonts.bold, color: NAVY });
  }
}

// A person/family figure (head circle + body).
function drawPerson(page, x, y, fonts, label) {
  page.drawCircle({ x, y, size: 7, color: NAVY });
  page.drawSvgPath(`M ${-12} 0 Q 0 ${-26} 12 0 Z`, { x, y: y - 10, color: NAVY, scale: 1 });
  if (label) {
    const lw = fonts.bold.widthOfTextAtSize(label, 9);
    page.drawText(label, { x: x - lw / 2, y: y - 42, size: 9, font: fonts.bold, color: NAVY });
  }
}

// A shield shape with a label inside, threats arrowing in from outside.
function drawShield(g, x, y, w, h) {
  const page = g.page;
  // shield outline via path
  const path = `M ${w / 2} 0 ` +
    `L ${w} ${h * 0.18} ` +
    `L ${w} ${h * 0.55} ` +
    `Q ${w} ${h * 0.9} ${w / 2} ${h} ` +
    `Q 0 ${h * 0.9} 0 ${h * 0.55} ` +
    `L 0 ${h * 0.18} Z`;
  page.drawSvgPath(path, { x, y: y + h, borderColor: NAVY, borderWidth: 2.5, color: rgb(0xe2/255,0xe8/255,0xf0/255), scale: 1 });
  // house inside
  drawHouse(page, x + w / 2 - 26, y + h * 0.34, 52, 46, { bold: g.bold }, '');
  const lbl = 'YOUR ASSETS';
  const lw = g.bold.widthOfTextAtSize(lbl, 9);
  page.drawText(lbl, { x: x + w / 2 - lw / 2, y: y + h * 0.20, size: 9, font: g.bold, color: NAVY });
}

// ---------------------------------------------------------------------------
// Contact block reused on closing pages
// ---------------------------------------------------------------------------
function contactPage(g, intro) {
  g.newPage();
  g.heading('Contact & Next Steps');
  if (intro) g.paragraph(intro, { gap: 12 });
  g.callout(
    'You do not have to figure this out alone. Sentinel Enterprises helps working families and crypto holders protect what matters — in plain English, with no jargon and no pressure.',
    { title: 'We are here to help', variant: 'tip' }
  );
  g.space(6);
  g.heading('Reach Us');
  g.paragraph('Email:  sentinel@sentinelenterprisesllc.com', { font: g.bold, gap: 4 });
  g.paragraph('Phone:  (309) 643-3335', { font: g.bold, gap: 4 });
  g.paragraph('Website:  sentinelenterprisesllc.com', { font: g.bold, gap: 14 });
  g.callout(
    'Sentinel Enterprises LLC is not a law firm, financial advisor, or fiduciary. This guide is for education and consulting purposes only. For legal or tax decisions, consult a licensed professional.',
    { title: 'Important Disclaimer', variant: 'warning' }
  );
}

// ---------------------------------------------------------------------------
// Shared bootstrap
// ---------------------------------------------------------------------------
async function makeDoc(title, subtitle) {
  const doc = await PDFDocument.create();
  doc.setTitle(title);
  doc.setAuthor('Sentinel Enterprises LLC');
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const g = new Guide(doc, { regular, bold }, title, subtitle);
  return { doc, g, fonts: { regular, bold } };
}

// Standard cover intro block (headline + subhead) used by most guides.
function cover(g, headline, subhead) {
  g.newPage();
  g.space(10);
  g.paragraph(g.subtitle, { font: g.bold, color: AMBER, size: 12, gap: 18 });
  g.headline(headline);
  g.paragraph(subhead, { size: 12.5, color: SLATE, gap: 16 });
}

// ===========================================================================
// 1. CRYPTO INHERITANCE CHECKLIST
// ===========================================================================
async function buildCryptoChecklist() {
  const { doc, g, fonts } = await makeDoc(
    'Crypto Inheritance Checklist',
    'Make sure your family can actually find and inherit your crypto'
  );

  // Cover
  cover(g, "Don't Let Your Crypto Die With You",
    "This checklist walks you through exactly what to do — step by step — so your family isn't left with digital assets they can never touch.");
  g.space(6);
  g.flowBoxes(['YOU have crypto', 'You complete this checklist', 'Your family can access it safely']);
  g.space(4);
  g.callout('Set aside 30 quiet minutes, a pen, and a piece of paper. That is genuinely all you need to get started.', { variant: 'tip', title: 'Before you begin' });

  // Page 2 - What is Cryptocurrency
  g.newPage();
  g.heading('What Is Cryptocurrency? (For Beginners)');
  g.paragraph('Think of cryptocurrency like digital cash stored in a special locked box. You have a KEY (called a seed phrase or private key) that opens the box. If no one knows where the key is, the money is GONE FOREVER.', { gap: 14 });

  // Simple diagram: wallet (house) + key + family
  g.ensure(120);
  {
    const top = g.y;
    drawHouse(g.page, MARGIN + 20, top - 70, 70, 64, fonts, 'YOUR WALLET');
    drawKey(g.page, MARGIN + 170, top - 36, fonts, 'SEED PHRASE = KEY');
    drawPerson(g.page, MARGIN + 360, top - 28, fonts, 'YOUR FAMILY');
    // arrows
    g.page.drawLine({ start: { x: MARGIN + 230, y: top - 36 }, end: { x: MARGIN + 330, y: top - 36 }, thickness: 2, color: AMBER });
    g.page.drawLine({ start: { x: MARGIN + 330, y: top - 36 }, end: { x: MARGIN + 322, y: top - 31 }, thickness: 2, color: AMBER });
    g.page.drawLine({ start: { x: MARGIN + 330, y: top - 36 }, end: { x: MARGIN + 322, y: top - 41 }, thickness: 2, color: AMBER });
    g.y = top - 110;
  }
  g.caption('The key (seed phrase) unlocks your wallet. Your family needs to know where that key lives.');
  g.space(6);
  g.callout('Over $140 billion in crypto is LOST FOREVER because owners never told anyone where their keys were. Do not let your savings become part of that number.', { title: 'WARNING', variant: 'warning' });

  // Page 3 - The Checklist
  g.newPage();
  g.heading('The 12-Step Checklist');
  g.paragraph('Check off each item as you complete it. Work top to bottom — each step builds on the one before.', { color: SLATE, gap: 12 });
  const steps = [
    'Step 1: Write down your seed phrase (12 or 24 words) on paper — never on your phone or computer.',
    'Step 2: Store the seed phrase in a fireproof safe or safety deposit box.',
    'Step 3: Write down which wallets/exchanges you use (Coinbase, Ledger, MetaMask, etc.).',
    'Step 4: Write down the approximate value of each account.',
    'Step 5: Create a document called "Crypto Access Letter" (see page 4).',
    'Step 6: Tell ONE trusted person this letter exists and where it is.',
    'Step 7: DO NOT put the seed phrase in your will (wills become public).',
    'Step 8: Set up a hardware wallet for large amounts (Ledger or Tangem).',
    'Step 9: Review and update this every 6 months.',
    'Step 10: Make sure your beneficiary knows what crypto IS.',
    'Step 11: Consider a crypto-specific trust for amounts over $50,000.',
    'Step 12: Consult with an estate attorney who understands digital assets.',
  ];
  for (const s of steps) g.checkItem(s);

  // Page 4 - Crypto Access Letter
  g.newPage();
  g.heading('What to Write in Your Crypto Access Letter');
  g.paragraph('This is a simple letter you write by hand or type and print. It is NOT your will. Include each of the labeled pieces below.', { gap: 12 });
  const letterFields = [
    ['Your full name', 'So your family is certain the letter is yours.'],
    ['Today’s date', 'So they know how current the information is.'],
    ['List of wallets & exchanges', 'Every place you hold crypto, by name.'],
    ['Where seed phrases are stored', 'The safe, the box, the location — not the words themselves.'],
    ['Who to contact for help', 'A trusted helper or an attorney who understands crypto.'],
    ['Your wishes for the crypto', 'Who should receive it and any instructions you have.'],
  ];
  for (let i = 0; i < letterFields.length; i++) {
    g.numberedStep(i + 1, letterFields[i][0], letterFields[i][1]);
  }
  g.callout('Write the LOCATION of your seed phrase, never the actual words. The words belong only in your fireproof safe.', { variant: 'warning', title: 'Remember' });

  // Page 5 - Common Mistakes
  g.newPage();
  g.heading('4 Common Mistakes (And How to Avoid Them)');
  g.callout('Storing your seed phrase on your phone. Phones get hacked, lost, and broken. A photo of your seed phrase is a photo of your money.', { title: 'Mistake 1', variant: 'warning' });
  g.callout('Telling too many people. The more people who know, the higher the risk. Tell ONE trusted person — no more.', { title: 'Mistake 2', variant: 'warning' });
  g.callout('Putting the seed phrase in your will. Wills become public record in probate. Anyone could read it and drain your wallet.', { title: 'Mistake 3', variant: 'warning' });
  g.callout('Thinking the exchange will handle it. Most exchanges have no reliable inheritance process. If you do not plan, no one will.', { title: 'Mistake 4', variant: 'warning' });

  // Page 6 - Next Steps
  contactPage(g, 'You have a clear path now. Complete the 12 steps, write your access letter, and tell one trusted person. That single afternoon of work can save your family from losing everything.');

  return doc;
}

// ===========================================================================
// 2. CRYPTO INHERITANCE FILLABLE WORKBOOK
// ===========================================================================
async function buildWorkbook() {
  const { doc, g } = await makeDoc(
    'Crypto Inheritance Fillable Workbook',
    'Document everything your family needs — in one place'
  );

  // Page 1 - Cover + Instructions
  cover(g, 'Your Crypto, Written Down Safely',
    'Print this workbook and fill it in by hand. When you are done, store it somewhere safe and tell one trusted person where it is.');
  g.callout('Fill this in with a PEN. Do not save the seed phrase words here — only WHERE they are kept. Then place this workbook in your fireproof safe or safety deposit box.', { title: 'How to use this workbook', variant: 'tip' });
  g.space(4);
  g.flowBoxes(['Print it', 'Fill it in by pen', 'Store it safely', 'Tell one person']);

  // Page 2 - Section 1: My Information
  g.newPage();
  g.heading('Section 1: My Information');
  g.fillField('Full Legal Name:', { lineW: 300 });
  g.fillField('Date Completed:', { lineW: 300 });
  g.fillField('Date to Review Next:', { lineW: 300 });
  g.space(6);
  g.divider();
  g.paragraph('My Trusted Person', { font: g.bold, color: NAVY, size: 12, gap: 10 });
  g.fillField('Name:', { lineW: 320 });
  g.fillField('Phone:', { lineW: 320 });
  g.fillField('Email:', { lineW: 320 });
  g.space(6);
  g.callout('Your trusted person is the ONE individual who will know this workbook exists and where to find it.', { variant: 'tip' });

  // Page 3 - Section 2: My Crypto Wallets
  g.newPage();
  g.heading('Section 2: My Crypto Wallets');
  g.paragraph('Fill in one block for each wallet or exchange you use. Three blocks are provided.', { color: SLATE, gap: 12 });
  for (let i = 1; i <= 3; i++) {
    g.ensure(150);
    g.paragraph(`Wallet ${i}`, { font: g.bold, color: AMBER, size: 12, gap: 8 });
    g.fillField('Wallet/Exchange Name:', { lineW: 230 });
    g.fillField('Type (Hot / Cold / Exchange):', { lineW: 180 });
    g.fillField('Approximate Value:', { lineW: 250 });
    g.fillField('Where Login Info Is Stored:', { lineW: 200 });
    g.fillField('Where Seed Phrase Is Stored:', { lineW: 190 });
    if (i < 3) g.divider();
  }

  // Page 4 - Section 3: My Seed Phrases
  g.newPage();
  g.heading('Section 3: My Seed Phrases');
  g.callout('NEVER photograph or type your seed phrase. Write it only on paper, by hand.', { variant: 'warning', title: 'STOP — Read This First' });
  g.space(4);
  g.paragraph('Below, write only the LOCATION where each seed phrase is physically stored.', { gap: 12 });
  g.fillField('Wallet 1 Seed Phrase Location:', { lineW: 180 });
  g.fillField('Wallet 2 Seed Phrase Location:', { lineW: 180 });
  g.fillField('Wallet 3 Seed Phrase Location:', { lineW: 180 });
  g.space(8);
  g.callout('The LOCATION is all you need to write here — not the actual words. Example: "Fireproof safe in bedroom closet, blue envelope."', { variant: 'tip' });

  // Page 5 - Section 4: Instructions for My Family
  g.newPage();
  g.heading('Section 4: Instructions for My Family');
  g.paragraph('What I want you to do with my crypto:', { font: g.bold, color: NAVY, gap: 8 });
  g.writeLines(4);
  g.paragraph('Who to contact for help:', { font: g.bold, color: NAVY, gap: 8 });
  g.writeLines(3);
  g.paragraph('My wishes:', { font: g.bold, color: NAVY, gap: 8 });
  g.writeLines(4);

  // Page 6 - Section 5: Important Contacts
  g.newPage();
  g.heading('Section 5: Important Contacts');
  g.fillField('Attorney:', { lineW: 320 });
  g.fillField('Attorney Phone:', { lineW: 280 });
  g.fillField('Financial Advisor:', { lineW: 270 });
  g.fillField('Advisor Phone:', { lineW: 290 });
  g.space(10);
  g.divider();
  g.paragraph('Sentinel Enterprises LLC', { font: g.bold, color: NAVY, size: 12, gap: 8 });
  g.paragraph('Email:  sentinel@sentinelenterprisesllc.com', { font: g.bold, gap: 4 });
  g.paragraph('Phone:  (309) 643-3335', { font: g.bold, gap: 14 });
  g.callout('Once complete, store this workbook in a fireproof safe or safety deposit box and tell your trusted person exactly where it is.', { variant: 'success', title: 'You did it!' });

  return doc;
}

// ===========================================================================
// 3. BENEFICIARY ACCESS TEMPLATE
// ===========================================================================
async function buildBeneficiaryTemplate() {
  const { doc, g } = await makeDoc(
    'Beneficiary Access Template',
    'A ready-to-use template for passing crypto access to the people you trust'
  );

  // Page 1 - Cover
  cover(g, 'A Simple Letter That Protects Your Family',
    'Fill out the template inside, store it somewhere safe, and your loved ones will know exactly what to do.');
  g.flowBoxes(['You fill this out', 'Store it safely', 'Family finds it', 'They access your assets']);

  // Page 2 - What is this document
  g.newPage();
  g.heading('What Is This Document?');
  g.paragraph('This is a letter you fill out and store somewhere SAFE. When you pass away, your family uses this letter to access your digital assets.', { gap: 14 });
  g.flowBoxes(['You fill it out', 'Store it safely', 'Family finds it', 'They access your assets']);
  g.space(4);
  g.callout('This is NOT a legal document. It is a practical access guide. For legal protection, consult an estate attorney.', { title: 'Important', variant: 'warning' });

  // Page 3 - The Template
  g.newPage();
  g.heading('The Template: Beneficiary Access Letter');
  g.paragraph('Copy this onto paper or print and fill it in. Keep the language exactly as you wish.', { color: SLATE, gap: 12 });
  g.fillField('Date:', { lineW: 200 });
  g.fillField('From (your name):', { lineW: 250 });
  g.fillField('To (beneficiary name):', { lineW: 230 });
  g.space(4);
  g.callout('"If you are reading this, I have passed away or become incapacitated. Here is everything you need to access my digital assets."', { variant: 'tip' });
  g.space(2);
  g.paragraph('My Digital Assets', { font: g.bold, color: NAVY, size: 12, gap: 10 });
  g.fillField('Asset 1:', { lineW: 150 });
  g.fillField('Approx Value:', { lineW: 160 });
  g.fillField('Asset 2:', { lineW: 150 });
  g.fillField('Approx Value:', { lineW: 160 });
  g.space(2);
  g.paragraph('Where to Find My Seed Phrases', { font: g.bold, color: NAVY, size: 12, gap: 10 });
  g.writeLines(2);
  g.paragraph('Who Can Help You', { font: g.bold, color: NAVY, size: 12, gap: 10 });
  g.fillField('Name:', { lineW: 180 });
  g.fillField('Phone:', { lineW: 180 });
  g.space(4);
  g.fillField('Signed:', { lineW: 200 });
  g.fillField('Date:', { lineW: 200 });

  // Page 4 - Step by step for beneficiary
  g.newPage();
  g.heading('Step-by-Step: What Your Beneficiary Should Do');
  g.numberedStep(1, 'Find this letter', 'It will be in the safe place the owner told you about.');
  g.numberedStep(2, 'Do NOT panic', 'Everything you need is written down. Take a breath.');
  g.numberedStep(3, 'Contact the helper listed above', 'They can guide you through accessing the wallets safely.');
  g.numberedStep(4, 'Do NOT post about it online', 'Never share account details or seed phrases with anyone online.');
  g.numberedStep(5, 'Take your time', 'Crypto does not expire. Move carefully and double-check every step.');

  // Page 5 - Security tips
  g.newPage();
  g.heading('Security Tips for Storing This Letter');
  g.paragraph('Pick ONE secure location and make sure your trusted person knows where it is.', { color: SLATE, gap: 12 });
  g.callout('A fireproof, waterproof home safe bolted down or hidden. Affordable and always accessible to you.', { title: 'Option 1: Fireproof Safe', variant: 'tip' });
  g.callout('A bank safety deposit box. Very secure, but your beneficiary will need legal access after you pass.', { title: 'Option 2: Safety Deposit Box', variant: 'tip' });
  g.callout('With your estate attorney, alongside your will and other documents. Professional and organized.', { title: 'Option 3: With Your Attorney', variant: 'tip' });
  g.callout('Never store this letter and your seed phrase words in the same place as your everyday devices or email.', { variant: 'warning', title: 'Avoid' });

  // Page 6 - Contact
  contactPage(g, 'Fill out the template, choose a safe storage spot, and tell one trusted person. That is all it takes to give your family peace of mind.');

  return doc;
}

// ===========================================================================
// 4. CAREGIVER TAX SAVINGS GUIDE
// ===========================================================================
async function buildCaregiverTaxGuide() {
  const { doc, g } = await makeDoc(
    'Caregiver Tax Savings Guide',
    'The deductions, credits, and filing strategies most family caregivers miss'
  );

  // Page 1 - Cover
  cover(g, 'Stop Leaving Caregiver Tax Money on the Table',
    'If you help care for a family member, the tax code likely owes you more than you think. This guide shows you what to claim — in plain English.');
  g.callout('The average family caregiver misses $3,000 – $8,000 in tax savings every single year. This guide helps you claim what is rightfully yours.', { title: 'Did you know?', variant: 'warning' });

  // Page 2 - Quiz
  g.newPage();
  g.heading('Are You a Caregiver? (Quick Quiz)');
  g.paragraph('Check every box that applies to you:', { color: SLATE, gap: 12 });
  const quiz = [
    'Do you help a parent, spouse, or family member with daily activities?',
    'Do you pay for any of their medical bills?',
    'Do they live with you?',
    'Do you pay for their prescriptions?',
    'Have you taken time off work to care for them?',
    'Do you pay for their home care or adult day services?',
    'Are they claimed on your tax return?',
    'Do you pay for transportation to medical appointments?',
  ];
  for (const q of quiz) g.checkItem(q);
  g.space(4);
  g.callout('If you checked 3 or more boxes, you likely qualify for significant tax benefits. Keep reading.', { variant: 'success', title: 'Your Result' });

  // Page 3 - The 5 biggest deductions
  g.newPage();
  g.heading('The 5 Biggest Deductions');
  g.numberedStep(1, 'Medical Expense Deduction', 'You can deduct medical expenses that go over 7.5% of your income.');
  g.numberedStep(2, 'Dependent Care Credit', 'Worth up to $3,000 for one dependent, or $6,000 for two.');
  g.numberedStep(3, 'Head of Household Filing Status', 'Can save you $1,000 – $3,000 in taxes versus filing single.');
  g.numberedStep(4, 'Medical Mileage Deduction', 'About 21 cents per mile for medical trips (2024 rate).');
  g.numberedStep(5, 'Long-Term Care Insurance Deduction', 'Premiums are deductible up to IRS age-based limits.');

  // Page 4 - Plain english explanations
  g.newPage();
  g.heading('Each Deduction, Explained Simply');
  g.callout('What it is: A deduction for big medical bills. Who qualifies: Anyone whose medical costs top 7.5% of income. Save: Often hundreds to thousands of dollars.', { title: 'Medical Expense Deduction', variant: 'tip' });
  g.callout('What it is: A credit for care costs so you can work. Who qualifies: Caregivers paying for a dependent’s care. Save: Up to $3,000–$6,000.', { title: 'Dependent Care Credit', variant: 'tip' });
  g.callout('What it is: A better filing status. Who qualifies: Unmarried caregivers supporting a dependent. Save: $1,000–$3,000.', { title: 'Head of Household', variant: 'tip' });
  g.callout('What it is: Money back for driving to care. Example: If you drove 500 miles to medical appointments, that is $105 back in your pocket.', { title: 'Medical Mileage', variant: 'tip' });

  // Page 5 - 3 filing mistakes
  g.newPage();
  g.heading('3 Filing Mistakes Caregivers Make');
  g.callout('Not keeping receipts. Without records, you cannot prove your deductions. Start a simple folder or envelope today.', { title: 'Mistake 1', variant: 'warning' });
  g.callout('Forgetting the mileage log. Every medical trip counts. A small notebook in your car pays for itself many times over.', { title: 'Mistake 2', variant: 'warning' });
  g.callout('Not claiming your family member as a dependent when you qualify. This unlocks several credits at once.', { title: 'Mistake 3', variant: 'warning' });

  // Page 6 - What to do now
  g.newPage();
  g.heading('What To Do Right Now');
  g.numberedStep(1, 'Start a receipt folder', 'Physical or digital — just keep them all in one place.');
  g.numberedStep(2, 'Begin a mileage log', 'Note the date, destination, and miles for every medical trip.');
  g.numberedStep(3, 'List who you support', 'Write down each family member you help and how.');
  g.numberedStep(4, 'Talk to a tax preparer', 'Bring this guide and ask about every deduction listed.');
  g.space(2);
  g.divider();
  g.paragraph('Questions? We are happy to point you in the right direction.', { gap: 8 });
  g.paragraph('Email:  sentinel@sentinelenterprisesllc.com', { font: g.bold, gap: 4 });
  g.paragraph('Phone:  (309) 643-3335', { font: g.bold, gap: 12 });
  g.callout('Sentinel Enterprises LLC is not a tax advisor or fiduciary. This guide is for education only. Confirm all deductions with a licensed tax professional.', { variant: 'warning', title: 'Important Disclaimer' });

  return doc;
}

// ===========================================================================
// 5. CAREGIVER DEDUCTION CHECKLIST
// ===========================================================================
async function buildCaregiverChecklist() {
  const { doc, g } = await makeDoc(
    'Caregiver Deduction Checklist',
    'Never leave a caregiver tax deduction on the table again'
  );

  // Page 1 - Cover
  cover(g, 'Your Complete Caregiver Deduction Checklist',
    'A simple, check-the-box system so you walk into tax season with every dollar of deductions ready to claim.');
  g.flowBoxes(['Gather documents', 'Check each box', 'Bring to tax preparer', 'Save money']);

  // Page 2 - How to use
  g.newPage();
  g.heading('How to Use This Checklist');
  g.callout('Print this checklist. As you collect each document and confirm each deduction, check the box. Bring the finished checklist to your tax preparer.', { title: 'Three easy steps', variant: 'tip' });
  g.space(4);
  g.flowBoxes(['Gather documents', 'Check each box', 'Bring to tax preparer', 'Save money']);
  g.space(4);
  g.paragraph('The goal is simple: by the time you sit down to file, nothing is forgotten and nothing is left unclaimed.', { color: SLATE });

  // Page 3 - Documents to gather
  g.newPage();
  g.heading('Before Tax Season: Documents to Gather');
  const docs = [
    'All medical receipts and bills',
    'Prescription records',
    'Mileage log for medical trips',
    'Records of any home modifications (ramps, grab bars, etc.)',
    'Adult day care or in-home care payment records',
    'Long-term care insurance premium statements',
    'Any Social Security or disability income received by your dependent',
    'Records of any family leave taken',
  ];
  for (const d of docs) g.checkItem(d);

  // Page 4 - Full deduction checklist
  g.newPage();
  g.heading('The Full Deduction Checklist');
  g.paragraph('Confirm each deduction with your preparer. Check the ones that apply to you.', { color: SLATE, gap: 12 });
  const deductions = [
    'Medical expenses over 7.5% AGI threshold',
    'Prescription medications',
    'Doctor and specialist visits',
    'Hospital stays',
    'Medical equipment (wheelchair, walker, etc.)',
    'Home modifications for medical purposes',
    'In-home nursing or aide costs',
    'Adult day care center costs',
    'Medical transportation (mileage or Uber/Lyft)',
    'Health insurance premiums',
    'Dental and vision care',
    'Mental health treatment',
    'Long-term care insurance premiums',
    'Dependent care FSA contributions',
    'Caregiver-specific tax credits',
    'State-specific caregiver credits (varies by state)',
  ];
  for (const d of deductions) g.checkItem(d);

  // Page 5 - Questions for tax preparer
  g.newPage();
  g.heading('Questions to Ask Your Tax Preparer');
  g.paragraph('Write the answer beside each question during your appointment.', { color: SLATE, gap: 12 });
  const questions = [
    'Can I claim my family member as a dependent?',
    'Do I qualify for Head of Household status?',
    'Which of my medical expenses are deductible?',
    'Does my state offer a caregiver tax credit?',
    'Should I be using a Dependent Care FSA?',
  ];
  for (let i = 0; i < questions.length; i++) {
    g.numberedStep(i + 1, questions[i], '');
    g.writeLines(1);
  }

  // Page 6 - Contact
  contactPage(g, 'With this checklist in hand, you are ready for tax season — organized, confident, and not leaving a single deduction behind.');

  return doc;
}

// ===========================================================================
// 6. ASSET PROTECTION STARTER GUIDE
// ===========================================================================
async function buildAssetProtection() {
  const { doc, g, fonts } = await makeDoc(
    'Asset Protection Starter Guide',
    'Practical first steps to shield what you have built'
  );

  // Page 1 - Cover
  cover(g, "You Don't Have to Be a Millionaire to Protect Like One",
    'Asset protection is for anyone who owns a home, a car, a business, or savings. Here is how to start.');
  g.callout('Most people think asset protection is only for the wealthy. The truth is the opposite — those with the least to lose often need it most.', { variant: 'tip' });

  // Page 2 - What is asset protection
  g.newPage();
  g.heading('What Is Asset Protection? (Plain English)');
  g.paragraph('Asset protection means putting legal walls around what you own so that if something goes wrong — a lawsuit, a divorce, a creditor — they cannot easily take it.', { gap: 14 });

  // Shield diagram with threats arrowing in
  g.ensure(180);
  {
    const top = g.y;
    const sx = MARGIN + 150, sy = top - 150, sw = 130, sh = 150;
    drawShield(g, sx, sy, sw, sh);
    // threats outside arrowing in
    const threatL = ['LAWSUITS', 'CREDITORS'];
    g.page.drawText(threatL[0], { x: MARGIN, y: top - 50, size: 9, font: fonts.bold, color: RED });
    g.page.drawText(threatL[1], { x: MARGIN, y: top - 110, size: 9, font: fonts.bold, color: RED });
    g.page.drawLine({ start: { x: MARGIN + 60, y: top - 47 }, end: { x: sx - 6, y: top - 70 }, thickness: 2, color: RED });
    g.page.drawLine({ start: { x: MARGIN + 60, y: top - 107 }, end: { x: sx - 6, y: top - 95 }, thickness: 2, color: RED });
    // right side threats
    g.page.drawText('DIVORCE', { x: PAGE_W - MARGIN - 56, y: top - 50, size: 9, font: fonts.bold, color: RED });
    g.page.drawText('DEBT', { x: PAGE_W - MARGIN - 40, y: top - 110, size: 9, font: fonts.bold, color: RED });
    g.page.drawLine({ start: { x: PAGE_W - MARGIN - 62, y: top - 47 }, end: { x: sx + sw + 6, y: top - 70 }, thickness: 2, color: RED });
    g.page.drawLine({ start: { x: PAGE_W - MARGIN - 46, y: top - 107 }, end: { x: sx + sw + 6, y: top - 95 }, thickness: 2, color: RED });
    g.y = top - 170;
  }
  g.caption('Your shield (insurance, titling, LLCs, trusts) keeps threats from reaching what you own.');
  g.space(4);
  g.callout('What can threaten your assets? Car accidents, business disputes, medical debt, divorce, and contractor lawsuits — everyday risks for ordinary families.', { variant: 'warning', title: 'Real-world threats' });

  // Page 3 - 5 levels of protection
  g.newPage();
  g.heading('The 5 Levels of Protection');
  g.numberedStep(1, 'Proper Insurance', 'Umbrella policies and adequate liability coverage. Costs about $200–$500/year and is your first line of defense.');
  g.numberedStep(2, 'Correct Titling', 'How you legally own things matters (joint tenancy vs. tenancy by the entirety). The right title adds protection at no cost.');
  g.numberedStep(3, 'LLC for Business Owners', 'Separates your personal assets from your business liability so one cannot sink the other.');
  g.numberedStep(4, 'Homestead Exemption', 'In many states, your primary home is partially or fully protected from creditors.');
  g.numberedStep(5, 'Trust', 'For larger estates, a properly drafted trust provides the strongest protection and avoids probate.');

  // Page 4 - Trust explained
  g.newPage();
  g.heading('The Trust, Explained Simply');
  g.paragraph('A trust is like a legal box. You put your stuff in the box. The box has rules about who gets what and when. Because the box owns the stuff — not you personally — it is harder for creditors to touch.', { gap: 16 });
  g.flowBoxes(['YOU', 'TRUST (the box)', 'BENEFICIARIES (your family)']);
  g.space(6);
  g.paragraph('Common Types of Trusts', { font: g.bold, color: NAVY, size: 12, gap: 10 });
  g.callout('Revocable Living Trust: You keep control and can change it anytime. Great for avoiding probate.', { variant: 'tip' });
  g.callout('Irrevocable Trust: You give up control, but gain the strongest protection from creditors.', { variant: 'tip' });
  g.callout('Medicaid Asset Protection Trust: Helps protect your home and savings from long-term care costs.', { variant: 'tip' });

  // Page 5 - first 5 action steps
  g.newPage();
  g.heading('Your First 5 Action Steps');
  g.numberedStep(1, 'Take inventory of everything you own', 'Home, vehicles, accounts, business, valuables — write it all down.');
  g.numberedStep(2, 'Review your insurance coverage', 'Make sure your liability limits actually match what you own.');
  g.numberedStep(3, 'Check how your home and car are titled', 'The names on the title decide who is protected.');
  g.numberedStep(4, 'Talk to an estate attorney', 'We can connect you with someone who fits your situation.');
  g.numberedStep(5, 'Set a calendar reminder to review annually', 'Your life changes — your protection plan should too.');

  // Page 6 - Contact
  contactPage(g, 'Protecting what you have built does not require a fortune — just a plan and the first step. We can help connect you with the right professionals.');

  return doc;
}

// ===========================================================================
// 7. TRUST & TITLING STARTER CHECKLIST
// ===========================================================================
async function buildTrustTitling() {
  const { doc, g, fonts } = await makeDoc(
    'Trust & Titling Starter Checklist',
    'Title accounts and assets correctly so your protection plan actually holds up'
  );

  // Page 1 - Cover
  cover(g, 'The Wrong Name on the Wrong Document Can Cost Your Family Everything',
    'Creating a trust is only half the job. This checklist makes sure your assets are actually titled the right way.');
  g.callout('A trust with nothing properly titled into it is just an expensive stack of paper. Titling is where the real protection happens.', { variant: 'warning', title: 'The big idea' });

  // Page 2 - Why titling matters
  g.newPage();
  g.heading('Why Titling Matters (Plain English)');
  g.paragraph('Titling means: whose name is on the legal ownership document. If you have a trust but your bank account is not IN the trust, the trust does not protect that account.', { gap: 16 });

  // Two-column WRONG vs RIGHT diagram
  g.ensure(140);
  {
    const top = g.y;
    const colW = (CONTENT_W - 20) / 2;
    const colH = 120;
    // wrong column
    g.page.drawRectangle({ x: MARGIN, y: top - colH, width: colW, height: colH, color: REDBG, borderColor: RED, borderWidth: 1.5 });
    g.page.drawText('NO  -  WRONG', { x: MARGIN + 14, y: top - 22, size: 12, font: fonts.bold, color: RED });
    g.page.drawText('Assets OUTSIDE the trust', { x: MARGIN + 14, y: top - 42, size: 9.5, font: fonts.regular, color: DARK });
    ['Home in your name', 'Bank in your name', 'Trust sits empty'].forEach((t, i) => {
      g.page.drawText('• ' + t, { x: MARGIN + 14, y: top - 64 - i * 16, size: 9.5, font: fonts.regular, color: DARK });
    });
    // right column
    const rx = MARGIN + colW + 20;
    g.page.drawRectangle({ x: rx, y: top - colH, width: colW, height: colH, color: rgb(0xf0/255,0xfd/255,0xf4/255), borderColor: GREEN, borderWidth: 1.5 });
    g.page.drawText('YES  -  RIGHT', { x: rx + 14, y: top - 22, size: 12, font: fonts.bold, color: GREEN });
    g.page.drawText('Assets INSIDE the trust', { x: rx + 14, y: top - 42, size: 9.5, font: fonts.regular, color: DARK });
    ['Home in trust name', 'Bank in trust name', 'Trust is funded'].forEach((t, i) => {
      g.page.drawText('• ' + t, { x: rx + 14, y: top - 64 - i * 16, size: 9.5, font: fonts.regular, color: DARK });
    });
    g.y = top - colH - 18;
  }
  g.callout('Most people create a trust but forget to fund it. An unfunded trust protects NOTHING.', { variant: 'warning', title: 'The #1 mistake' });

  // Page 3 - Types of ownership
  g.newPage();
  g.heading('Types of Ownership (Explained Simply)');
  g.callout('Only your name. When you die, it goes through probate court — slow, public, and costly.', { title: 'Sole Ownership', variant: 'tip' });
  g.callout('Two or more people. When one dies, the other automatically gets it — no probate.', { title: 'Joint Tenancy', variant: 'tip' });
  g.callout('Two or more people, but each share goes to that person’s own heirs separately.', { title: 'Tenancy in Common', variant: 'tip' });
  g.callout('For married couples in certain states. Each spouse owns half.', { title: 'Community Property', variant: 'tip' });
  g.callout('The trust owns it. Strongest protection and avoids probate entirely.', { title: 'Trust Ownership', variant: 'success' });

  // Page 4 - The checklist
  g.newPage();
  g.heading('The Checklist: Assets to Review');
  const groups = [
    ['REAL ESTATE', ['Primary home — how is it titled?', 'Vacation property or rental property', 'Land or undeveloped property']],
    ['FINANCIAL ACCOUNTS', ['Checking accounts', 'Savings accounts', 'Investment/brokerage accounts', 'CDs or money market accounts']],
    ['RETIREMENT ACCOUNTS', ['IRA — beneficiary designation on file?', '401(k) — beneficiary designation on file?']],
    ['VEHICLES', ['Cars — name on title', 'Boats, RVs, motorcycles']],
    ['LIFE INSURANCE', ['Beneficiary designation current?', 'Is the trust named as contingent beneficiary?']],
    ['BUSINESS INTERESTS', ['LLC membership interest transferred to trust?', 'Business succession plan in place?']],
    ['DIGITAL ASSETS', ['Crypto — see Crypto Inheritance Checklist', 'Online accounts with significant value']],
  ];
  for (const [label, items] of groups) {
    g.ensure(40);
    g.paragraph(label, { font: g.bold, color: AMBER, size: 11, gap: 8 });
    for (const it of items) g.checkItem(it);
    g.space(2);
  }
  g.callout('Retirement accounts pass by beneficiary designation, NOT through a trust. Keep those designations current.', { variant: 'warning', title: 'Special rule' });

  // Page 5 - 3 steps to fund your trust
  g.newPage();
  g.heading('3 Steps to Fund Your Trust');
  g.numberedStep(1, 'Get a copy of your trust document', 'You will need the exact legal name of the trust and its date.');
  g.numberedStep(2, 'Contact each institution to retitle', 'Call your bank, DMV, and brokerage to change ownership into the trust’s name.');
  g.numberedStep(3, 'Verify each transfer in writing', 'Get written confirmation that each asset is now titled in the trust.');
  g.space(4);
  g.flowBoxes(['Get trust document', 'Retitle each asset', 'Verify in writing']);
  g.space(4);
  g.callout('Keep a simple list of every asset and check it off as each one is retitled. That list is proof your trust is truly funded.', { variant: 'success', title: 'Stay organized' });

  // Page 6 - Contact
  contactPage(g, 'A funded trust is a working trust. Walk through this checklist, retitle each asset, and your protection plan will actually hold up when it matters.');

  return doc;
}

// ---------------------------------------------------------------------------
// Run all
// ---------------------------------------------------------------------------
const TARGETS = [
  ['crypto-inheritance-checklist.pdf', buildCryptoChecklist],
  ['your-purchased-workbook.pdf', buildWorkbook],
  ['beneficiary-access-template.pdf', buildBeneficiaryTemplate],
  ['caregiver-tax-guide.pdf', buildCaregiverTaxGuide],
  ['caregiver-deduction-checklist.pdf', buildCaregiverChecklist],
  ['asset-protection-guide.pdf', buildAssetProtection],
  ['trust-titling-checklist.pdf', buildTrustTitling],
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const [filename, build] of TARGETS) {
    const doc = await build();
    const bytes = await doc.save();
    const path = join(OUT_DIR, filename);
    await writeFile(path, bytes);
    console.log(`✓ ${filename}  (${doc.getPageCount()} pages, ${(bytes.length / 1024).toFixed(1)} KB)`);
  }
  console.log('\nAll 7 PDFs generated into public/downloads/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
