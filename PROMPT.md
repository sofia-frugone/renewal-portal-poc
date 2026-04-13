# Session Prompt — Update Payment Page (Embedded Stripe UI)

> Read CLAUDE.md before writing any code.

---

## Task

Update `src/pages/Payment.tsx` only. Replace the "redirect to Stripe" CTA with an embedded Stripe-style payment form that appears **below the order total** on the same page.

Keep the order summary card exactly as it is. After the total row, add a divider and the embedded payment section inside the same card.

---

## Embedded payment section (add after the Total row inside the card)

```tsx
<Divider sx={{ my: 3 }} />

{/* Stripe embedded payment header */}
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
  <Lock sx={{ fontSize: 16, color: '#6b7280' }} />
  <Typography variant="body2" fontWeight={500} color="text.secondary">
    Secure payment
  </Typography>
  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <Typography variant="caption" color="text.disabled">Powered by</Typography>
    <Typography variant="caption" fontWeight={700} color="text.secondary">stripe</Typography>
  </Box>
</Box>

{/* Card number */}
<TextField fullWidth label="Card number" placeholder="1234 5678 9012 3456"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {/* Visa/MC placeholder icons - just coloured boxes */}
          <Box sx={{ width: 32, height: 20, backgroundColor: '#1a1f71', borderRadius: '3px' }} />
          <Box sx={{ width: 32, height: 20, backgroundColor: '#eb001b', borderRadius: '3px' }} />
        </Box>
      </InputAdornment>
    )
  }}
  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />

{/* Expiry + CVC row */}
<Grid container spacing={2} sx={{ mb: 2 }}>
  <Grid size={6}>
    <TextField fullWidth label="Expiry date" placeholder="MM / YY"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
  </Grid>
  <Grid size={6}>
    <TextField fullWidth label="CVC" placeholder="123"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CreditCard sx={{ color: '#9ca3af', fontSize: 18 }} />
          </InputAdornment>
        )
      }}
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
  </Grid>
</Grid>

{/* Name on card */}
<TextField fullWidth label="Name on card" placeholder="Michael Thompson"
  sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />

{/* Pay button */}
<Button variant="contained" fullWidth
  onClick={() => navigate('/renew/confirm')}
  sx={{
    py: 1.5, fontSize: '1rem', borderRadius: '6px',
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
    textTransform: 'none', fontWeight: 600,
  }}>
  Pay $109.00
</Button>

<Typography variant="caption" color="text.disabled"
  sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>
  Your payment info is encrypted and never stored by us.
</Typography>
```

**Required imports to add:**
```tsx
import { Lock, CreditCard } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
```

Remove the old Stripe redirect box and the separate "Pay" button that was outside the card.

**Footer:** `<FooterNav onPrevious={() => navigate('/renew/plan')} hideContinue />` — unchanged.

---

## That's the only change. Do not touch any other files.
