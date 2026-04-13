# Session Prompt — Payment Page: Add Apple Pay placeholder button

> Read CLAUDE.md before writing any code.

---

## Task

Small addition to `src/pages/Payment.tsx` only. Add an Apple Pay button placeholder between the promo code section and the payment form. Do not touch any other files.

---

## Where to insert

After the promo code success/error alerts and before the `<Divider />` that precedes the "Secure payment" header, add:

```tsx
{/* Apple Pay button */}
<Button
  fullWidth
  onClick={() => navigate('/renew/confirm')}
  sx={{
    mb: 2,
    py: 1.4,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '6px',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    '&:hover': { backgroundColor: '#1a1a1a' },
  }}
>
  {/* Apple logo — use unicode  */}
  <Typography sx={{ fontSize: '1.3rem', lineHeight: 1, mt: '-2px' }>
  </Typography>
  Pay
</Button>

{/* Divider with "or pay with card" */}
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
  <Divider sx={{ flex: 1 }} />
  <Typography variant="caption" color="text.disabled" sx={{ whiteSpace: 'nowrap' }}>
    or pay with card
  </Typography>
  <Divider sx={{ flex: 1 }} />
</Box>
```

Then remove the existing `<Divider sx={{ mb: 3 }} />` that was already there before the "Secure payment" header (to avoid a duplicate divider — the "or pay with card" divider replaces it).

---

## Result

The payment card should now read top to bottom:
1. Order summary (inclusions, subtotal, discount if promo applied, amount due)
2. Promo code input
3. Apple Pay button (black)
4. "— or pay with card —" divider
5. "Secure payment · Powered by stripe" header
6. Card number / Expiry / CVC / Name fields
7. "Pay $X.XX" button
8. Encrypted disclaimer

---

## No other changes. Do not touch routing, other pages, or shared components.
