#!/usr/bin/env node
/**
 * Parity checks for the generated campaign destinations.
 *
 * Run from the repository root:
 *   node deliverables/sentinel-campaign/source/test_campaign_links.mjs
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const campaignDir = path.resolve(here, "..");
const base = "https://sentinelenterprisesllc.com/downloads";
const html = fs.readFileSync(path.join(campaignDir, "14-day-campaign.html"), "utf8");
const markdown = fs.readFileSync(path.join(campaignDir, "14-day-campaign.md"), "utf8");
const csvLines = fs.readFileSync(path.join(campaignDir, "campaign-links.csv"), "utf8").trim().split(/\r?\n/);

function fail(message) {
  throw new Error(`Campaign parity failure: ${message}`);
}

assert.equal(csvLines.length - 1, 42, "CSV must contain exactly 42 data rows");
const rows = csvLines.slice(1).map((line) => {
  const columns = line.split(",");
  assert.equal(columns.length, 8, `Unexpected CSV column count: ${line}`);
  const [day, platform, content, utmSource, utmMedium, utmCampaign, destination] = columns;
  return { day: Number(day), platform, content, utmSource, utmMedium, utmCampaign, destination };
});

function expectedUrl(row) {
  return `${base}?utm_source=${row.utmSource}&utm_medium=${row.utmMedium}&utm_campaign=${row.utmCampaign}&utm_content=${row.content}`;
}

for (const row of rows) {
  assert.equal(row.destination, expectedUrl(row), `CSV URL is not canonical for ${row.content}/${row.platform}`);
  assert.match(row.destination, /^https:\/\/sentinelenterprisesllc\.com\/downloads\?/);
}

// Execute the same inline renderer used by the review HTML. This captures the
// actual 14 Facebook anchors rather than comparing only URL-shaped fragments.
const script = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(script, "Could not find the inline campaign renderer");
const rendered = { index: "", posts: "" };
const documentMock = {
  getElementById(id) {
    return {
      insertAdjacentHTML(_position, value) {
        rendered[id] += value;
      },
    };
  },
};
vm.runInNewContext(script, { document: documentMock });

const facebookRendered = [...rendered.posts.matchAll(/<a href="(https:\/\/sentinelenterprisesllc\.com\/downloads\?[^"]+)">Direct destination<\/a>/g)].map((match) => match[1]);
const facebookCsv = rows.filter((row) => row.platform === "facebook").map(expectedUrl);
assert.equal(facebookRendered.length, 14, "Generated HTML must render 14 Facebook destination anchors");
assert.deepEqual(facebookRendered, facebookCsv, "Generated HTML Facebook URLs must exactly equal the CSV Facebook URLs in order");

const rawIds = [...script.matchAll(/\{id:"(d\d+_[a-z0-9_]+)"/g)].map((match) => match[1]);
assert.equal(rawIds.length, 14, "Inline renderer must define 14 posts");
const normalizedIds = rawIds.map((id) => id.replace(/^d(\d+)_/, (_match, number) => `d${number.padStart(2, "0")}_`));
assert.match(script, /number\.padStart\(2,\s*["']0["']\)/, "HTML must normalize day numbers with padStart(2, 0)");

// The rendered HTML has clickable Facebook links only. This helper expands the
// same normalized generated day IDs across all three platforms and checks all
// 42 CSV destinations exactly; YouTube/TikTok captions intentionally show a
// readable address/profile instruction rather than claiming a clickable URL.
const generatedAll42 = normalizedIds.flatMap((content) =>
  ["youtube", "tiktok", "facebook"].map((platform) => `${base}?utm_source=${platform}&utm_medium=organic_social&utm_campaign=crypto_inheritance_14d&utm_content=${content}`),
);
assert.deepEqual(generatedAll42, rows.map(expectedUrl), "All 42 generated platform URLs must exactly equal CSV order");

// Markdown parity: every day has all three platform captions, and each
// platform's source/content is represented in the appropriate way.
const daySections = markdown.split(/^### Day /m).slice(1);
assert.equal(daySections.length, 14, "Markdown must contain 14 day sections");
for (const row of rows) {
  const section = daySections[row.day - 1];
  assert.ok(section, `Missing Markdown section for day ${row.day}`);
  const captionLabel = row.platform === "youtube" ? "**YouTube Shorts caption:**" : row.platform === "tiktok" ? "**TikTok caption:**" : "**Facebook caption:**";
  assert.ok(section.includes(captionLabel), `Missing ${row.platform} caption for day ${row.day}`);
  assert.ok(section.includes("Browse free crypto inheritance and wallet-security resources"), `Neutral CTA missing for ${row.platform} day ${row.day}`);
  if (row.platform === "facebook") {
    assert.ok(section.includes(expectedUrl(row)), `Markdown Facebook URL does not match CSV for ${row.content}`);
  } else {
    const handle = row.platform === "youtube" ? "@JenaeSentinel" : "@jenae.wiley";
    assert.ok(section.includes(`${handle} channel profile if its website link is available`), `Markdown profile caveat missing for ${row.platform} day ${row.day}`);
    assert.ok(section.includes(base), `Markdown readable first-party address missing for ${row.platform} day ${row.day}`);
  }
}

console.log("Campaign link parity OK: 42 CSV URLs, 14 generated HTML Facebook anchors, and 42 generated platform URLs match.");