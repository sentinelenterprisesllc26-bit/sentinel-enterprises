# Sentinel cash-flow worksheet

Generated output: `deliverables/sentinel-campaign/cash-flow-worksheet.xlsx`

## What is included

- **Daily Inputs** — fourteen blank daily rows for source-backed actuals:
  date, website visitors, checkout clicks, paid orders from sales records,
  gross product sales excluding sales taxes, earned affiliate commissions,
  affiliate cash paid, refunds issued, processor fees, advertising and other
  expenses recorded for the activity/accrual view, advertising cash paid,
  other cash expenses paid, actual processor payouts, and **Refunds paid
  separately (NOT deducted from payout)**.
- **Activity Ledger** — links to the daily inputs and calculates AOV,
  checkout-to-paid-order rate, operating net sales estimate, and a recorded
  activity contribution estimate (not profit). Rates and estimates stay blank
  when required inputs are unknown or a denominator is not positive, including
  an all-zero aggregate denominator.
- **Cash Ledger** — separates bank/processor cash from operating activity.
  `NET CASH RECEIVED after cash-paid costs` is actual processor payouts plus
  affiliate cash paid, less refunds paid separately, advertising cash paid,
  and other cash expenses paid. If a refund is already netted in the
  processor payout, enter **0** for refunds paid separately; never enter the
  same refund twice. Processor fees and activity/accrual expenses are not
  deducted in Cash Ledger.
- **Scenario** — an explicitly illustrative `$100/day` gross target at the
  `$17.99` offer price. The formula uses `CEILING` and shows six orders and
  `$107.94` illustrative gross. The optional conversion assumption is blank
  and is never used to invent actual visitors or purchases.
- **Weekly Review** — reconciliation prompts for `GA4
  product_checkout_click` and `lead_form_success`, plus sales, processor,
  affiliate, and refunds sources. Pageviews are explicitly not a purchase
  attribution source.
- **Glossary** and **Start Here** — definitions, accounting boundaries, and
  input/completeness guidance.

## Blank handling and completeness

Actual inputs are blank at generation time; they are not populated with zeros.
Users may enter `0` when a zero is a known fact. Formula cells return blank
when a required input is unknown. Recorded totals show the values entered so
far, while adjacent completeness rows identify `No entries`, `Partial`, or
`Complete — 14/14`; partial totals must not be treated as complete-period
results. Aggregate AOV and conversion also require a positive total orders or
checkout-clicks denominator, so an all-zero but complete input set remains
blank rather than producing a divide-by-zero error.

## Cash versus activity boundary

The Activity Ledger uses expenses **recorded/accrued for activity tracking**
and is explicitly not a profit statement. The Cash Ledger uses only
**advertising cash paid** and **other cash expenses paid**. It uses actual
processor payouts as bank cash and does not subtract processor fees again.
The separate-refund input is strictly for a cash refund paid outside the
processor payout; enter 0 when the payout already includes that refund.

## Generate and test

From the repository root:

```bash
python3 deliverables/sentinel-campaign/source/generate_cash_flow_worksheet.py
python3 deliverables/sentinel-campaign/source/test_cash_flow_worksheet.py
```

The generator uses `xlsxwriter`; tests use `openpyxl` to inspect formulas,
blank handling, sheet structure, all-zero aggregate guards, and the netted
versus separately-paid refund boundary. Excel or Google Sheets recalculates
the formulas on open.