# Session Prompt — Make plan selection functional

> Read CLAUDE.md before writing any code.

---

## Overview

Wire up the plan selection so clicking "Select" on a plan card updates the top membership card (price + button label). The plan chip next to the customer name is read-only and always shows the customer's current plan — it does not change.

---

## State changes in `src/pages/YourPlan.tsx`

Add two state values:

```tsx
const CURRENT_PLAN = 'Standard'; // customer's existing plan — never changes

const plans = [
  { name: 'Basic', price: 79 },
  { name: 'Standard', price: 109 },
  { name: 'Premium', price: 149 },
];

const [selectedPlan, setSelectedPlan] = useState('Standard'); // changes when user clicks Select
const selectedPlanData = plans.find(p => p.name === selectedPlan)!;
```

---

## Update the top membership card

### Plan chip — always shows CURRENT_PLAN (unchanged)
```tsx
<Chip label={CURRENT_PLAN} size="small" variant="outlined"
  sx={{ color: '#92248E', borderColor: '#92248E', fontWeight: 600 }} />
```

### Price — driven by selectedPlan
```tsx
<Typography variant="h3" fontWeight={700} color="#92248E" sx={{ lineHeight: 1 }}>
  ${selectedPlanData.price}.00
</Typography>
```

### Renew button — driven by selectedPlan
```tsx
<Button ...>
  Renew for ${selectedPlanData.price}.00
</Button>
```

### Upgrade nudge strip — hide when Premium is selected, show otherwise
```tsx
{selectedPlan !== 'Premium' && (
  <Box sx={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fdf4ff', borderRadius: 2, px: 2, py: 1.25,
  }}>
    <Typography variant="body2" color="text.secondary">
      Upgrade to <strong>Premium</strong> for only ${149 - selectedPlanData.price} more per year
    </Typography>
    <Typography variant="body2" fontWeight={600}
      sx={{ color: '#92248E', cursor: 'pointer', whiteSpace: 'nowrap', ml: 2,
        '&:hover': { textDecoration: 'underline' } }}
      onClick={() => setSelectedPlan('Premium')}>
      See plan →
    </Typography>
  </Box>
)}
```

---

## Update the plan comparison cards

Each card needs to reflect two states independently:
- **Current plan** (CURRENT_PLAN) — show "Current" badge
- **Selected plan** (selectedPlan) — show purple border ring + checkmark on button

```tsx
{plans.map(plan => {
  const isCurrent = plan.name === CURRENT_PLAN;
  const isSelected = plan.name === selectedPlan;

  return (
    <Grid size={4} key={plan.name}>
      <Card sx={{
        borderRadius: 3,
        boxShadow: isSelected
          ? '0 0 0 2px #92248E, 0 2px 8px rgba(0,0,0,0.10)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Plan name + Current badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight={700}>{plan.name}</Typography>
            {isCurrent && (
              <Chip label="Current" size="small"
                sx={{ backgroundColor: '#f3e8ff', color: '#92248E', fontWeight: 600, fontSize: '0.7rem' }} />
            )}
          </Box>

          {/* Price */}
          <Typography variant="h4" fontWeight={700} color="#92248E" sx={{ mb: 0.5 }}>
            ${plan.price}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>per year</Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Inclusions */}
          <Box sx={{ flex: 1, mb: 2 }}>
            {/* keep existing inclusions list unchanged */}
          </Box>

          {/* Select button */}
          <Button
            variant={isSelected ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => setSelectedPlan(plan.name)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              mt: 'auto',
              ...(isSelected
                ? {
                    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
                  }
                : {
                    color: '#92248E',
                    borderColor: '#92248E',
                    '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' },
                  }),
            }}
          >
            {isSelected ? `✓ ${plan.name} selected` : `Select ${plan.name}`}
          </Button>

        </CardContent>
      </Card>
    </Grid>
  );
})}
```

---

## Behaviour summary

| State | Plan chip (top card) | Price | Button label | Card border | Select button |
|---|---|---|---|---|---|
| Default | Standard (always) | $109 | Renew for $109 | Standard has ring | "✓ Standard selected" |
| User selects Basic | Standard (always) | $79 | Renew for $79 | Basic has ring | "✓ Basic selected" |
| User selects Premium | Standard (always) | $149 | Renew for $149 | Premium has ring | "✓ Premium selected" |

The upgrade nudge also updates its "$X more" text dynamically, and disappears entirely when Premium is selected.

---

## Do not touch any other page or component.
