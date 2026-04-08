# Session Prompt — Stage 3: Payment Page

> Copy everything below this line and paste into Claude Code.

---

Read CLAUDE.md before writing any code.

Build Stage 3 — Payment at `src/pages/Payment.tsx` and wire it to `/renew/payment` in `App.tsx`.

**Page shell:** Same as Stage 2 — navbar (gradient `#4a0048 → #92248E`), stepper (active step = 2, "Payment"), grey content area (`#ebebeb`), footer nav.

**Content area — two column layout:**
```tsx
<Grid container spacing={3}>
  <Grid size={7}>  {/* Payment form */}
  <Grid size={5}>  {/* Order summary */}
</Grid>
```

---

## Left column — Payment Form Card

White Card (`borderRadius: 3`, `boxShadow: '0 2px 8px rgba(0,0,0,0.10)'`).

**Structure inside CardContent (`p: 4`):**

**Heading:**
```tsx
<Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>Complete your renewal</Typography>
<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
  Renewing Standard membership for Michael Thompson.
</Typography>
```

**Billed To section:**
```tsx
<Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>BILLED TO</Typography>
<TextField fullWidth placeholder="Full name" defaultValue="Michael Thompson"
  sx={{ mt: 1, mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
```

**Payment Details — tabs:**
Three tabs using MUI `Tabs` + `Tab`:
- Credit Card (CreditCard icon)
- Bank Transfer (AccountBalance icon)

Style the Tabs:
```tsx
<Tabs value={paymentMethod} onChange={(_, v) => setPaymentMethod(v)}
  sx={{ mb: 3, borderBottom: '1px solid #e5e7eb',
    '& .MuiTabs-indicator': { backgroundColor: '#92248E' },
    '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, color: 'text.secondary',
      '&.Mui-selected': { color: '#92248E' } } }}>
  <Tab icon={<CreditCard />} iconPosition="start" label="Credit Card" value="card" />
  <Tab icon={<AccountBalance />} iconPosition="start" label="Bank Transfer" value="bank" />
</Tabs>
```

**Credit Card form (shown when tab = "card"):**
```tsx
<Grid container spacing={2}>
  <Grid size={12}>
    <TextField fullWidth label="Card number" placeholder="1234 5678 9012 3456"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      InputProps={{ endAdornment: <InputAdornment position="end"><CreditCard sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
  </Grid>
  <Grid size={6}>
    <TextField fullWidth label="Expiry date" placeholder="MM / YY"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
  </Grid>
  <Grid size={6}>
    <TextField fullWidth label="CVV" placeholder="123"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
  </Grid>
  <Grid size={12}>
    <TextField fullWidth label="Name on card" placeholder="Michael Thompson"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
  </Grid>
</Grid>
```

**Bank Transfer tab content (shown when tab = "bank"):**
```tsx
<Alert severity="info" sx={{ borderRadius: 2 }}>
  Bank transfer details will be emailed to you after confirmation. Your membership will activate once payment is received (1-2 business days).
</Alert>
```

**CTA buttons (below form, mt: 3):**
```tsx
<Button variant="contained" fullWidth
  sx={{ py: 1.5, fontSize: '1rem', borderRadius: 2, mb: 1.5,
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
  Renew Membership — $109.00
</Button>
```

Small legal text below:
```tsx
<Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
  By renewing, you agree to our terms and conditions. Your membership will be active immediately upon payment.
</Typography>
```

---

## Right column — Order Summary Card

White Card (`borderRadius: 3`, `boxShadow: '0 2px 8px rgba(0,0,0,0.10)'`).

**Structure inside CardContent (`p: 4`):**

```tsx
<Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>ORDER SUMMARY</Typography>

<Typography variant="h6" sx={{ fontWeight: 600, mt: 1, mb: 0.5 }}>Standard Membership</Typography>
<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Annual renewal — covers 1 May 2026 to 30 April 2027</Typography>

{/* Inclusions */}
<Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>WHAT'S INCLUDED</Typography>
<Box sx={{ mt: 1, mb: 3 }}>
  {['Towing up to 50km', 'Emergency fuel delivery', 'Jump start & battery assistance',
    'Flat tyre assistance', 'Accident coordination'].map(item => (
    <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
      <CheckCircle sx={{ color: '#10b981', fontSize: 16 }} />
      <Typography variant="body2">{item}</Typography>
    </Box>
  ))}
</Box>

{/* Divider */}
<Divider sx={{ mb: 2 }} />

{/* Total */}
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
  <Typography variant="h4" sx={{ fontWeight: 700, color: '#92248E' }}>$109.00</Typography>
</Box>

{/* Security badge */}
<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 2,
  backgroundColor: '#f9fafb', borderRadius: 2, border: '1px solid #e5e7eb' }}>
  <Lock sx={{ color: '#10b981', mt: 0.25 }} />
  <Typography variant="caption" color="text.secondary">
    Guaranteed safe and secure. All transactions are encrypted and processed securely. 365 Assistance does not store your card details.
  </Typography>
</Box>
```

---

**Footer nav:**
- "Previous" → `/renew/plan`
- No "Continue" button — the CTA inside the form IS the submit action. The footer can show "Previous" only, or omit the footer entirely and rely on the in-form button.

**State:**
- `paymentMethod`: `'card' | 'bank'`, default `'card'`
- Form fields are uncontrolled (no need to wire up validation for prototype)
