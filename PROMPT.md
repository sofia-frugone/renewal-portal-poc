# Session Prompt — Payment Page: Embedded Stripe Form + Promo Code

> Read CLAUDE.md before writing any code.

---

## Task

Update `src/pages/Payment.tsx` only. The page should have:

1. Order summary card (plan, inclusions, subtotal)
2. Promo code input + Apply button
3. Discount row + updated Amount Due (shown only when a valid promo is applied)
4. Embedded Stripe-style payment form (card fields)
5. Pay button (amount reflects any applied discount)

Do not touch any other files.

---

## State

```tsx
const [promoInput, setPromoInput] = useState('');
const [promoApplied, setPromoApplied] = useState<{ code: string; discount: number } | null>(null);
const [promoError, setPromoError] = useState<string | null>(null);

const basePrice = 109;
const amountDue = promoApplied ? basePrice - promoApplied.discount : basePrice;

// Mock valid promo codes
const PROMO_CODES: Record<string, number> = {
  RENEW10: 10,
  RENEW20: 20,
};

const handleApplyPromo = () => {
  const code = promoInput.trim().toUpperCase();
  if (PROMO_CODES[code]) {
    setPromoApplied({ code, discount: PROMO_CODES[code] });
    setPromoError(null);
  } else {
    setPromoApplied(null);
    setPromoError('This promo code is not valid. Please check and try again.');
  }
};
```

---

## Full card layout (single white Card, `borderRadius: 3`, `p: 4`, `maxWidth: 560px`, `mx: 'auto'`)

### Order summary header

```tsx
<Typography variant="overline" color="text.secondary">ORDER SUMMARY</Typography>
<Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>Standard Membership</Typography>
<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
  Annual renewal — 1 May 2026 to 30 April 2027
</Typography>

<Typography variant="overline" color="text.secondary">INCLUDES</Typography>
<Box sx={{ mt: 1, mb: 3 }}>
  {['Towing up to 50km', 'Emergency fuel delivery', 'Jump start & battery assistance',
    'Flat tyre assistance', 'Accident coordination'].map(item => (
    <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
      <CheckCircle sx={{ color: '#10b981', fontSize: 16 }} />
      <Typography variant="body2">{item}</Typography>
    </Box>
  ))}
</Box>
```

### Pricing rows

```tsx
<Divider sx={{ mb: 2 }} />

{/* Subtotal */}
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
  <Typography variant="body2" color="text.secondary">Subtotal</Typography>
  <Typography variant="body2">${basePrice.toFixed(2)}</Typography>
</Box>

{/* Discount row — only visible when promo applied */}
{promoApplied && (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
    <Typography variant="body2" color="#10b981">
      Promo ({promoApplied.code})
    </Typography>
    <Typography variant="body2" color="#10b981">
      -${promoApplied.discount.toFixed(2)}
    </Typography>
  </Box>
)}

{/* Amount due */}
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
  <Typography variant="h6" fontWeight={600}>Amount due</Typography>
  <Typography variant="h4" fontWeight={700} color="#92248E">
    ${amountDue.toFixed(2)}
  </Typography>
</Box>

<Divider sx={{ mb: 3 }} />
```

### Promo code section

```tsx
<Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>Promo code</Typography>
<Box sx={{ display: 'flex', gap: 1, mb: promoError ? 1 : 3 }}>
  <TextField
    fullWidth
    size="small"
    placeholder="Enter code"
    value={promoInput}
    onChange={e => { setPromoInput(e.target.value); setPromoError(null); }}
    disabled={!!promoApplied}
    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
  />
  {promoApplied ? (
    <Button variant="outlined" size="small"
      onClick={() => { setPromoApplied(null); setPromoInput(''); }}
      sx={{ whiteSpace: 'nowrap', borderRadius: '6px', color: '#6b7280', borderColor: '#d1d5db' }}>
      Remove
    </Button>
  ) : (
    <Button variant="outlined" size="small" onClick={handleApplyPromo}
      disabled={!promoInput.trim()}
      sx={{ whiteSpace: 'nowrap', borderRadius: '6px', color: '#92248E',
        borderColor: '#92248E', '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' } }}>
      Apply
    </Button>
  )}
</Box>

{/* Error */}
{promoError && (
  <Alert severity="error" sx={{ mb: 3, borderRadius: '6px', py: 0.5 }}>
    {promoError}
  </Alert>
)}

{/* Success */}
{promoApplied && (
  <Alert severity="success" icon={<CheckCircle fontSize="small" />}
    sx={{ mb: 3, borderRadius: '6px', py: 0.5 }}>
    {promoApplied.code} applied — ${promoApplied.discount.toFixed(2)} off your renewal.
  </Alert>
)}
```

### Embedded payment form

```tsx
<Divider sx={{ mb: 3 }} />

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
  <Lock sx={{ fontSize: 16, color: '#6b7280' }} />
  <Typography variant="body2" fontWeight={500} color="text.secondary">Secure payment</Typography>
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
          <Box sx={{ width: 32, height: 20, backgroundColor: '#1a1f71', borderRadius: '3px' }} />
          <Box sx={{ width: 32, height: 20, backgroundColor: '#eb001b', borderRadius: '3px' }} />
        </Box>
      </InputAdornment>
    )
  }}
  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />

{/* Expiry + CVC */}
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

{/* Pay button — amount updates with promo */}
<Button variant="contained" fullWidth onClick={() => navigate('/renew/confirm')}
  sx={{
    py: 1.5, fontSize: '1rem', borderRadius: '6px', textTransform: 'none', fontWeight: 600,
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
  }}>
  Pay ${amountDue.toFixed(2)}
</Button>

<Typography variant="caption" color="text.disabled"
  sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>
  Your payment info is encrypted and never stored by us.
</Typography>
```

---

## Required imports

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, Divider, Button, TextField,
  InputAdornment, Alert
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CheckCircle, Lock, CreditCard } from '@mui/icons-material';
import PageShell from '../components/PageShell';
import FooterNav from '../components/FooterNav';
```

---

## Footer

```tsx
<FooterNav onPrevious={() => navigate('/renew/plan')} hideContinue />
```

---

## Test the following

- No promo: amount due shows $109.00, Pay button says "Pay $109.00"
- Enter `RENEW10` → click Apply → green success alert, discount row shows -$10.00, amount due $99.00, Pay button says "Pay $99.00"
- Enter `RENEW20` → click Apply → -$20.00, Pay $89.00
- Enter invalid code → red error alert, no discount applied
- Click Remove → promo clears, back to $109.00
