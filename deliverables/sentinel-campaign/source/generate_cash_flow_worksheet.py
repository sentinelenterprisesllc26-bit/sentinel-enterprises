"""Generate the Sentinel campaign cash-flow worksheet.

The workbook is intentionally blank for actual operating inputs.  The only
pre-filled numbers are the explicitly labelled illustrative $100/day scenario.
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Optional

import xlsxwriter


CAMPAIGN_DIR = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = CAMPAIGN_DIR / "cash-flow-worksheet.xlsx"
DAILY_ROWS = 14
INPUT_HEADER_ROW = 4  # zero-indexed; Excel row 5
INPUT_FIRST_ROW = 5   # zero-indexed; Excel row 6
INPUT_LAST_ROW = INPUT_FIRST_ROW + DAILY_ROWS - 1

INPUT_HEADERS = [
    "Date",
    "Website visitors",
    "Checkout clicks",
    "Actual paid orders (sales records)",
    "Actual gross product sales excl. sales taxes",
    "Earned affiliate commissions",
    "Affiliate cash paid",
    "Refunds issued / recorded",
    "Processor fees recorded",
    "Advertising expenses recorded (activity)",
    "Other expenses recorded (activity)",
    "Advertising cash paid",
    "Other cash expenses paid",
    "Actual processor payouts",
    "Refunds paid separately (NOT deducted from payout)",
]


def safe_ratio(numerator: Optional[float], denominator: Optional[float]) -> Optional[float]:
    """Return a ratio only when both actual inputs are present and denominator > 0."""
    if numerator is None or denominator is None or denominator <= 0:
        return None
    return numerator / denominator


def operating_net_sales_estimate(
    gross_product_sales: Optional[float],
    earned_affiliate_commissions: Optional[float],
    refunds_issued: Optional[float],
) -> Optional[float]:
    """Keep the estimate unknown until all three activity inputs are known."""
    if (
        gross_product_sales is None
        or earned_affiliate_commissions is None
        or refunds_issued is None
    ):
        return None
    return gross_product_sales + earned_affiliate_commissions - refunds_issued


def cash_net_received(
    processor_payouts: Optional[float],
    affiliate_cash_paid: Optional[float],
    refunds_paid_separately: Optional[float],
    advertising_cash_paid: Optional[float],
    other_cash_paid: Optional[float],
) -> Optional[float]:
    """Calculate cash basis movement; refunds are only separate when not netted."""
    values = (
        processor_payouts,
        affiliate_cash_paid,
        refunds_paid_separately,
        advertising_cash_paid,
        other_cash_paid,
    )
    if any(value is None for value in values):
        return None
    return (
        processor_payouts
        + affiliate_cash_paid
        - refunds_paid_separately
        - advertising_cash_paid
        - other_cash_paid
    )


def scenario_orders_required(target_gross: float, price: float) -> int:
    """Equivalent of Excel CEILING(target_gross / price, 1)."""
    if price <= 0:
        raise ValueError("price must be positive")
    quotient = target_gross / price
    whole = int(quotient)
    return whole if quotient == whole else whole + 1


def scenario_gross(target_gross: float, price: float) -> float:
    return scenario_orders_required(target_gross, price) * price


def _formula(ws, row: int, col: int, formula: str, fmt, cached: object = "") -> None:
    """Write a formula with a blank cached result unless a result is known."""
    ws.write_formula(row, col, formula, fmt, cached)


def _setup_sheet(ws, title: str, subtitle: str, last_col: int, workbook) -> None:
    ws.merge_range(0, 0, 0, last_col, title, workbook.cell_formats["title"])
    ws.merge_range(1, 0, 1, last_col, subtitle, workbook.cell_formats["subtitle"])
    ws.set_row(0, 28)
    ws.set_row(1, 35)
    ws.hide_gridlines(2)


def _write_table_header(ws, row: int, headers: list[str], workbook) -> None:
    for col, header in enumerate(headers):
        ws.write(row, col, header, workbook.cell_formats["header"])
    ws.set_row(row, 34)


def _add_status_formatting(ws, cell_range: str, workbook) -> None:
    ws.conditional_format(
        cell_range,
        {
            "type": "text",
            "criteria": "containing",
            "value": "Complete",
            "format": workbook.cell_formats["status_complete"],
        },
    )
    ws.conditional_format(
        cell_range,
        {
            "type": "text",
            "criteria": "containing",
            "value": "Partial",
            "format": workbook.cell_formats["status_partial"],
        },
    )


def _add_formats(workbook: xlsxwriter.Workbook) -> None:
    navy = "#102A43"
    blue = "#1F5A85"
    pale_blue = "#D9EAF4"
    pale_yellow = "#FFF2CC"
    pale_green = "#E2F0D9"
    pale_orange = "#FCE4D6"
    gray = "#F3F6F8"
    dark = "#243B53"

    workbook.cell_formats = {}
    workbook.cell_formats["title"] = workbook.add_format(
        {"bold": True, "font_size": 18, "font_color": "white", "bg_color": navy, "align": "left", "valign": "vcenter"}
    )
    workbook.cell_formats["subtitle"] = workbook.add_format(
        {"font_color": dark, "bg_color": "#EAF2F8", "text_wrap": True, "valign": "vcenter"}
    )
    workbook.cell_formats["header"] = workbook.add_format(
        {
            "bold": True,
            "font_color": "white",
            "bg_color": blue,
            "border": 1,
            "text_wrap": True,
            "valign": "vcenter",
        }
    )
    workbook.cell_formats["section"] = workbook.add_format(
        {"bold": True, "font_color": navy, "bg_color": pale_blue, "border": 1}
    )
    workbook.cell_formats["input"] = workbook.add_format(
        {"bg_color": pale_yellow, "border": 1, "font_color": "#7F6000"}
    )
    workbook.cell_formats["input_currency"] = workbook.add_format(
        {"bg_color": pale_yellow, "border": 1, "font_color": "#7F6000", "num_format": '$#,##0.00;[Red]-$#,##0.00'}
    )
    workbook.cell_formats["input_integer"] = workbook.add_format(
        {"bg_color": pale_yellow, "border": 1, "font_color": "#7F6000", "num_format": "#,##0"}
    )
    workbook.cell_formats["input_date"] = workbook.add_format(
        {"bg_color": pale_yellow, "border": 1, "font_color": "#7F6000", "num_format": "yyyy-mm-dd"}
    )
    workbook.cell_formats["input_percent"] = workbook.add_format(
        {"bg_color": pale_yellow, "border": 1, "font_color": "#7F6000", "num_format": "0.0%"}
    )
    workbook.cell_formats["formula"] = workbook.add_format({"border": 1, "font_color": dark})
    workbook.cell_formats["formula_currency"] = workbook.add_format(
        {"border": 1, "font_color": dark, "num_format": '$#,##0.00;[Red]-$#,##0.00'}
    )
    workbook.cell_formats["formula_integer"] = workbook.add_format(
        {"border": 1, "font_color": dark, "num_format": "#,##0"}
    )
    workbook.cell_formats["formula_percent"] = workbook.add_format(
        {"border": 1, "font_color": dark, "num_format": "0.0%"}
    )
    workbook.cell_formats["formula_date"] = workbook.add_format(
        {"border": 1, "font_color": dark, "num_format": "yyyy-mm-dd"}
    )
    workbook.cell_formats["total_label"] = workbook.add_format(
        {"bold": True, "bg_color": gray, "top": 1, "bottom": 2}
    )
    workbook.cell_formats["total_currency"] = workbook.add_format(
        {"bold": True, "bg_color": gray, "top": 1, "bottom": 2, "num_format": '$#,##0.00;[Red]-$#,##0.00'}
    )
    workbook.cell_formats["total_integer"] = workbook.add_format(
        {"bold": True, "bg_color": gray, "top": 1, "bottom": 2, "num_format": "#,##0"}
    )
    workbook.cell_formats["total_percent"] = workbook.add_format(
        {"bold": True, "bg_color": gray, "top": 1, "bottom": 2, "num_format": "0.0%"}
    )
    workbook.cell_formats["status"] = workbook.add_format(
        {"bg_color": gray, "font_color": dark, "border": 1, "text_wrap": True}
    )
    workbook.cell_formats["status_complete"] = workbook.add_format({"bg_color": pale_green, "font_color": "#375623"})
    workbook.cell_formats["status_partial"] = workbook.add_format({"bg_color": pale_orange, "font_color": "#9C0006"})
    workbook.cell_formats["body"] = workbook.add_format({"font_color": dark, "text_wrap": True, "valign": "top"})
    workbook.cell_formats["note"] = workbook.add_format(
        {"font_color": "#52606D", "italic": True, "text_wrap": True, "valign": "top"}
    )
    workbook.cell_formats["warning"] = workbook.add_format(
        {"font_color": "#9C0006", "bg_color": pale_orange, "bold": True, "text_wrap": True, "valign": "top"}
    )
    workbook.cell_formats["check"] = workbook.add_format(
        {"bg_color": pale_yellow, "border": 1, "font_color": "#7F6000", "text_wrap": True}
    )
    workbook.cell_formats["scenario_output"] = workbook.add_format(
        {"bg_color": pale_green, "border": 1, "bold": True, "font_color": "#375623", "num_format": '$#,##0.00;[Red]-$#,##0.00'}
    )
    workbook.cell_formats["scenario_output_integer"] = workbook.add_format(
        {"bg_color": pale_green, "border": 1, "bold": True, "font_color": "#375623", "num_format": "#,##0"}
    )
    workbook.cell_formats["scenario_output_blank"] = workbook.add_format(
        {"bg_color": pale_green, "border": 1, "bold": True, "font_color": "#375623", "num_format": "#,##0.0"}
    )


def _write_start_here(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Start Here")
    f = wb.cell_formats
    _setup_sheet(
        ws,
        "Sentinel cash-flow worksheet",
        "Enter only known actuals on Daily Inputs. Blank cells mean unknown—not zero. Formula cells stay blank when required inputs are incomplete.",
        6,
        wb,
    )
    ws.set_column("A:A", 32)
    ws.set_column("B:B", 25)
    ws.set_column("C:C", 18)
    ws.set_column("D:D", 3)
    ws.set_column("E:G", 28)

    ws.write("A4", "How to use", f["section"])
    ws.merge_range("A5:C5", "1. Record source-backed daily activity and cash movements in Daily Inputs.", f["body"])
    ws.merge_range("A6:C6", "2. Review Activity Ledger for operating net sales estimate and measured rates.", f["body"])
    ws.merge_range("A7:C7", "3. Review Cash Ledger for NET CASH RECEIVED after cash-paid costs. Processor payouts are bank actuals.", f["body"])
    ws.merge_range("A8:C8", "4. Use Scenario only for the labelled $100/day planning illustration; it is not actual performance.", f["body"])
    ws.merge_range("A9:C9", "5. Review GA4 events in Weekly Review. Never infer purchases from pageviews.", f["body"])
    ws.set_row(5, 24)
    ws.set_row(6, 24)
    ws.set_row(7, 30)
    ws.set_row(8, 24)
    ws.set_row(9, 24)

    ws.write("A11", "Live ledger summary", f["section"])
    summary = [
        ("Paid orders recorded", "='Activity Ledger'!D20", f["total_integer"], ""),
        ("Gross product sales recorded", "='Activity Ledger'!E20", f["total_currency"], ""),
        ("Operating net sales estimate", "='Activity Ledger'!J20", f["total_currency"], ""),
        ("NET CASH RECEIVED after cash-paid costs", "='Cash Ledger'!G20", f["total_currency"], ""),
        ("Daily input completeness", '=IF(COUNTIF(\'Activity Ledger\'!O6:O19,"Complete")=14,"Complete — 14/14 days",IF(COUNTIF(\'Activity Ledger\'!O6:O19,"Complete")=0,"No complete days", "Partial — "&COUNTIF(\'Activity Ledger\'!O6:O19,"Complete")&"/14 days complete"))', f["status"], "Completion is based on all 15 Daily Inputs fields.")
    ]
    for idx, (label, formula, fmt, note) in enumerate(summary, start=12):
        ws.write(idx, 0, label, f["total_label"])
        _formula(ws, idx, 1, formula, fmt)
        if note:
            ws.write(idx, 2, note, f["note"])
    _add_status_formatting(ws, "B17:B17", wb)

    ws.write("A19", "Important accounting boundary", f["section"])
    ws.merge_range(
        "A20:G21",
        "Activity Ledger is a recorded-activity view, not a profit statement. Cash Ledger is cash basis: actual processor payouts + affiliate cash paid − refunds paid separately (only when NOT already netted in the payout) − advertising cash paid − other cash expenses paid. If a refund is already netted in the processor payout, enter 0 in Refunds paid separately and do not deduct it again. Do not subtract processor fees or activity/accrual expenses in Cash Ledger.",
        f["warning"],
    )
    ws.write("A23", "Input colors", f["section"])
    ws.write("A24", "Yellow cells", f["input"])
    ws.write("B24", "User-entered assumption or actual input", f["body"])
    ws.write("A25", "Blue/gray cells", f["formula"])
    ws.write("B25", "Formula or recorded total; do not overwrite", f["body"])
    ws.freeze_panes(4, 0)


def _write_daily_inputs(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Daily Inputs")
    f = wb.cell_formats
    _setup_sheet(
        ws,
        "Daily inputs — 14-day campaign window",
        "Source actuals only. Keep unknowns blank. If you know that a category had no activity, enter 0; do not use blanks to imply zero. Activity expenses and cash-paid expenses are separate fields.",
        len(INPUT_HEADERS) - 1,
        wb,
    )
    widths = [14, 17, 16, 22, 25, 22, 18, 20, 20, 26, 25, 20, 22, 20, 34]
    for col, width in enumerate(widths):
        ws.set_column(col, col, width)
    _write_table_header(ws, INPUT_HEADER_ROW, INPUT_HEADERS, wb)
    for row in range(INPUT_FIRST_ROW, INPUT_LAST_ROW + 1):
        ws.write_blank(row, 0, None, f["input_date"])
        for col in range(1, len(INPUT_HEADERS)):
            fmt = f["input_integer"] if col in (1, 2, 3) else f["input_currency"]
            ws.write_blank(row, col, None, fmt)
    ws.add_table(
        INPUT_HEADER_ROW,
        0,
        INPUT_LAST_ROW,
        len(INPUT_HEADERS) - 1,
        {
            "name": "DailyInputsTable",
            "style": "Table Style Medium 2",
            "columns": [{"header": header} for header in INPUT_HEADERS],
        },
    )
    ws.data_validation(
        INPUT_FIRST_ROW,
        0,
        INPUT_LAST_ROW,
        0,
        {"validate": "date", "criteria": "between", "minimum": "1900-01-01", "maximum": "2200-12-31", "ignore_blank": True},
    )
    ws.data_validation(
        INPUT_FIRST_ROW,
        1,
        INPUT_LAST_ROW,
        3,
        {"validate": "integer", "criteria": ">=", "value": 0, "ignore_blank": True},
    )
    ws.data_validation(
        INPUT_FIRST_ROW,
        4,
        INPUT_LAST_ROW,
        len(INPUT_HEADERS) - 1,
        {"validate": "decimal", "criteria": ">=", "value": 0, "ignore_blank": True},
    )
    ws.write("A21", "Field guidance", f["section"])
    guidance = [
        ("Actual paid orders", "Sales records only. Do not substitute checkout clicks or pageviews."),
        ("Actual gross product sales", "Recorded product sales excluding sales taxes; do not estimate from clicks."),
        ("Earned affiliate commissions vs affiliate cash paid", "Earned is activity/accrual; cash paid is the money actually received. They are intentionally separate."),
        ("Advertising / other expenses", "Activity fields are recorded/accrual view only; cash-paid fields are the actual cash basis inputs used by Cash Ledger."),
        ("Actual processor payouts", "Bank/processor payout actually received. It may already be net of fees and refunds."),
        ("Refunds paid separately (NOT deducted from payout)", "Cash refund paid outside the processor payout. Enter 0 when the payout already nets the refund; never enter the same refund in both the payout and this field."),
    ]
    for idx, (label, text) in enumerate(guidance, start=22):
        ws.write(idx, 0, label, f["body"])
        ws.merge_range(idx, 1, idx, 5, text, f["note"])
        ws.set_row(idx, 30)
    ws.freeze_panes(INPUT_FIRST_ROW, 1)
    ws.set_landscape()
    ws.fit_to_pages(1, 0)
    ws.repeat_rows(INPUT_HEADER_ROW, INPUT_HEADER_ROW)


def _input_ref(excel_row: int, col_letter: str) -> str:
    return f"'Daily Inputs'!{col_letter}{excel_row}"


def _write_activity_ledger(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Activity Ledger")
    f = wb.cell_formats
    headers = [
        "Date",
        "Website visitors",
        "Checkout clicks",
        "Actual paid orders",
        "Gross product sales excl. sales taxes",
        "AOV",
        "Checkout → paid-order rate",
        "Earned affiliate commissions",
        "Refunds issued / recorded",
        "Operating net sales estimate",
        "Processor fees recorded",
        "Advertising expenses recorded (activity)",
        "Other expenses recorded (activity)",
        "Recorded activity contribution estimate (not profit)",
        "Completeness",
    ]
    _setup_sheet(
        ws,
        "Activity Ledger — recorded activity view",
        "Operating net sales estimate = gross product sales + earned affiliate commissions − refunds issued. Activity expenses are recorded/accrual view inputs; this ledger is not a profit statement. Rates appear only with present, positive denominators. Totals are recorded totals and are flagged when partial.",
        len(headers) - 1,
        wb,
    )
    ws.set_column("A:A", 14)
    ws.set_column("B:E", 18)
    ws.set_column("F:G", 19)
    ws.set_column("H:N", 20)
    ws.set_column("O:O", 24)
    _write_table_header(ws, INPUT_HEADER_ROW, headers, wb)
    for idx in range(DAILY_ROWS):
        row = INPUT_FIRST_ROW + idx
        excel_row = row + 1
        input_row = excel_row
        refs = {
            "date": _input_ref(input_row, "A"),
            "visitors": _input_ref(input_row, "B"),
            "clicks": _input_ref(input_row, "C"),
            "orders": _input_ref(input_row, "D"),
            "gross": _input_ref(input_row, "E"),
            "earned": _input_ref(input_row, "F"),
            "refunds": _input_ref(input_row, "H"),
            "fees": _input_ref(input_row, "I"),
            "ad": _input_ref(input_row, "J"),
            "other": _input_ref(input_row, "K"),
        }
        _formula(ws, row, 0, f'=IF({refs["date"]}="","",{refs["date"]})', f["formula_date"])
        _formula(ws, row, 1, f'=IF({refs["visitors"]}="","",{refs["visitors"]})', f["formula_integer"])
        _formula(ws, row, 2, f'=IF({refs["clicks"]}="","",{refs["clicks"]})', f["formula_integer"])
        _formula(ws, row, 3, f'=IF({refs["orders"]}="","",{refs["orders"]})', f["formula_integer"])
        _formula(ws, row, 4, f'=IF({refs["gross"]}="","",{refs["gross"]})', f["formula_currency"])
        _formula(ws, row, 5, f'=IF(OR(E{excel_row}="",D{excel_row}="",D{excel_row}<=0),"",E{excel_row}/D{excel_row})', f["formula_currency"])
        _formula(ws, row, 6, f'=IF(OR(D{excel_row}="",C{excel_row}="",C{excel_row}<=0),"",D{excel_row}/C{excel_row})', f["formula_percent"])
        _formula(ws, row, 7, f'=IF({refs["earned"]}="","",{refs["earned"]})', f["formula_currency"])
        _formula(ws, row, 8, f'=IF({refs["refunds"]}="","",{refs["refunds"]})', f["formula_currency"])
        _formula(ws, row, 9, f'=IF(OR(E{excel_row}="",H{excel_row}="",I{excel_row}=""),"",E{excel_row}+H{excel_row}-I{excel_row})', f["formula_currency"])
        _formula(ws, row, 10, f'=IF({refs["fees"]}="","",{refs["fees"]})', f["formula_currency"])
        _formula(ws, row, 11, f'=IF({refs["ad"]}="","",{refs["ad"]})', f["formula_currency"])
        _formula(ws, row, 12, f'=IF({refs["other"]}="","",{refs["other"]})', f["formula_currency"])
        _formula(ws, row, 13, f'=IF(OR(J{excel_row}="",K{excel_row}="",L{excel_row}="",M{excel_row}=""),"",J{excel_row}-K{excel_row}-L{excel_row}-M{excel_row})', f["formula_currency"])
        count_formula = f"COUNTA('Daily Inputs'!A{input_row}:O{input_row})"
        _formula(ws, row, 14, f'=IF({count_formula}=0,"No entries",IF({count_formula}=15,"Complete","Partial — "&{count_formula}&" of 15 fields"))', f["status"])

    total_row = INPUT_LAST_ROW + 1
    status_row = total_row + 1
    ws.write(total_row, 0, "Recorded totals / rates", f["total_label"])
    ws.write(status_row, 0, "Completeness", f["total_label"])
    for col in range(1, 14):
        letter = chr(65 + col)
        source = f"{letter}{INPUT_FIRST_ROW + 1}:{letter}{INPUT_LAST_ROW + 1}"
        if col == 5:
            formula = f'=IF(AND(COUNT(D{INPUT_FIRST_ROW + 1}:D{INPUT_LAST_ROW + 1})=14,COUNT(E{INPUT_FIRST_ROW + 1}:E{INPUT_LAST_ROW + 1})=14,SUM(D{INPUT_FIRST_ROW + 1}:D{INPUT_LAST_ROW + 1})>0),SUM(E{INPUT_FIRST_ROW + 1}:E{INPUT_LAST_ROW + 1})/SUM(D{INPUT_FIRST_ROW + 1}:D{INPUT_LAST_ROW + 1}),"")'
            total_fmt = f["total_currency"]
        elif col == 6:
            formula = f'=IF(AND(COUNT(D{INPUT_FIRST_ROW + 1}:D{INPUT_LAST_ROW + 1})=14,COUNT(C{INPUT_FIRST_ROW + 1}:C{INPUT_LAST_ROW + 1})=14,SUM(C{INPUT_FIRST_ROW + 1}:C{INPUT_LAST_ROW + 1})>0),SUM(D{INPUT_FIRST_ROW + 1}:D{INPUT_LAST_ROW + 1})/SUM(C{INPUT_FIRST_ROW + 1}:C{INPUT_LAST_ROW + 1}),"")'
            total_fmt = f["total_percent"]
        else:
            formula = f'=IF(COUNT({source})=0,"",SUM({source}))'
            total_fmt = f["total_integer"] if col in (1, 2, 3) else f["total_currency"]
        _formula(ws, total_row, col, formula, total_fmt)
        status_formula = f'=IF(COUNT({source})=0,"No entries",IF(COUNT({source})=14,"Complete — 14/14","Partial — "&COUNT({source})&"/14"))'
        _formula(ws, status_row, col, status_formula, f["status"])
    _formula(ws, total_row, 14, '="See completeness below"', f["status"], "See completeness below")
    _formula(
        ws,
        status_row,
        14,
        '=IF(COUNTIF(O6:O19,"Complete")=14,"Complete — 14/14",IF(COUNTIF(O6:O19,"Complete")=0,"No complete days","Partial — "&COUNTIF(O6:O19,"Complete")&"/14"))',
        f["status"],
    )
    _add_status_formatting(ws, f"A{status_row + 1}:O{status_row + 1}", wb)
    ws.freeze_panes(INPUT_FIRST_ROW, 1)
    ws.autofilter(INPUT_HEADER_ROW, 0, INPUT_LAST_ROW, len(headers) - 1)
    ws.set_landscape()
    ws.fit_to_pages(1, 0)


def _write_cash_ledger(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Cash Ledger")
    f = wb.cell_formats
    headers = [
        "Date",
        "Actual processor payouts",
        "Affiliate cash paid",
        "Refunds paid separately (NOT deducted from payout)",
        "Advertising cash paid",
        "Other cash expenses paid",
        "NET CASH RECEIVED after cash-paid costs",
        "Completeness / cash boundary",
    ]
    _setup_sheet(
        ws,
        "Cash Ledger — actual cash view",
        "NET CASH RECEIVED after cash-paid costs = actual processor payouts + affiliate cash paid − refunds paid separately (only when NOT already netted in the payout) − advertising cash paid − other cash expenses paid. Enter 0 for refunds paid separately when the payout already nets the refund. Processor fees and activity/accrual expenses are not deducted here.",
        len(headers) - 1,
        wb,
    )
    ws.set_column("A:A", 14)
    ws.set_column("B:G", 25)
    ws.set_column("H:H", 30)
    _write_table_header(ws, INPUT_HEADER_ROW, headers, wb)
    for idx in range(DAILY_ROWS):
        row = INPUT_FIRST_ROW + idx
        excel_row = row + 1
        refs = {
            "date": _input_ref(excel_row, "A"),
            "payouts": _input_ref(excel_row, "N"),
            "affiliate": _input_ref(excel_row, "G"),
            "refunds": _input_ref(excel_row, "O"),
            "ad": _input_ref(excel_row, "L"),
            "other": _input_ref(excel_row, "M"),
        }
        _formula(ws, row, 0, f'=IF({refs["date"]}="","",{refs["date"]})', f["formula_date"])
        _formula(ws, row, 1, f'=IF({refs["payouts"]}="","",{refs["payouts"]})', f["formula_currency"])
        _formula(ws, row, 2, f'=IF({refs["affiliate"]}="","",{refs["affiliate"]})', f["formula_currency"])
        _formula(ws, row, 3, f'=IF({refs["refunds"]}="","",{refs["refunds"]})', f["formula_currency"])
        _formula(ws, row, 4, f'=IF({refs["ad"]}="","",{refs["ad"]})', f["formula_currency"])
        _formula(ws, row, 5, f'=IF({refs["other"]}="","",{refs["other"]})', f["formula_currency"])
        _formula(ws, row, 6, f'=IF(OR(B{excel_row}="",C{excel_row}="",D{excel_row}="",E{excel_row}="",F{excel_row}=""),"",B{excel_row}+C{excel_row}-D{excel_row}-E{excel_row}-F{excel_row})', f["formula_currency"])
        count_formula = f"COUNTA('Daily Inputs'!A{excel_row}:O{excel_row})"
        _formula(ws, row, 7, f'=IF({count_formula}=0,"No entries",IF(AND({refs["payouts"]}<>"",{refs["affiliate"]}<>"",{refs["refunds"]}<>"",{refs["ad"]}<>"",{refs["other"]}<>""),"Cash inputs complete","Cash inputs partial — payout/refund/expense fields required"))', f["status"])
    total_row = INPUT_LAST_ROW + 1
    status_row = total_row + 1
    ws.write(total_row, 0, "Recorded totals", f["total_label"])
    ws.write(status_row, 0, "Completeness", f["total_label"])
    for col in range(1, 7):
        letter = chr(65 + col)
        source = f"{letter}{INPUT_FIRST_ROW + 1}:{letter}{INPUT_LAST_ROW + 1}"
        _formula(ws, total_row, col, f'=IF(COUNT({source})=0,"",SUM({source}))', f["total_currency"])
        _formula(ws, status_row, col, f'=IF(COUNT({source})=0,"No entries",IF(COUNT({source})=14,"Complete — 14/14","Partial — "&COUNT({source})&"/14"))', f["status"])
    _formula(ws, total_row, 6, f'=IF(COUNT(G{INPUT_FIRST_ROW + 1}:G{INPUT_LAST_ROW + 1})=0,"",SUM(G{INPUT_FIRST_ROW + 1}:G{INPUT_LAST_ROW + 1}))', f["total_currency"])
    _formula(ws, status_row, 6, f'=IF(COUNT(G{INPUT_FIRST_ROW + 1}:G{INPUT_LAST_ROW + 1})=0,"No entries",IF(COUNT(G{INPUT_FIRST_ROW + 1}:G{INPUT_LAST_ROW + 1})=14,"Complete — 14/14","Partial — "&COUNT(G{INPUT_FIRST_ROW + 1}:G{INPUT_LAST_ROW + 1})&"/14"))', f["status"])
    _add_status_formatting(ws, f"A{status_row + 1}:H{status_row + 1}", wb)
    ws.freeze_panes(INPUT_FIRST_ROW, 1)
    ws.autofilter(INPUT_HEADER_ROW, 0, INPUT_LAST_ROW, len(headers) - 1)
    ws.set_landscape()
    ws.fit_to_pages(1, 0)


def _write_scenario(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Scenario")
    f = wb.cell_formats
    _setup_sheet(
        ws,
        "Illustrative $100/day offer scenario",
        "Planning illustration only — not actual results and not linked to the Daily Inputs, Activity Ledger, or Cash Ledger.",
        4,
        wb,
    )
    ws.set_column("A:A", 38)
    ws.set_column("B:B", 20)
    ws.set_column("C:C", 18)
    ws.set_column("D:E", 32)
    ws.write("A4", "Illustrative assumption / output", f["header"])
    ws.write("B4", "Value", f["header"])
    ws.write("C4", "Type", f["header"])
    ws.write("D4", "Interpretation", f["header"])
    ws.write("A5", "Target gross sales per day", f["body"])
    ws.write_number("B5", 100.00, f["input_currency"])
    ws.write("C5", "Planning input", f["input"])
    ws.write("D5", "Illustrative target only; not an observed sales result.", f["note"])
    ws.write("A6", "Illustrative price per order", f["body"])
    ws.write_number("B6", 17.99, f["input_currency"])
    ws.write("C6", "Planning input", f["input"])
    ws.write("D6", "Offer price supplied for the scenario; not a recorded transaction price.", f["note"])
    ws.write("A7", "Orders required to reach target", f["body"])
    _formula(ws, 6, 1, "=CEILING(B5/B6,1)", f["scenario_output_integer"], scenario_orders_required(100.00, 17.99))
    ws.write("C7", "Formula", f["formula"])
    ws.write("D7", "CEILING is used so the target is met or exceeded.", f["note"])
    ws.write("A8", "Illustrative gross at whole-order count", f["body"])
    _formula(ws, 7, 1, "=B7*B6", f["scenario_output"], scenario_gross(100.00, 17.99))
    ws.write("C8", "Formula", f["formula"])
    ws.write("D8", "Illustrative 6 × $17.99 = $107.94 before taxes, refunds, fees, or expenses.", f["note"])
    ws.write("A10", "Optional checkout → paid-order conversion assumption", f["body"])
    ws.write_blank("B10", None, f["input_percent"])
    ws.write("C10", "Optional input", f["input"])
    ws.write("D10", "Leave blank unless a measured, channel-specific assumption is intentionally used.", f["note"])
    ws.write("A11", "Illustrative visitors needed at optional conversion", f["body"])
    _formula(ws, 10, 1, '=IF(OR(B10="",B10<=0),"",B7/B10)', f["scenario_output_blank"])
    ws.write("C11", "Formula", f["formula"])
    ws.write("D11", "Blank until the optional assumption is entered; this is not an actual result.", f["note"])
    ws.write("A13", "Guardrail", f["section"])
    ws.merge_range("A14:E15", "Do not use this scenario to backfill actual orders, visitors, conversion, revenue, or cash. Actual paid orders come from sales records; purchases are not attributed from pageviews.", f["warning"])
    ws.set_row(14, 25)
    ws.set_row(15, 25)
    ws.freeze_panes(4, 0)


def _write_weekly_review(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Weekly Review")
    f = wb.cell_formats
    _setup_sheet(
        ws,
        "Weekly review — measurement and reconciliation",
        "Use source systems to reconcile the worksheet. GA4 events measure intent/leads; they do not replace sales records and pageviews are not purchase attribution.",
        5,
        wb,
    )
    ws.set_column("A:A", 23)
    ws.set_column("B:B", 28)
    ws.set_column("C:C", 38)
    ws.set_column("D:D", 27)
    ws.set_column("E:F", 28)
    headers = ["Review item", "Source / GA4 event", "Weekly check", "Entered result / variance", "Owner", "Notes"]
    _write_table_header(ws, 4, headers, wb)
    rows = [
        ("Checkout intent", "GA4: product_checkout_click", "Reconcile event count to Daily Inputs checkout clicks; inspect tracking gaps.", "Input", "Input", "Input"),
        ("Lead intent", "GA4: lead_form_success", "Review successful lead submissions separately from checkout activity.", "Input", "Input", "Input"),
        ("Paid orders", "Sales records", "Reconcile paid order count to Actual paid orders; never infer from pageviews.", "Input", "Input", "Input"),
        ("Gross product sales", "Sales records / accounting", "Reconcile product sales excluding sales taxes to the recorded sales report.", "Input", "Input", "Input"),
        ("Processor payouts", "Bank / processor statement", "Reconcile Actual processor payouts; document payout timing and netting.", "Input", "Input", "Input"),
        ("Affiliate cash", "Affiliate network statement", "Reconcile cash paid separately from earned affiliate commissions.", "Input", "Input", "Input"),
        ("Refunds paid separately", "Bank / processor statement", "Reconcile cash refunds paid outside processor payouts; enter 0 when the payout already nets the refund.", "Input", "Input", "Input"),
    ]
    for row_idx, values in enumerate(rows, start=5):
        for col, value in enumerate(values):
            fmt = f["check"] if col >= 3 else f["body"]
            ws.write(row_idx, col, "" if value == "Input" else value, fmt)
    ws.add_table(
        4,
        0,
        4 + len(rows),
        len(headers) - 1,
        {
            "name": "WeeklyReviewTable",
            "style": "Table Style Medium 2",
            "columns": [{"header": header} for header in headers],
        },
    )
    ws.write("A14", "Attribution rule", f["section"])
    ws.merge_range("A15:F16", "Use product_checkout_click for checkout intent and lead_form_success for successful lead submissions. Neither event is a paid order. Pageviews can indicate reach only; do not attribute purchases from pageviews.", f["warning"])
    ws.set_row(14, 25)
    ws.set_row(15, 25)
    ws.freeze_panes(5, 0)


def _write_glossary(wb: xlsxwriter.Workbook) -> None:
    ws = wb.add_worksheet("Glossary")
    f = wb.cell_formats
    _setup_sheet(ws, "Glossary and formula boundaries", "Definitions keep recorded activity, accrual-like measures, and bank cash from being mixed.", 2, wb)
    ws.set_column("A:A", 35)
    ws.set_column("B:B", 85)
    ws.write("A4", "Term", f["header"])
    ws.write("B4", "Definition / boundary", f["header"])
    rows = [
        ("Actual paid orders", "Order count from sales records. Checkout clicks and pageviews are not orders."),
        ("Actual gross product sales", "Recorded product sales excluding sales taxes. Do not estimate from clicks."),
        ("Earned affiliate commissions", "Commission recognized/earned according to the affiliate source; separate from cash timing."),
        ("Affiliate cash paid", "Affiliate cash actually received during the day or period."),
        ("Refunds issued / recorded", "Refund activity recorded in the operating system; distinct from actual cash paid."),
        ("Processor fees recorded", "Fees recorded as activity/expense; not subtracted in Cash Ledger when processor payouts are already net."),
        ("Operating net sales estimate", "Gross product sales + earned affiliate commissions − refunds issued. Requires all three inputs."),
        ("Actual processor payouts", "Cash actually received from the payment processor/bank. Treat as net cash movement from the statement."),
        ("Advertising / other expenses", "Activity fields are recorded/accrual view inputs. Cash-paid fields are the actual cash basis inputs used by Cash Ledger."),
        ("Refunds paid separately (NOT deducted from payout)", "Cash refund paid outside the processor payout. Enter 0 when the payout already nets the refund; never enter the same refund in both places."),
        ("NET CASH RECEIVED after cash-paid costs", "Actual processor payouts + affiliate cash paid − refunds paid separately − advertising cash paid − other cash expenses paid. Do not subtract processor fees or activity/accrual expenses; refunds already netted in payouts must be 0 here."),
        ("AOV", "Gross product sales divided by actual paid orders; shown only with both inputs and orders > 0."),
        ("Checkout → paid-order rate", "Actual paid orders divided by checkout clicks; shown only with both inputs and clicks > 0."),
        ("Completeness", "A warning based on entered numeric fields. Recorded totals can be partial and must not be read as complete-period totals."),
        ("GA4 product_checkout_click", "Weekly review event for checkout intent; not a purchase."),
        ("GA4 lead_form_success", "Weekly review event for successful lead submissions; not a purchase."),
    ]
    for row_idx, (term, definition) in enumerate(rows, start=4):
        ws.write(row_idx, 0, term, f["body"])
        ws.write(row_idx, 1, definition, f["body"])
        ws.set_row(row_idx, 34)
    ws.freeze_panes(4, 0)


def generate_workbook(output_path: Path = DEFAULT_OUTPUT) -> Path:
    """Create the workbook and return its path."""
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    wb = xlsxwriter.Workbook(str(output_path))
    wb.set_properties(
        {
            "title": "Sentinel campaign cash-flow worksheet",
            "subject": "14-day activity and cash ledger",
            "author": "Sentinel campaign",
            "comments": "Actual inputs intentionally blank; scenario values are illustrative only.",
        }
    )
    wb.set_calc_mode("auto")
    _add_formats(wb)
    _write_start_here(wb)
    _write_daily_inputs(wb)
    _write_activity_ledger(wb)
    _write_cash_ledger(wb)
    _write_scenario(wb)
    _write_weekly_review(wb)
    _write_glossary(wb)
    wb.close()
    return output_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    print(generate_workbook(args.output))