# Sentinel campaign weekly review

Use this after Day 7 and Day 14. It is a review guide, not a posting instruction. Record observations from real analytics and transaction records; do not infer sales from clicks.

## Review checkpoints

- **Day 7:** Review Days 1–7, the active profile website-link UTM, and the first-week resource experience.
- **Day 14:** Review Days 8–14, compare the second week with the first, and document what should be kept, revised, or held.
- Record the review date, reviewer, active bio-link destination, and any rotation date. YouTube Shorts and TikTok older videos may retain a prior profile-link destination, so their attribution is limited after a bio rotation.

## Existing GA4 taxonomy

Use the existing event names and dimensions rather than inventing conversion events:

| Existing event | Relevant dimensions | What it tells you |
|---|---|---|
| `resource_download_click` | `resource`, `placement` | A resource interaction was recorded. |
| `lead_form_success` | `form_name`, `placement` | A form actually reported success. |
| `product_checkout_click` | `product_id`, `placement` | A checkout click occurred, not a payment. |
| `affiliate_link_click` | `partner`, `placement` | A disclosed affiliate link was clicked. |
| `social_link_click` | `platform`, `placement` | Social navigation occurred. |
| `video_link_click` | `video_id`, `placement` | A tracked video link was selected. |

Keep the UTM dimensions consistent:

- `utm_source`: `youtube`, `tiktok`, or `facebook`
- `utm_medium`: `organic_social`
- `utm_campaign`: `crypto_inheritance_14d`
- `utm_content`: `d01_inventory` through `d14_review`

## Questions for each checkpoint

1. Which day and platform produced qualified resource engagement, measured by an actual relevant event rather than a guess?
2. Did the destination load and present the intended free resources without implying email delivery or promising an unconfirmed file?
3. Were captions plain-English, educational, and limited to one CTA?
4. Did any post invite a seed phrase, private key, password, PIN, or full-wallet screenshot? If yes, hold and correct it before any use.
5. Did any post make a legal, tax, financial, income, personal-experience, or statistical claim that needs removal?
6. Did the profile website-link destination or its UTM change? Record the exact old and new values and the time of change.
7. Are comments, messages, or support questions surfacing a recurring education gap? Summarize themes without copying sensitive information.

## Measurement boundaries

- Count reach, views, profile visits, clicks, resource interactions, and qualified engagement as separate measures.
- Reconcile orders, payment status, refunds, and commissions from the real sales/payment records separately from GA4.
- An order is not a click. A click is not a payment. A static thank-you page is not proof of a completed payment.
- Do not fabricate conversion rates, sales, revenue, commissions, or “typical” outcomes. Write “not available” when the evidence is not available.
- If a brand or affiliate link is introduced later, verify the disclosure and use the existing `affiliate_link_click` taxonomy only for the actual disclosed link.

## Paid offer gate — keep on HOLD

Do not switch to paid promotion until the owner independently confirms:

- exact bundle contents and current approved price;
- every promised file exists and is the intended version;
- checkout, payment confirmation, and fulfillment work in a controlled test;
- support, refund, failed-delivery, and access instructions are real;
- offer and disclosure language has been approved;
- no post promises unverified contents, email delivery, instant access, income, or a result.

When approved, update one CTA at a time, use only the owner-approved checkout URL, preserve the source/medium/campaign dimensions, and re-review the full post. Until that documented gate is passed, every post remains a free-resource education post pointing to `/downloads`.