# Session Prompt — Your Plan page layout redesign

> Read CLAUDE.md before writing any code.

---

## Overview

Redesign the Your Plan page layout. The two-column grid stays but the right column changes. Below the grid, add three inline plan comparison cards. Move "Help me choose" below those. Do not touch the left membership card.

---

## Change 1 — Right column: remove upgrade card, merge upgrade prompt into renew card

Remove the separate upgrade prompt card (the second card in the right column) entirely.

The right column now has **one card only** — the renew card.

Inside the renew card, after the reassurance text, add a divider and an upgrade nudge:

```tsx
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
  <CardContent sx={{ p: 3 }}>

    {/* Price */}
    <Typography variant="h3" fontWeight={700} color="#92248E">
      $109.00
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      /year
    </Typography>

    {/* Renew CTA */}
    <Button variant="contained" fullWidth sx={{
      py: 1.5, mb: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600,
      background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
      '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
    }}>
      Renew for $109.00
    </Button>

    {/* Reassurance */}
    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2.5 }}>
      Renewing keeps your coverage active from 1 May 2026.
    </Typography>

    <Divider sx={{ mb: 2 }} />

    {/* Upgrade nudge */}
    <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
      Upgrade to Premium
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
      For only $40 more per year, get extended towing and lockout cover.
    </Typography>
    <Button variant="outlined" fullWidth size="small"
      sx={{ borderRadius: 2, textTransform: 'none', color: '#92248E',
        borderColor: '#92248E', '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' } }}>
      See Premium plan
    </Button>

  </CardContent>
</Card>
```

---

## Change 2 — Add three plan comparison cards below the grid

After the closing `</Grid>` of the main container, add a three-column plan comparison section. This is full-width, below the grid.

```tsx
{/* Plan comparison section */}
<Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
  Compare plans
</Typography>
<Grid container spacing={3}>
  {[
    {
      name: 'Basic',
      price: 79,
      current: false,
      inclusions: [
        'Towing up to 20km',
        'Jump start & battery assistance',
        'Flat tyre assistance',
      ],
    },
    {
      name: 'Standard',
      price: 109,
      current: true,
      inclusions: [
        'Towing up to 50km',
        'Emergency fuel delivery',
        'Jump start & battery assistance',
        'Flat tyre assistance',
        'Accident coordination',
      ],
    },
    {
      name: 'Premium',
      price: 149,
      current: false,
      inclusions: [
        'Towing up to 100km',
        'Emergency fuel delivery',
        'Jump start & battery assistance',
        'Flat tyre assistance',
        'Accident coordination',
        'Lockout assistance',
        'Caravan & trailer towing',
      ],
    },
  ].map(plan => (
    <Grid size={4} key={plan.name}>
      <Card sx={{
        borderRadius: 3,
        boxShadow: plan.current ? '0 0 0 2px #92248E, 0 2px 8px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.10)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Plan name + current badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight={700}>{plan.name}</Typography>
            {plan.current && (
              <Chip label="Current" size="small"
                sx={{ backgroundColor: '#f3e8ff', color: '#92248E', fontWeight: 600, fontSize: '0.7rem' }} />
            )}
          </Box>

          {/* Price */}
          <Typography variant="h4" fontWeight={700} color="#92248E" sx={{ mb: 0.5 }}>
            ${plan.price}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            per year
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Inclusions */}
          <Box sx={{ flex: 1, mb: 2 }}>
            {plan.inclusions.map(item => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                <CheckCircle sx={{ color: '#10b981', fontSize: 16, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Box>

          {/* Select button — full width, pinned to bottom */}
          <Button
            variant={plan.current ? 'outlined' : 'contained'}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              mt: 'auto',
              ...(plan.current
                ? { color: '#92248E', borderColor: '#92248E',
                    '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' } }
                : { background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }),
            }}
          >
            {plan.current ? 'Current plan' : `Select ${plan.name}`}
          </Button>

        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
```

---

## Change 3 — Move "Help me choose" card below the plan comparison section

The existing "Help me choose" full-width card should appear after the plan comparison Grid, not before it.

Ensure the order is:
1. Welcome message
2. Main 2-column Grid (plan details left, renew card right)
3. "Compare plans" heading + 3-column plan cards
4. "Not sure which plan is right for you?" help card
5. Footer nav

---

## Also remove

Remove the existing plan comparison Drawer (the one triggered by "Compare all plans" link) — it is no longer needed since plans are now shown inline. Remove any `drawerOpen` state and the `<Drawer>` component entirely.

---

## Do not touch

- Left membership card (size=8) — unchanged
- Edit details dialog — unchanged  
- Quiz dialog — unchanged (still triggered by "Help me choose" button)
- Footer nav — unchanged
- Any other page or shared component
