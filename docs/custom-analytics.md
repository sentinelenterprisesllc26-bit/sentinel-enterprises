# Custom analytics reference

Sentinel's Netlify site reuses the existing Google Analytics 4 installation in
`src/routes/__root.tsx` (`G-Q6SKVDVTMJ`). The site does not add another
provider, measurement ID, proxy, or pageview implementation. Google Analytics
continues to collect automatic pageviews; the custom code only records the
allowlisted interactions and confirmed form outcomes below.

## Events and properties

All property values are short, low-cardinality identifiers. The tracker never
receives names, email addresses, message text, payment or checkout session IDs,
full referral URLs, or arbitrary query-string values.

### Offers and referral links

| Event | Properties | Meaning |
| --- | --- | --- |
| `product_checkout_click` | `product_id`, `placement` | A visitor activated a product checkout link or button. This is a click, not a purchase or earned revenue. |
| `service_checkout_click` | `service_id`, `placement` | A visitor activated a PayPal service-payment CTA. This is a click, not a completed payment or collected revenue. |
| `affiliate_link_click` | `partner`, `placement` | A visitor activated an allowlisted affiliate/referral link. It does not prove a signup, purchase, or commission. |
| `three_link_click` | `action`, `featured_product_id` (optional), `placement` | A visitor activated a Three shop, opportunity, or enrollment link. It does not prove a purchase or ambassador enrollment. |

`product_id` values are `crypto-inheritance-bundle`,
`asset-protection-guide`, `complete-bundle`,
`crypto-inheritance-masterclass`, and `crypto-mastery`.

`service_id` values are `asset_protection`, `digital_asset_guidance`, and
`general_consultation`. Service placements identify the two service-detail CTAs
or the general “Ready to Get Started?” CTA.

`partner` values are `itrustcapital`, `ellipal`, `uphold`, `tangem`, `ledger`,
`caleb_brown`. Three `action` values are `shop`, `opportunity`, and `enroll`;
`featured_product_id` is one of
`vitalite`, `visage`, or `kynetik`.

### Content and resources

| Event | Properties | Meaning |
| --- | --- | --- |
| `social_link_click` | `platform`, `placement` | An outbound YouTube, TikTok, or Facebook link was activated. |
| `video_link_click` | `video_id`, `placement` | A specific companion-video link was activated. Embedded player playback is not claimed by this event. |
| `resource_download_click` | `resource`, `placement` | A direct resource link or purchased delivery link was activated. Email-gated CTAs are intentionally not counted here because they lead to a form rather than a download; the later successful form response is tracked by `lead_form_success`. The event does not guarantee file delivery. |

Resource identifiers include `crypto_inheritance_checklist`,
`crypto_inheritance_workbook`, `beneficiary_access_template`,
`asset_protection_guide`, `trust_titling_checklist`, `xrp_essentials_guide`,
`xrp_ripple_book`, `ellipal_setup_guide`, `tangem_beginners_guide`, and
`crypto_mastery_ebook`.

### Forms

| Event | Properties | Meaning |
| --- | --- | --- |
| `lead_form_success` | `form_name`, `placement` | Netlify returned an HTTP success response for a lead/notification form. It is emitted once for an accepted submission and never on a network error or non-2xx response. |
| `contact_form_success` | `placement` | Netlify returned an HTTP success response for the contact form. It is emitted once for an accepted submission and never on a network error or non-2xx response. |

The lead `form_name` values are `caregiver_checklist`, `crypto_checklist`,
`crypto_security_checklist`, and `sentinel_squad_notify`. Form inputs remain
available after a failed request so visitors can retry; a submit-in-progress
guard prevents duplicate requests.

## Owner verification

1. Deploy or republish the Netlify site containing these changes. Do not
   interpret local development as production collection.
2. Before testing, enable debug mode in a dedicated test browser. The
   [Google Analytics Debugger browser extension](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   is one option; use a test browser/profile so ordinary visitors are not
   affected. In GA4, open **Admin → Data display → DebugView** for the
   property associated with measurement ID `G-Q6SKVDVTMJ`. DebugView is
   meaningful for events sent in debug mode; an ordinary browser dispatch alone
   is not an account-arrival check.
3. In that debug-enabled browser with analytics allowed, activate a
   representative product/service checkout, affiliate link, social/video link,
   and direct resource link. Submit a form only with test data in a
   non-production review window. Confirm the event names and property values in
   DebugView.
4. Register event parameters before relying on them in standard reports or
   Explorations: **Admin → Data display → Custom definitions → Create custom
   dimension**, choose **Event** scope, and add each parameter name exactly as
   sent (`product_id`, `service_id`, `partner`, `action`,
   `featured_product_id`, `platform`, `video_id`, `resource`, `form_name`, and
   `placement`). DebugView can display an unregistered parameter, but GA4
   reporting does not automatically expose it as a dimension. Allow processing
   time after registration; historical events are not backfilled.
5. Check the **Events** report later for normal traffic. GA4 processing,
   consent, and thresholds can delay or suppress reports.
6. Repeat with the browser's analytics opt-out / Do Not Track setting if
   needed. The shared helper skips dispatch when the existing GA disable flag
   is set or `navigator.doNotTrack` is `1`. A blocked script is also a safe
   no-op.

There are two different checks:

- **Browser-dispatch check:** the deployed page had a callable `window.gtag`
  and invoked it with the allowlisted event. Local smoke tests and a browser
  spy can verify this, but they do not prove collection.
- **GA4 account-arrival check:** the event appears in the owner's DebugView
  from the deployed site and debug-enabled test browser. Only this account-side
  check verifies that GA4 received the event. This implementation cannot make
  that claim before deployment and owner verification.

These events are engagement signals only:
they are not purchases, revenue, affiliate commissions, file delivery,
enrollment, or lead quality guarantees.

Useful owner questions after data is available:

- Which placement produces the most `product_checkout_click` activity without
  being mistaken for completed purchases?
- Which `partner` and page placement receive referral clicks, and do the
  resulting site sessions show useful engagement?
- Which `lead_form_success` form and placement has the strongest pageview-to-
  submission path?