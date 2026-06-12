# Upload your PDF files here

This folder is served at the site root under `/pdfs/`.

Any file you drop in `public/pdfs/` becomes downloadable at `https://your-site/pdfs/<filename>`.

## Files the site already links to (replace these placeholders with your real PDFs)

| Upload to this path                          | Used by                                   |
| -------------------------------------------- | ----------------------------------------- |
| `public/pdfs/caregiver-tax-checklist.pdf`    | Free Downloads page → "Caregiver Tax Checklist" card |
| `public/pdfs/crypto-inheritance-checklist.pdf` | Optional direct download (currently email-gated) |
| `public/pdfs/your-purchased-workbook.pdf`    | Thank-you page "Download PDF" button (paid product delivery) |

> The existing library PDFs live in `public/downloads/` and are referenced as `/downloads/*.pdf`.
> New free checklists and paid deliverables use this `public/pdfs/` folder.

No code changes are required to swap a file — just upload it to the matching path.
To change a path, edit the `href` strings noted in the page comments
(`src/routes/downloads.tsx`, `src/routes/thank-you.tsx`).
