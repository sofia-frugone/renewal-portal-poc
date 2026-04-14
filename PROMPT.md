# Session Prompt — Add download invoice button to confirmation page

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/Confirm.tsx`, add a "Download invoice" button.

### Placement
Add it below the existing primary action button (e.g. "Back to home" or equivalent CTA), as a secondary outlined button.

### Button

```tsx
<Button
  variant="outlined"
  size="large"
  startIcon={<DownloadIcon />}
  onClick={handleDownloadInvoice}
  sx={{
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 600,
    borderColor: '#92248E',
    color: '#92248E',
    px: 3,
    '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' },
  }}
>
  Download invoice
</Button>
```

Import: `import DownloadIcon from '@mui/icons-material/Download';`

### Mock handler

```tsx
const handleDownloadInvoice = () => {
  // Mock: generate a simple text blob and trigger browser download
  const invoiceText = [
    'ROADSIDE ASSISTANCE - TAX INVOICE',
    '─────────────────────────────────',
    '',
    'Invoice number:  INV-2026-00891',
    'Date:            14 April 2026',
    '',
    'Member:          Michael Thompson',
    'Membership ID:   RSA-2024-00891',
    'Plan:            Standard',
    '',
    'Description      Amount',
    '─────────────────────────────────',
    'Annual renewal   $109.00',
    '',
    'TOTAL AUD        $109.00',
    '',
    'Thank you for renewing your membership.',
  ].join('\n');

  const blob = new Blob([invoiceText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'invoice-RSA-2024-00891.txt';
  a.click();
  URL.revokeObjectURL(url);
};
```

---

## No other changes. Do not touch any other page or component.
