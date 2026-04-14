# Session Prompt — Fix stepper background + right column height

> Read CLAUDE.md before writing any code.

---

## Fix 1 — Stepper background (check BOTH files)

The stepper area is still showing a white background. Check and fix in BOTH locations:

### `src/components/RenewalStepper.tsx`
The outer Box must have NO background color and NO border. Replace its sx entirely with:
```tsx
<Box sx={{ py: 2, px: 3 }}>
```
Remove any `backgroundColor`, `background`, `borderBottom`, or `border` from this Box.

### `src/components/PageShell.tsx`
Find where the `<RenewalStepper />` is rendered. If it is wrapped in a Box or Paper with a white background, remove that background too. The stepper should sit directly on whatever color is behind it with no white wrapper. Example — if you see something like:
```tsx
<Box sx={{ backgroundColor: '#fff', borderBottom: '...' }}>
  <RenewalStepper ... />
</Box>
```
Remove `backgroundColor` and `borderBottom` from that Box entirely.

---

## Fix 2 — Right column height on Your Plan page (`src/pages/YourPlan.tsx`)

The right column cards (renewal panel + upgrade card) are not stretching to match the left membership card.

Make the right column a flex column so the two cards share the full height:

```tsx
{/* Right column — size={4} Grid cell */}
<Grid size={4}>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>

    {/* Renewal panel card */}
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', flex: 1,
      display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CardContent sx={{ p: 3 }}>
        {/* existing renewal card content unchanged */}
      </CardContent>
    </Card>

    {/* Upgrade prompt card */}
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', flex: 1,
      display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CardContent sx={{ p: 3 }}>
        {/* existing upgrade card content unchanged */}
      </CardContent>
    </Card>

  </Box>
</Grid>
```

The key additions are:
- Outer Box: `display: 'flex', flexDirection: 'column', gap: 3, height: '100%'`
- Each Card: `flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'`

Also ensure the left column Card has `height: '100%'` so the Grid row height is driven by the tallest card:
```tsx
<Grid size={8}>
  <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', height: '100%' }}>
```

---

## No other changes. Do not touch any other files.
