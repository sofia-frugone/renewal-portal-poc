# Session Prompt — Two-column checkout layout for Your Plan page

> Read CLAUDE.md before writing any code.

---

## Overview

Restructure the Your Plan page into a two-column checkout layout. Left column (size=8) is the plan selection area. Right column (size=4) is a sticky summary + renew panel. Vehicle verification still gates everything at the top.

---

## New page structure

```tsx
<PageShell>
  <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 4 }}>

    {/* Welcome — always visible */}
    <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
      Hi Michael, time to renew your membership.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      Your Standard plan expires on 30 April 2026. Review your options below.
    </Typography>

    {/* Vehicle verification — gates everything below */}
    {!vehicleConfirmed && <RegoVerifySection ... />}

    {/* Main two-column layout — only shown after vehicle confirmed */}
    {vehicleConfirmed && (
      <Grid container spacing={3} alignItems="flex-start">

        {/* LEFT — plan selection */}
        <Grid size={8}>

          {/* Plan comparison cards */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Choose your plan
          </Typography>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {/* 3 plan cards — same as before */}
          </Grid>

          {/* Help me choose card */}
          {/* same as before */}

        </Grid>

        {/* RIGHT — sticky summary panel */}
        <Grid size={4}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
              <CardContent sx={{ p: 3 }}>

                {/* Member identity */}
                <Typography variant="overline" color="text.secondary">Your membership</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                  Michael Thompson
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, mb: 0.5 }}>
                  <Chip label={CURRENT_PLAN} size="small" variant="outlined"
                    sx={{ color: '#92248E', borderColor: '#92248E', fontWeight: 600, fontSize: '0.7rem' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  RSA-2024-00891 · Expires 30 Apr 2026
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {confirmedRego} · {confirmedRegoState}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5, mb: 2.5 }}>
                  <Button variant="outlined" size="small" onClick={() => setEditOpen(true)}
                    sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#e5e7eb',
                      color: '#6b7280', fontSize: '0.75rem',
                      '&:hover': { borderColor: '#92248E', color: '#92248E', backgroundColor: '#fdf4ff' } }}>
                    Edit details
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => setChangeRegoOpen(true)}
                    sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#e5e7eb',
                      color: '#6b7280', fontSize: '0.75rem',
                      '&:hover': { borderColor: '#92248E', color: '#92248E', backgroundColor: '#fdf4ff' } }}>
                    Change rego
                  </Button>
                </Box>

                <Divider sx={{ mb: 2.5 }} />

                {/* Selected plan summary */}
                <Typography variant="overline" color="text.secondary">Selected plan</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5, mb: 0.5 }}>
                  <Typography variant="h5" fontWeight={700} color="#92248E">
                    {selectedPlan}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2.5 }}>
                  <Typography variant="h4" fontWeight={700} color="#1f2937">
                    ${selectedPlanData.price}.00
                  </Typography>
                  <Typography variant="body2" color="text.secondary">/year</Typography>
                </Box>

                {/* Downgrade warning */}
                {isDowngrade && (
                  <Box sx={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d',
                    borderRadius: 2, px: 2, py: 1.5, mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#92400e', mb: 0.5 }}>
                      ⚠️ Switching to {selectedPlan}
                    </Typography>
                    {lostFeatures.map(f => (
                      <Box key={f} sx={{ display: 'flex', gap: 1, mb: 0.4 }}>
                        <Typography sx={{ color: '#ef4444', fontSize: '0.8rem' }}>✕</Typography>
                        <Typography variant="body2" color="text.secondary">{f}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Renew button */}
                <Button variant="contained" fullWidth size="large"
                  onClick={() => {
                    if (isDowngrade) {
                      setDowngradeReason('');
                      setDowngradeModalOpen(true);
                    } else {
                      navigate('/renew/payment');
                    }
                  }}
                  sx={{
                    borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.5,
                    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
                  }}>
                  Renew for ${selectedPlanData.price}.00
                </Button>

                <Typography variant="caption" color="text.secondary"
                  sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>
                  🔒 Secure checkout · Cancel anytime
                </Typography>

              </CardContent>
            </Card>
          </Box>
        </Grid>

      </Grid>
    )}

  </Box>
</PageShell>
```

---

## Key implementation notes

- `position: 'sticky', top: 24` on the right panel wrapper — it follows the user as they scroll through plans
- Remove the standalone "Renew CTA" card that was below the plan comparison (it's now in the right panel)
- Remove the "Edit membership details" button from the left — it's now in the right panel as "Edit details"
- The 3 plan cards stay the same — same selection logic, same Select buttons, same ring on selected
- "Help me choose" card stays at the bottom of the left column
- Left column plan cards: use `<Grid container spacing={2.5}>` — keep all 3 plans as `size={12}` stacked vertically (one per row) since the left column is narrower now, OR keep them as `size={4}` in a nested grid (your call — stacked may be cleaner in a narrower column)

For the plan cards in the left column, **stack them vertically** (size={12} each) since size=8 col with 3 equal cards would be cramped. Each card goes full-width of the left column, horizontally laid out inside:

```tsx
// Each plan card in left column — horizontal layout (icon left, details centre, select button right)
<Card sx={{ borderRadius: 3, boxShadow: isSelected ? '0 0 0 2px #92248E, 0 2px 8px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.08)', mb: 2, cursor: 'pointer' }}
  onClick={() => setSelectedPlan(plan.name)}>
  <CardContent sx={{ p: 2.5 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

      {/* Selection indicator */}
      <Box sx={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        border: isSelected ? '6px solid #92248E' : '2px solid #d1d5db',
        transition: 'border 0.15s ease',
      }} />

      {/* Plan info */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
          <Typography variant="h6" fontWeight={700}>{plan.name}</Typography>
          {isCurrent && (
            <Chip label="Current" size="small"
              sx={{ backgroundColor: '#f3e8ff', color: '#92248E', fontWeight: 600, fontSize: '0.65rem' }} />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {plan.name === 'Basic' ? 'Towing up to 20km, jump start, flat tyre' :
           plan.name === 'Standard' ? 'Towing up to 50km, fuel delivery, accident coordination' :
           'Towing up to 100km, lockout, caravan towing, full cover'}
        </Typography>
      </Box>

      {/* Price */}
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography variant="h6" fontWeight={700} color="#92248E">${plan.price}</Typography>
        <Typography variant="caption" color="text.secondary">/year</Typography>
      </Box>

    </Box>
  </CardContent>
</Card>
```

Clicking anywhere on the card selects it (no separate Select button needed — the radio dot + ring makes selection clear).

---

## Do not touch any other page or component.
