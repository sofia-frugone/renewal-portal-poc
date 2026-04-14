# Session Prompt — Prototype Updates (5 changes)

> Read CLAUDE.md before writing any code. Complete each task in order.

---

## Change 1 — Remove white background from stepper (`src/components/RenewalStepper.tsx`)

Remove the white background box and bottom border from the stepper. Make it transparent so it sits cleanly against whatever is behind it.

```tsx
// Replace the outer Box sx with:
<Box sx={{ py: 2, px: 3 }}>
```

Remove `backgroundColor: '#fff'` and `borderBottom: '1px solid #e5e7eb'`.

---

## Change 2 — MFA verification on manual lookup (`src/pages/Verify.tsx`)

MFA only applies to the **manual lookup path** (not magic link — magic link is already authenticated).

### New state
```tsx
const [mfaStep, setMfaStep] = useState(false);   // true after successful lookup
const [otpValue, setOtpValue] = useState('');
const [otpError, setOtpError] = useState<string | null>(null);
const [otpLoading, setOtpLoading] = useState(false);
const MOCK_PHONE = '04XX XXX X47';  // masked phone shown to user
```

### After successful lookup
Instead of navigating to `/renew/plan`, set `setMfaStep(true)`. This replaces the lookup form with the OTP screen.

### OTP screen (shown when `mfaStep === true`)

White Card (`maxWidth: 560px, mx: 'auto', mt: 4`):

```tsx
<Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>Verify it's you</Typography>
<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
  We've sent a 6-digit code to {MOCK_PHONE}. Enter it below to continue.
</Typography>

{/* 6-digit OTP input */}
<TextField
  fullWidth
  label="Verification code"
  placeholder="123456"
  value={otpValue}
  onChange={e => { setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6)); setOtpError(null); }}
  inputProps={{ maxLength: 6, inputMode: 'numeric' }}
  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, letterSpacing: '0.3em',
    fontSize: '1.4rem', textAlign: 'center' } }}
/>

{otpError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{otpError}</Alert>}

<Button variant="contained" fullWidth disabled={otpValue.length !== 6 || otpLoading}
  onClick={handleVerifyOtp}
  sx={{ py: 1.5, borderRadius: 2,
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
  {otpLoading ? 'Verifying...' : 'Verify'}
</Button>

<Typography variant="caption" color="text.secondary"
  sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
  Didn't receive a code?{' '}
  <Typography component="span" variant="caption"
    sx={{ color: '#92248E', cursor: 'pointer', textDecoration: 'underline' }}
    onClick={() => { setOtpValue(''); setOtpError(null); }}>
    Resend code
  </Typography>
</Typography>
```

### handleVerifyOtp logic
```tsx
const handleVerifyOtp = () => {
  setOtpLoading(true);
  setTimeout(() => {
    if (otpValue === '123456' || otpValue.length === 6) {
      // Any 6-digit code passes in mock
      navigate('/renew/plan');
    } else {
      setOtpError('Incorrect code. Please try again.');
      setOtpLoading(false);
    }
  }, 1000);
};
```

Accept any 6-digit code as valid (this is a prototype — any valid-length code passes).

---

## Change 3 — Edit membership details on Plan page (`src/pages/YourPlan.tsx`)

### New state
```tsx
const [editOpen, setEditOpen] = useState(false);
const [editForm, setEditForm] = useState({
  email: 'michael.thompson@email.com',
  phone: '0412 345 678',
  rego: 'ABC123',
  address: '42 Main Street, Sydney NSW 2000',
});
```

### Edit button
Add an edit button to the membership card header, aligned to the top right:

```tsx
// In the membership card header area, add:
<IconButton size="small" onClick={() => setEditOpen(true)}
  sx={{ color: '#6b7280', '&:hover': { color: '#92248E' } }}>
  <EditIcon fontSize="small" />
</IconButton>
```

Import: `import EditIcon from '@mui/icons-material/Edit';`  
Import: `import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';`

### Edit Dialog
```tsx
<Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ fontWeight: 600 }}>Edit membership details</DialogTitle>
  <DialogContent>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField label="Email address" fullWidth value={editForm.email}
        onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      <TextField label="Phone number" fullWidth value={editForm.phone}
        onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      <TextField label="Vehicle registration" fullWidth value={editForm.rego}
        onChange={e => setEditForm(f => ({ ...f, rego: e.target.value }))}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      <TextField label="Home address" fullWidth value={editForm.address}
        onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
    </Box>
  </DialogContent>
  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button onClick={() => setEditOpen(false)} sx={{ color: '#6b7280' }}>Cancel</Button>
    <Button variant="contained" onClick={() => setEditOpen(false)}
      sx={{ background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
        '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
        borderRadius: 2 }}>
      Save changes
    </Button>
  </DialogActions>
</Dialog>
```

---

## Change 4 — Plan recommendation quiz on Plan page (`src/pages/YourPlan.tsx`)

### New state
```tsx
const [quizOpen, setQuizOpen] = useState(false);
const [quizStep, setQuizStep] = useState(0);
const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
const [quizResult, setQuizResult] = useState<string | null>(null);
```

### Quiz questions
```ts
const quizQuestions = [
  {
    question: 'How often do you drive?',
    options: ['Daily commuter', 'A few times a week', 'Occasionally'],
  },
  {
    question: 'Do you regularly drive long distances (100km+)?',
    options: ['Yes, frequently', 'Sometimes', 'Rarely or never'],
  },
  {
    question: "What best describes your vehicle?",
    options: ['Standard car or hatchback', 'SUV or 4WD', 'I tow a caravan or trailer'],
  },
];
```

### Recommendation logic
```ts
const getRecommendation = (answers: Record<number, string>): string => {
  const score =
    (answers[0] === 'Daily commuter' ? 2 : answers[0] === 'A few times a week' ? 1 : 0) +
    (answers[1] === 'Yes, frequently' ? 2 : answers[1] === 'Sometimes' ? 1 : 0) +
    (answers[2] === 'I tow a caravan or trailer' ? 2 : answers[2] === 'SUV or 4WD' ? 1 : 0);
  if (score >= 4) return 'Premium';
  if (score >= 2) return 'Standard';
  return 'Basic';
};
```

### "Help me choose" button
Add below the "Compare all plans" link on the upgrade prompt card:

```tsx
<Button size="small" variant="text" onClick={() => { setQuizOpen(true); setQuizStep(0); setQuizAnswers({}); setQuizResult(null); }}
  sx={{ color: '#92248E', textTransform: 'none', p: 0, mt: 0.5, display: 'block' }}>
  Not sure? Help me choose
</Button>
```

### Quiz Dialog

```tsx
<Dialog open={quizOpen} onClose={() => setQuizOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ fontWeight: 600 }}>
    {quizResult ? 'Your recommended plan' : `Question ${quizStep + 1} of ${quizQuestions.length}`}
  </DialogTitle>
  <DialogContent>
    {!quizResult ? (
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {quizQuestions[quizStep].question}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {quizQuestions[quizStep].options.map(option => (
            <Button key={option} variant="outlined" fullWidth
              onClick={() => {
                const newAnswers = { ...quizAnswers, [quizStep]: option };
                setQuizAnswers(newAnswers);
                if (quizStep < quizQuestions.length - 1) {
                  setQuizStep(s => s + 1);
                } else {
                  setQuizResult(getRecommendation(newAnswers));
                }
              }}
              sx={{ justifyContent: 'flex-start', py: 1.5, borderRadius: 2,
                borderColor: '#e5e7eb', color: '#1f2937', textTransform: 'none',
                '&:hover': { borderColor: '#92248E', backgroundColor: '#fdf4ff' } }}>
              {option}
            </Button>
          ))}
        </Box>
      </Box>
    ) : (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="overline" color="text.secondary">We recommend</Typography>
        <Typography variant="h3" fontWeight={700} color="#92248E" sx={{ my: 1 }}>
          {quizResult}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {quizResult === 'Premium'
            ? 'Based on your driving habits, Premium gives you the most comprehensive cover including extended towing and lockout assistance.'
            : quizResult === 'Standard'
            ? 'Standard cover is well suited to your regular driving. It covers towing up to 50km and all the essentials.'
            : 'Basic cover is a great fit for occasional drivers who mainly travel locally.'}
        </Typography>
        <Button variant="contained" fullWidth onClick={() => setQuizOpen(false)}
          sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
          Got it — view plans
        </Button>
        <Button size="small" onClick={() => { setQuizStep(0); setQuizAnswers({}); setQuizResult(null); }}
          sx={{ mt: 1.5, color: '#6b7280', textTransform: 'none' }}>
          Start over
        </Button>
      </Box>
    )}
  </DialogContent>
</Dialog>
```

---

## Change 5 — BPay and PayPal payment options (`src/pages/Payment.tsx`)

### Wallet buttons section

Replace the single Apple Pay button with a row of two wallet buttons, then add BPay at the bottom.

```tsx
{/* Wallet buttons — side by side */}
<Grid container spacing={1.5} sx={{ mb: 2 }}>
  <Grid size={6}>
    <Button fullWidth onClick={() => navigate('/renew/confirm')}
      sx={{ py: 1.4, backgroundColor: '#000', color: '#fff', borderRadius: '6px',
        textTransform: 'none', fontSize: '0.95rem', fontWeight: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
        '&:hover': { backgroundColor: '#1a1a1a' } }}>
      <Typography sx={{ fontSize: '1.2rem', lineHeight: 1, mt: '-2px' }}></Typography>
      Pay
    </Button>
  </Grid>
  <Grid size={6}>
    <Button fullWidth onClick={() => navigate('/renew/confirm')}
      sx={{ py: 1.4, backgroundColor: '#FFC439', color: '#003087', borderRadius: '6px',
        textTransform: 'none', fontSize: '0.95rem', fontWeight: 700,
        border: '1px solid #FFC439',
        '&:hover': { backgroundColor: '#f0b429' } }}>
      PayPal
    </Button>
  </Grid>
</Grid>
```

### BPay section — at the bottom, below card form, above the encrypted disclaimer

Add a collapsible BPay section using MUI `Accordion`:

```tsx
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// After the card form, before the encrypted disclaimer:
<Accordion disableGutters elevation={0}
  sx={{ mt: 2, border: '1px solid #e5e7eb', borderRadius: '6px !important',
    '&:before': { display: 'none' } }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}
    sx={{ borderRadius: '6px', minHeight: 48 }}>
    <Typography variant="body2" fontWeight={500}>Pay via BPay</Typography>
  </AccordionSummary>
  <AccordionDetails sx={{ borderTop: '1px solid #f3f4f6' }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Use the following details to pay via your bank's internet banking or app.
      Your membership will activate once payment is received (1–2 business days).
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {[
        ['Biller code', '123456'],
        ['Reference number', 'RSA-2024-00891'],
        ['Amount', `$${amountDue.toFixed(2)}`],
      ].map(([label, value]) => (
        <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between',
          py: 0.75, borderBottom: '1px solid #f9fafb' }}>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="body2" fontWeight={600}>{value}</Typography>
        </Box>
      ))}
    </Box>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
      Look for BPay in your bank's app or internet banking under "Pay bills".
    </Typography>
  </AccordionDetails>
</Accordion>
```

---

## Summary of files changed
- `src/components/RenewalStepper.tsx` — remove white background
- `src/pages/Verify.tsx` — add MFA OTP step after manual lookup
- `src/pages/YourPlan.tsx` — edit details dialog + quiz dialog + "Help me choose" button
- `src/pages/Payment.tsx` — Apple Pay + PayPal wallet row + BPay accordion

Do not touch any other files.
