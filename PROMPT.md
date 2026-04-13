# Session Prompt — Full Prototype Rebuild (4-Stage Flow + Manual Lookup)

> Read CLAUDE.md before writing any code. Then complete every task below in order.

---

## Overview

Rebuild the prototype from scratch as a proper multi-page React app matching the confirmed 4-stage renewal flow:

1. **Verify** `/renew` — magic link auth OR manual membership lookup
2. **Your Plan** `/renew/plan` — membership review + renew/upgrade
3. **Payment** `/renew/payment` — Stripe Checkout redirect (mock)
4. **Confirmation** `/renew/confirm` — success screen

Replace all Tailwind CSS with MUI v5. Use Orbit branding throughout.

---

## Step 1 — Dependencies and cleanup

In `package.json`, ensure these are present (install if missing):
```
@mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom
```

Remove Tailwind: delete `tailwind.config.js`, `postcss.config.js`. Remove Tailwind directives from `src/index.css`. Leave `index.css` with just:
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; }
```

---

## Step 2 — Shared types and mock data

Create `src/types.ts`:
```ts
export interface ClientTheme {
  clientName: string;
  primaryColor: string;
  gradientStart: string;
  logoText: string;
  supportPhone?: string;
  supportEmail?: string;
}

export interface MembershipPlan {
  name: string;
  price: number;
  inclusions: string[];
  expiryDate: string;
}

export interface Member {
  firstName: string;
  lastName: string;
  membershipRef: string;
  rego: string;
  plan: MembershipPlan;
}
```

Create `src/mockData.ts`:
```ts
import { ClientTheme, Member } from './types';

export const clientTheme: ClientTheme = {
  clientName: 'Roadside Assistance',
  primaryColor: '#92248E',
  gradientStart: '#4a0048',
  logoText: 'Roadside Assistance',
  supportPhone: '1300 123 456',
};

export const mockMember: Member = {
  firstName: 'Michael',
  lastName: 'Thompson',
  membershipRef: 'RSA-2024-00891',
  rego: 'ABC123',
  plan: {
    name: 'Standard',
    price: 109,
    inclusions: [
      'Towing up to 50km',
      'Emergency fuel delivery',
      'Jump start & battery assistance',
      'Flat tyre assistance',
      'Accident coordination',
    ],
    expiryDate: '30 April 2026',
  },
};

export const allPlans = [
  { name: 'Basic', price: 79, inclusions: ['Towing up to 20km', 'Jump start & battery', 'Flat tyre assistance'] },
  { name: 'Standard', price: 109, inclusions: ['Towing up to 50km', 'Emergency fuel delivery', 'Jump start & battery', 'Flat tyre assistance', 'Accident coordination'], current: true },
  { name: 'Premium', price: 149, inclusions: ['Towing up to 100km', 'Emergency fuel delivery', 'Jump start & battery', 'Flat tyre assistance', 'Accident coordination', 'Lockout assistance', 'Caravan & trailer towing'] },
];
```

---

## Step 3 — Shared layout components

### `src/components/AppBar.tsx`
Orbit purple gradient navbar. Props: `logoText: string`.

```tsx
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function AppBar({ logoText }: { logoText: string }) {
  return (
    <MuiAppBar position="static" elevation={0}
      sx={{ background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)' }}>
      <Toolbar>
        <DirectionsCarIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          {logoText}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
```

### `src/components/RenewalStepper.tsx`
4-step stepper. Props: `activeStep: number`.

Steps: `['Verify', 'Your Plan', 'Payment', 'Confirmation']`

```tsx
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Verify', 'Your Plan', 'Payment', 'Confirmation'];

export default function RenewalStepper({ activeStep }: { activeStep: number }) {
  return (
    <Box sx={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', py: 2, px: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-iconContainer .Mui-active': { color: '#92248E' },
                '& .MuiStepLabel-iconContainer .Mui-completed': { color: '#92248E' },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
```

### `src/components/FooterNav.tsx`
Props: `onPrevious?: () => void`, `onContinue?: () => void`, `previousLabel?: string`, `continueLabel?: string`, `previousDisabled?: boolean`, `continueDisabled?: boolean`, `hideContinue?: boolean`.

```tsx
import { Box, Button } from '@mui/material';

export default function FooterNav({ onPrevious, onContinue, previousLabel = 'Previous',
  continueLabel = 'Continue', previousDisabled = false, continueDisabled = false, hideContinue = false }) {
  return (
    <Box sx={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', px: 3, py: 2,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button variant="outlined" onClick={onPrevious} disabled={previousDisabled}
        sx={{ borderColor: '#d1d5db', color: '#374151', '&:hover': { borderColor: '#9ca3af' } }}>
        {previousLabel}
      </Button>
      {!hideContinue && (
        <Button variant="contained" onClick={onContinue} disabled={continueDisabled}
          sx={{ background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
          {continueLabel}
        </Button>
      )}
    </Box>
  );
}
```

### `src/components/PageShell.tsx`
Wraps every page with AppBar + Stepper + scrollable content area + FooterNav.

Props: `activeStep: number`, `children: ReactNode`, `footer?: ReactNode`.

```tsx
import { Box } from '@mui/material';
import AppBar from './AppBar';
import RenewalStepper from './RenewalStepper';
import { clientTheme } from '../mockData';

export default function PageShell({ activeStep, children, footer }: {
  activeStep: number; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar logoText={clientTheme.logoText} />
      <RenewalStepper activeStep={activeStep} />
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', p: 3, backgroundColor: '#ebebeb' }}>
        {children}
      </Box>
      {footer && footer}
    </Box>
  );
}
```

---

## Step 4 — Page: Verify (`src/pages/Verify.tsx`)

Route: `/renew`  
Stepper: active step = 0

This page handles two scenarios:

### Scenario A — Magic link (token in URL)
If `?token=` is present in the URL, show a loading state for 1.5 seconds (mock validation), then navigate to `/renew/plan`.

```tsx
// Check on mount:
const params = new URLSearchParams(window.location.search);
const token = params.get('token');

// If token present: show loading card, then navigate after 1.5s
// If no token: show manual lookup form
```

**Loading state UI:**
White Card centred on grey background (`maxWidth: 480px, mx: 'auto', mt: 6`).
- CircularProgress (color `#92248E`)
- Typography: "Verifying your membership..."
- Typography variant="body2" color="text.secondary": "This will only take a moment."

### Scenario B — Manual lookup (no token)

**Expired link variant:** If URL has `?expired=true`, show an info panel ABOVE the lookup form:

```tsx
<Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
  <AlertTitle>This link has expired</AlertTitle>
  Your renewal link is only valid for 48 hours. Enter your details below to continue,
  or call us on 1300 123 456.
</Alert>
```

**Lookup form** (white Card, `maxWidth: 560px, mx: 'auto', mt: 4`):

Header:
```tsx
<Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>Find your membership</Typography>
<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
  Enter any one of the following to locate your membership.
</Typography>
```

Lookup type toggle — use MUI `ToggleButtonGroup` + `ToggleButton`:
```tsx
<ToggleButtonGroup value={lookupType} exclusive onChange={(_, v) => v && setLookupType(v)}
  sx={{ mb: 2, '& .MuiToggleButton-root.Mui-selected': { backgroundColor: '#92248E', color: '#fff',
    '&:hover': { backgroundColor: '#7a1f76' } } }}>
  <ToggleButton value="rego">Vehicle Registration</ToggleButton>
  <ToggleButton value="email">Email Address</ToggleButton>
  <ToggleButton value="ref">Membership Number</ToggleButton>
</ToggleButtonGroup>
```

Input field (label and placeholder change based on `lookupType`):
- rego: label="Registration plate", placeholder="e.g. ABC123"
- email: label="Email address", placeholder="e.g. michael@example.com"
- ref: label="Membership number", placeholder="e.g. RSA-2024-00891"

**Find button:**
```tsx
<Button variant="contained" fullWidth onClick={handleLookup}
  sx={{ mt: 2, py: 1.5, borderRadius: 2,
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
  Find my membership
</Button>
```

**handleLookup logic (mock):**
- Set `loading = true`
- After 1 second:
  - If input matches mockMember (rego 'ABC123', email contains '@', or ref 'RSA-2024-00891'): navigate to `/renew/plan`
  - Else: show error Alert below button: "We couldn't find a membership matching those details. Please check and try again, or call 1300 123 456."

**State:** `lookupType: 'rego' | 'email' | 'ref'`, `inputValue: string`, `loading: boolean`, `error: string | null`

**Footer:** `<FooterNav previousDisabled hideContinue />`  
(Previous is disabled since this is step 1; no Continue — form submit is the action)

---

## Step 5 — Page: Your Plan (`src/pages/YourPlan.tsx`)

Route: `/renew/plan`  
Stepper: active step = 1

Use the confirmed design from CLAUDE.md and previous sessions:

**Layout inside content area:**
```tsx
<Typography variant="h6" sx={{ mb: 3 }}>
  Hi Michael, welcome back.
  <Typography component="span" variant="body2" color="text.secondary" display="block">
    Your Standard membership expires on 30 April 2026.
  </Typography>
</Typography>

<Grid container spacing={3}>
  <Grid size={8}> {/* Membership card */}
  <Grid size={4}> {/* Renewal panel + upgrade card */}
</Grid>
```

**Left — Membership card** (white Card):
- Header: "Michael Thompson" + "Standard" chip (outlined, `#92248E`)
- Subheader: "RSA-2024-00891 · Expires 30 April 2026"
- Divider
- "$109.00 / year" in large bold text
- "INCLUSIONS" overline label
- List of inclusions with CheckCircle icons (`color: '#10b981'`)

**Right column — two cards stacked:**

Card 1 — Renewal panel:
- "$109.00" large bold
- "/year" muted
- "Renew for $109.00" — full width gradient contained button
- Reassurance text below: "Renewing keeps your coverage active from 1 May 2026."

Card 2 — Upgrade prompt:
- "Upgrade to Premium" bold
- "$40 more per year"
- "Compare all plans" link → opens Drawer (anchor="right", width 420px)
- Drawer shows 3 plan cards (Basic $79, Standard $109 current, Premium $149) stacked vertically
- Each plan card: plan name, price, inclusions list, "Select" button (outlined, `#92248E`). Current plan shows "Current Plan" chip instead of button.
- Selecting a plan in the drawer closes it and updates selected plan state

**Footer:** `<FooterNav previousDisabled={false} onPrevious={() => navigate('/renew')} continueLabel="Continue to Payment" onContinue={() => navigate('/renew/payment')} />`

---

## Step 6 — Page: Payment (`src/pages/Payment.tsx`)

Route: `/renew/payment`  
Stepper: active step = 2

Since payment uses Stripe Checkout (a hosted redirect), this page acts as the handoff point. Show an order summary and a clear CTA explaining the member will be redirected to Stripe.

**Layout:** Single centred column (`maxWidth: 560px, mx: 'auto'`)

**Order Summary Card** (white, `borderRadius: 3`):

```tsx
<Typography variant="overline" color="text.secondary">ORDER SUMMARY</Typography>
<Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>Standard Membership</Typography>
<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
  Annual renewal — 1 May 2026 to 30 April 2027
</Typography>

{/* Inclusions */}
<Typography variant="overline" color="text.secondary">INCLUDES</Typography>
{inclusions list with CheckCircle icons}

<Divider sx={{ my: 2 }} />

<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
  <Typography variant="h6" fontWeight={600}>Total</Typography>
  <Typography variant="h4" fontWeight={700} color="#92248E">$109.00</Typography>
</Box>

{/* Stripe handoff */}
<Box sx={{ p: 2, backgroundColor: '#f9fafb', borderRadius: 2, border: '1px solid #e5e7eb', mb: 2 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
    <OpenInNewIcon sx={{ fontSize: 18, color: '#6b7280' }} />
    <Typography variant="body2" fontWeight={500}>Secure payment via Stripe</Typography>
  </Box>
  <Typography variant="caption" color="text.secondary">
    Clicking "Pay now" will take you to Stripe's secure checkout page to enter your payment details.
    You'll be returned here once payment is complete.
  </Typography>
</Box>

<Button variant="contained" fullWidth
  sx={{ py: 1.5, fontSize: '1rem', borderRadius: 2,
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}
  onClick={() => navigate('/renew/confirm')}>
  Pay $109.00 — Secure Checkout
</Button>

<Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>
  Powered by Stripe · PCI DSS compliant · Your card details are never shared with us
</Typography>
```

**Footer:** `<FooterNav onPrevious={() => navigate('/renew/plan')} hideContinue />`

---

## Step 7 — Page: Confirmation (`src/pages/Confirmation.tsx`)

Route: `/renew/confirm`  
Stepper: active step = 3 (all steps completed)

**Layout:** Single centred column (`maxWidth: 560px, mx: 'auto'`)

**Success card** (white, `borderRadius: 3`, `p: 4`):

```tsx
{/* Icon */}
<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
  <CheckCircle sx={{ fontSize: 72, color: '#10b981' }} />
</Box>

<Typography variant="h5" fontWeight={700} textAlign="center" sx={{ mb: 1 }}>
  Membership renewed!
</Typography>
<Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
  Your Standard membership is now active until 30 April 2027.
</Typography>

<Divider sx={{ mb: 3 }} />

{/* Summary */}
<Typography variant="overline" color="text.secondary">RENEWAL SUMMARY</Typography>
<Box sx={{ mt: 1, mb: 3 }}>
  {[
    ['Member', 'Michael Thompson'],
    ['Membership No.', 'RSA-2024-00891'],
    ['Plan', 'Standard'],
    ['Valid from', '1 May 2026'],
    ['Valid to', '30 April 2027'],
    ['Amount paid', '$109.00'],
  ].map(([label, value]) => (
    <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75,
      borderBottom: '1px solid #f3f4f6' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={500}>{value}</Typography>
    </Box>
  ))}
</Box>

{/* Confirmation sent */}
<Box sx={{ p: 2, backgroundColor: '#f0fdf4', borderRadius: 2, border: '1px solid #bbf7d0', mb: 2 }}>
  <Typography variant="body2" color="#15803d">
    A confirmation email and SMS have been sent to your registered contact details.
  </Typography>
</Box>

{/* Support */}
<Typography variant="caption" color="text.secondary" textAlign="center" display="block">
  Need help? Call us on 1300 123 456
</Typography>
```

**Footer:** No footer nav — renewal is complete. No back navigation.

---

## Step 8 — App.tsx with routing

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Verify from './pages/Verify';
import YourPlan from './pages/YourPlan';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

const theme = createTheme({
  typography: { fontFamily: "'Inter', sans-serif" },
  palette: { primary: { main: '#92248E' } },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/renew" element={<Verify />} />
          <Route path="/renew/plan" element={<YourPlan />} />
          <Route path="/renew/payment" element={<Payment />} />
          <Route path="/renew/confirm" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/renew" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

---

## Done

Run `npm install` then `npm run dev`. All 4 routes should work. Test the following:
- `/renew` — shows manual lookup form
- `/renew?token=abc123` — shows loading spinner, auto-advances to `/renew/plan`
- `/renew?expired=true` — shows expired alert above lookup form
- `/renew/plan` — membership review with upgrade drawer
- `/renew/payment` — order summary + Stripe handoff CTA
- `/renew/confirm` — success screen
