# Session Prompt — Redesign the top membership + renew card

> Read CLAUDE.md before writing any code.

---

## Task

Replace the current single card layout in `src/pages/YourPlan.tsx` with the new layout below. Do not touch any other section.

---

## New card layout

```tsx
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', mb: 3 }}>
  <CardContent sx={{ p: 3 }}>

    {/* Row 1: Name left, chip + edit right */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="h5" fontWeight={700}>Michael Thompson</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip label="Standard" size="small" variant="outlined"
          sx={{ color: '#92248E', borderColor: '#92248E', fontWeight: 600 }} />
        <IconButton size="small" onClick={() => setEditOpen(true)}
          sx={{ color: '#6b7280', '&:hover': { color: '#92248E' } }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>

    {/* Row 2: Ref + expiry */}
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
      RSA-2024-00891 · Expires 30 April 2026
    </Typography>

    <Divider sx={{ mb: 2.5 }} />

    {/* Row 3: Price left, Renew button right */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
      <Box>
        <Typography variant="h3" fontWeight={700} color="#92248E" sx={{ lineHeight: 1 }}>
          $109.00
        </Typography>
        <Typography variant="body2" color="text.secondary">/year</Typography>
      </Box>
      <Button variant="contained" size="large"
        onClick={() => navigate('/renew/payment')}
        sx={{
          px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600,
          whiteSpace: 'nowrap',
          background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
        }}>
        Renew for $109.00
      </Button>
    </Box>

    {/* Row 4: Upgrade nudge — soft purple strip */}
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: '#fdf4ff', borderRadius: 2, px: 2, py: 1.25,
    }}>
      <Typography variant="body2" color="text.secondary">
        Upgrade to <strong>Premium</strong> for only $40 more per year
      </Typography>
      <Typography variant="body2" fontWeight={600}
        sx={{ color: '#92248E', cursor: 'pointer', whiteSpace: 'nowrap', ml: 2,
          '&:hover': { textDecoration: 'underline' } }}>
        See plan →
      </Typography>
    </Box>

  </CardContent>
</Card>
```

---

## What changes

- Name spans full left; chip + edit are pushed to the right
- Ref + expiry on second line
- Divider creates clean break between identity and action
- Price ($109) on the left, large RENEW button on the right — same row, balanced
- Upgrade nudge becomes a soft `#fdf4ff` pill strip at the bottom — present but not competing with the primary CTA
- Reassurance caption ("Renewing keeps your coverage active") is removed for brevity

## What stays the same

- Edit Dialog — still triggered by the IconButton
- Plan comparison cards (3-column section) — unchanged
- "Help me choose" card — unchanged
- Footer nav — unchanged
- All other pages — do not touch
