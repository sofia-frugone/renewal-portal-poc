# Session Prompt — 5 fixes for Your Plan page

> Read CLAUDE.md before writing any code.

---

## Fix 1 — Expandable inclusions on plan cards

Each horizontal plan card in the left column should have a "View inclusions" toggle that expands to show the full inclusions list inline.

Add state:
```tsx
const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
```

At the bottom of each plan card's CardContent, add:
```tsx
<Box sx={{ mt: 1.5 }}>
  <Button
    size="small"
    variant="text"
    onClick={e => { e.stopPropagation(); setExpandedPlan(expandedPlan === plan.name ? null : plan.name); }}
    endIcon={expandedPlan === plan.name ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    sx={{ color: '#92248E', textTransform: 'none', fontSize: '0.8rem', p: 0,
      '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}
  >
    {expandedPlan === plan.name ? 'Hide inclusions' : 'View inclusions'}
  </Button>

  <Collapse in={expandedPlan === plan.name}>
    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #f3f4f6' }}>
      {plan.inclusions.map(item => (
        <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.6 }}>
          <CheckCircle sx={{ color: '#10b981', fontSize: 15, mt: '2px', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary">{item}</Typography>
        </Box>
      ))}
    </Box>
  </Collapse>
</Box>
```

Add imports: `import { Collapse } from '@mui/material';`
`import ExpandMoreIcon from '@mui/icons-material/ExpandMore';`
`import ExpandLessIcon from '@mui/icons-material/ExpandLess';`

Keep the full inclusions arrays on the plan objects (same as before):
- Basic: Towing up to 20km, Jump start & battery assistance, Flat tyre assistance
- Standard: Towing up to 50km, Emergency fuel delivery, Jump start & battery assistance, Flat tyre assistance, Accident coordination
- Premium: Towing up to 100km, Emergency fuel delivery, Jump start & battery assistance, Flat tyre assistance, Accident coordination, Lockout assistance, Caravan & trailer towing

---

## Fix 2 — Remove rego field from Edit Details dialog

In the Edit Details dialog, remove the vehicle registration TextField entirely. The dialog should only contain:
- Email address
- Phone number
- Home address

Remove this field:
```tsx
// DELETE this TextField:
<TextField label="Vehicle registration" fullWidth value={editForm.rego}
  onChange={e => setEditForm(f => ({ ...f, rego: e.target.value }))}
  ... />
```

Also remove `rego` from the `editForm` state initialiser.

---

## Fix 3 — Quiz never recommends Basic

In the `getRecommendation` function, change so the minimum recommendation is Standard:

```tsx
const getRecommendation = (answers: Record<number, string>): string => {
  const score =
    (answers[0] === 'Daily commuter' ? 2 : answers[0] === 'A few times a week' ? 1 : 0) +
    (answers[1] === 'Yes, frequently' ? 2 : answers[1] === 'Sometimes' ? 1 : 0) +
    (answers[2] === 'I tow a caravan or trailer' ? 2 : answers[2] === 'SUV or 4WD' ? 1 : 0);
  if (score >= 4) return 'Premium';
  return 'Standard'; // Never suggest Basic — minimum recommendation is Standard
};
```

---

## Fix 4 — Quiz result button: "Select this plan" + updates selectedPlan

In the quiz result screen, change the button from "Got it — view plans" to "Select this plan". On click, it should set `selectedPlan` to the quiz result AND close the quiz dialog.

```tsx
// Replace the result button:
<Button variant="contained" fullWidth
  onClick={() => {
    setSelectedPlan(quizResult!);
    setQuizOpen(false);
  }}
  sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
    textTransform: 'none', fontWeight: 600 }}>
  Select {quizResult} plan
</Button>
```

---

## Fix 5 — Right panel same height as left column

Make the right panel card stretch to match the left column height. Update the Grid container and right Grid item:

```tsx
{/* Grid container — stretch both columns to same height */}
<Grid container spacing={3} alignItems="stretch">

  {/* Left column */}
  <Grid size={8}>
    {/* existing content unchanged */}
  </Grid>

  {/* Right column */}
  <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ position: 'sticky', top: 24 }}>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* existing member summary content */}

          {/* Push Renew button to bottom */}
          <Box sx={{ mt: 'auto' }}>
            <Divider sx={{ mb: 2.5 }} />
            {/* selected plan + price + renew button + caption */}
          </Box>

        </CardContent>
      </Card>
    </Box>
  </Grid>

</Grid>
```

The key changes:
- `alignItems="stretch"` on the Grid container
- `display: 'flex', flexDirection: 'column'` on the right Grid item
- `flex: 1` on CardContent so it fills available height
- `mt: 'auto'` on the bottom section (plan + price + button) to push it to the bottom of the card

---

## Do not touch any other page or component.
