# Session Prompt — Downgrade deterrence: loss framing + confirmation modal + reason

> Read CLAUDE.md before writing any code.

---

## Overview

When a user selects a plan lower than their current plan, three things happen:
1. A warning banner appears in the top card listing what they'll lose
2. Clicking Renew with a downgrade selected opens a confirmation modal
3. The modal asks for a reason before allowing them to continue

---

## New state in `src/pages/YourPlan.tsx`

```tsx
const PLAN_RANK: Record<string, number> = { Basic: 1, Standard: 2, Premium: 3 };

const DOWNGRADE_LOSSES: Record<string, Record<string, string[]>> = {
  Standard: {
    Basic: ['Towing up to 50km (reduced to 20km)', 'Emergency fuel delivery', 'Accident coordination'],
  },
  Premium: {
    Standard: ['Towing up to 100km (reduced to 50km)', 'Lockout assistance', 'Caravan & trailer towing'],
    Basic: ['Towing up to 100km (reduced to 20km)', 'Emergency fuel delivery', 'Lockout assistance', 'Accident coordination', 'Caravan & trailer towing'],
  },
};

const DOWNGRADE_REASONS = [
  'Too expensive',
  "I don't need the extra cover",
  'Moving to another provider',
  'Other',
];

const isDowngrade = PLAN_RANK[selectedPlan] < PLAN_RANK[CURRENT_PLAN];
const lostFeatures = isDowngrade ? (DOWNGRADE_LOSSES[CURRENT_PLAN]?.[selectedPlan] ?? []) : [];

const [downgradeModalOpen, setDowngradeModalOpen] = useState(false);
const [downgradeReason, setDowngradeReason] = useState('');
```

---

## Change 1 — Warning banner in top card (show only when downgrading)

Add this between the Renew button and the upgrade nudge strip. Show only when `isDowngrade === true`:

```tsx
{isDowngrade && (
  <Box sx={{
    backgroundColor: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: 2,
    px: 2,
    py: 1.5,
    mb: 2,
  }}>
    <Typography variant="body2" fontWeight={600} sx={{ color: '#92400e', mb: 0.75 }}>
      ⚠️ You'll lose these features by switching to {selectedPlan}:
    </Typography>
    {lostFeatures.map(feature => (
      <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
        <Typography sx={{ color: '#ef4444', fontSize: '0.8rem', mt: '1px' }}>✕</Typography>
        <Typography variant="body2" color="text.secondary">{feature}</Typography>
      </Box>
    ))}
  </Box>
)}
```

---

## Change 2 — Intercept Renew button if downgrade

Change the Renew button's onClick to check for downgrade first:

```tsx
onClick={() => {
  if (isDowngrade) {
    setDowngradeReason('');
    setDowngradeModalOpen(true);
  } else {
    navigate('/renew/payment');
  }
}}
```

---

## Change 3 — Downgrade confirmation modal

```tsx
<Dialog open={downgradeModalOpen} onClose={() => setDowngradeModalOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ fontWeight: 700 }}>
    Before you downgrade
  </DialogTitle>
  <DialogContent>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      You're switching from <strong>{CURRENT_PLAN}</strong> to <strong>{selectedPlan}</strong>.
      You'll permanently lose access to these features on renewal:
    </Typography>

    {/* Loss list */}
    <Box sx={{ backgroundColor: '#fef2f2', borderRadius: 2, px: 2, py: 1.5, mb: 3 }}>
      {lostFeatures.map(feature => (
        <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
          <Typography sx={{ color: '#ef4444', fontSize: '0.85rem', mt: '1px' }}>✕</Typography>
          <Typography variant="body2">{feature}</Typography>
        </Box>
      ))}
    </Box>

    {/* Reason selector */}
    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
      Help us understand why (required)
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {DOWNGRADE_REASONS.map(reason => (
        <Box key={reason}
          onClick={() => setDowngradeReason(reason)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 2, py: 1.25, borderRadius: 2, cursor: 'pointer',
            border: downgradeReason === reason ? '2px solid #92248E' : '1px solid #e5e7eb',
            backgroundColor: downgradeReason === reason ? '#fdf4ff' : 'transparent',
            transition: 'all 0.15s ease',
            '&:hover': { borderColor: '#92248E', backgroundColor: '#fdf4ff' },
          }}>
          <Box sx={{
            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
            border: downgradeReason === reason ? '5px solid #92248E' : '2px solid #d1d5db',
            transition: 'all 0.15s ease',
          }} />
          <Typography variant="body2">{reason}</Typography>
        </Box>
      ))}
    </Box>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1 }}>
    {/* Primary — keep current plan */}
    <Button variant="contained" fullWidth
      onClick={() => { setDowngradeModalOpen(false); setSelectedPlan(CURRENT_PLAN); }}
      sx={{
        borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.25,
        background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
        '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
      }}>
      Keep {CURRENT_PLAN}
    </Button>

    {/* Secondary — continue with downgrade (only enabled when reason selected) */}
    <Button variant="text" fullWidth disabled={!downgradeReason}
      onClick={() => { setDowngradeModalOpen(false); navigate('/renew/payment'); }}
      sx={{
        textTransform: 'none', color: '#6b7280', fontSize: '0.85rem',
        '&:hover': { color: '#374151', backgroundColor: 'transparent' },
        '&.Mui-disabled': { color: '#d1d5db' },
      }}>
      Continue with {selectedPlan}
    </Button>
  </DialogActions>
</Dialog>
```

---

## Behaviour summary

| Action | Result |
|---|---|
| Select lower plan | Yellow warning banner shows in top card listing lost features |
| Click Renew (upgrade or same plan) | Navigate directly to /renew/payment |
| Click Renew (downgrade) | Modal opens |
| Modal — select reason + "Keep Standard/Premium" | Modal closes, selection resets to current plan |
| Modal — select reason + "Continue with Basic/Standard" | Navigate to /renew/payment |
| Modal — no reason selected | "Continue with..." button is disabled |

---

## Do not touch any other page or component.
