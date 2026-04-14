# Session Prompt — Move Renew button below plan comparison cards

> Read CLAUDE.md before writing any code.

---

## Overview

Move the price and Renew button out of the top membership card and into a prominent CTA section below the plan comparison cards. The membership card becomes a clean identity/details card only.

---

## Change 1 — Simplify the membership card

Remove the price, Renew button, and upgrade nudge strip from the top membership card. The card should now only contain:

```tsx
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', mb: 3 }}>
  <CardContent sx={{ p: 3 }}>

    {/* Row 1: Name + chip + edit */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="h5" fontWeight={700}>Michael Thompson</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip label={CURRENT_PLAN} size="small" variant="outlined"
          sx={{ color: '#92248E', borderColor: '#92248E', fontWeight: 600 }} />
        <Button variant="outlined" size="small" onClick={() => setEditOpen(true)}
          sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#92248E', color: '#92248E',
            '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' } }}>
          Edit membership details
        </Button>
      </Box>
    </Box>

    {/* Row 2: Ref + expiry */}
    <Typography variant="body2" color="text.secondary">
      RSA-2024-00891 · Expires 30 April 2026
    </Typography>

    {/* Row 3: Vehicle (shown after confirmation) */}
    {vehicleConfirmed && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {confirmedRego} · {confirmedRegoState} — {confirmedVehicleDesc}
        </Typography>
        <Typography variant="body2"
          sx={{ color: '#92248E', cursor: 'pointer', textDecoration: 'underline',
            '&:hover': { color: '#7a1f76' } }}
          onClick={() => setChangeRegoOpen(true)}>
          Change
        </Typography>
      </Box>
    )}

  </CardContent>
</Card>
```

---

## Change 2 — Add CTA section below plan comparison cards

Insert this block after the closing `</Grid>` of the plan comparison cards, before the "Help me choose" card:

```tsx
{/* Renew CTA */}
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', my: 3 }}>
  <CardContent sx={{ p: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
          Selected plan
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h4" fontWeight={700} color="#92248E">
            {selectedPlan}
          </Typography>
          <Typography variant="h5" fontWeight={700} color="#92248E">
            · ${selectedPlanData.price}.00
          </Typography>
          <Typography variant="body2" color="text.secondary">/year</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          if (isDowngrade) {
            setDowngradeReason('');
            setDowngradeModalOpen(true);
          } else {
            navigate('/renew/payment');
          }
        }}
        sx={{
          px: 5, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600,
          whiteSpace: 'nowrap', fontSize: '1rem',
          background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
        }}
      >
        Renew for ${selectedPlanData.price}.00
      </Button>
    </Box>

    {/* Downgrade warning — show inline here if applicable */}
    {isDowngrade && (
      <Box sx={{
        mt: 2, backgroundColor: '#fffbeb', border: '1px solid #fcd34d',
        borderRadius: 2, px: 2, py: 1.5,
      }}>
        <Typography variant="body2" fontWeight={600} sx={{ color: '#92400e', mb: 0.5 }}>
          ⚠️ Switching to {selectedPlan} — you'll lose:
        </Typography>
        {lostFeatures.map(f => (
          <Box key={f} sx={{ display: 'flex', gap: 1, mb: 0.4 }}>
            <Typography sx={{ color: '#ef4444', fontSize: '0.8rem' }}>✕</Typography>
            <Typography variant="body2" color="text.secondary">{f}</Typography>
          </Box>
        ))}
      </Box>
    )}
  </CardContent>
</Card>
```

---

## No other changes. Do not touch any other file.
