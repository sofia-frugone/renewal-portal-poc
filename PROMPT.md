# Session Prompt — Stage 3: Plan Comparison

> Copy everything below this line and paste into Claude Code.

---

Read CLAUDE.md before writing any code.

Build Stage 3 — Plan Comparison at `src/pages/PlanComparison.tsx` and wire it to the `/renew/choose` route in `App.tsx`.

**Layout:** Same page shell as Stage 2 — navbar, stepper (active step = 2, "Choose Plan"), progress bar at 60%, content area, footer nav.

**Content area:**

Page heading:
```
Choose your plan
Your membership renews on 1 May 2026. Select the plan that's right for you.
```

Display 3 plan cards in a row using Grid v2:
```tsx
<Grid container spacing={3}>
  <Grid size={4}>  {/* Basic */}
  <Grid size={4}>  {/* Standard — current plan, highlighted */}
  <Grid size={4}>  {/* Premium */}
</Grid>
```

**Plan data:**
```ts
const plans = [
  {
    name: 'Basic',
    price: 79,
    description: 'Essential cover for everyday drivers',
    inclusions: [
      'Towing up to 20km',
      'Emergency fuel delivery',
      'Jump start assistance',
      'Flat tyre assistance',
    ],
    isCurrent: false,
    isRecommended: false,
  },
  {
    name: 'Standard',
    price: 109,
    description: 'Our most popular plan for complete peace of mind',
    inclusions: [
      'Towing up to 50km',
      'Emergency fuel delivery',
      'Jump start & battery assistance',
      'Flat tyre assistance',
      'Accident coordination',
    ],
    isCurrent: true,
    isRecommended: true,
  },
  {
    name: 'Premium',
    price: 149,
    description: 'Maximum cover for total confidence on the road',
    inclusions: [
      'Towing up to 100km',
      'Emergency fuel delivery',
      'Jump start & battery assistance',
      'Flat tyre assistance',
      'Accident coordination',
      'Key lockout assistance',
      'Caravan & trailer cover',
    ],
    isCurrent: false,
    isRecommended: false,
  },
]
```

**Plan card design:**
- All cards: `borderRadius: 3`, `height: '100%'`, hover effect (`translateY(-4px)`, deeper shadow), cursor pointer
- Current plan (Standard): `border: '2px solid #92248E'` — highlighted
- Non-current plans: `border: '1px solid #e5e7eb'`
- "Current Plan" chip on Standard card: positioned top-right, `backgroundColor: '#92248E'`, white text
- "Recommended" badge sits below the chip if both apply (Standard has both)
- Price displayed as `$109/year` in large bold text (`variant="h4"`, `fontWeight: 700`, `color: 'primary.main'`)
- Inclusions list: checkmark icon (`CheckCircle` from `@mui/icons-material`, `fontSize: 'small'`, `color: '#10b981'`) next to each item
- CTA button per card:
  - Current plan: `variant="contained"` with label "Renew with this plan"
  - Other plans: `variant="outlined"` with label "Select this plan"

**State:**
- `selectedPlan` state, default `'Standard'`
- Clicking a card or its button sets `selectedPlan`
- Selected (non-current) plan card gets `border: '2px solid #92248E'`

**Footer nav:**
- "Previous" goes back to `/renew/plan`
- "Continue" goes to `/renew/payment`, disabled until a plan is selected (default is Standard so it should be enabled immediately)

Mobile: stack cards vertically on `xs`, row on `md+`.
