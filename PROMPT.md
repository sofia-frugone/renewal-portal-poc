# Session Prompt — Merge top section into single card

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/YourPlan.tsx`, replace the two-column Grid (left plan details card + right renew card) with a single full-width Card. The inclusions list is removed entirely from this section (it already appears in the plan comparison cards below).

---

## New single card layout

Replace the entire `<Grid container>` block (the one with size=8 and size=4) with this single card:

```tsx
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', mb: 3 }}>
  <CardContent sx={{ p: 3 }}>
    <Grid container spacing={3} alignItems="center">

      {/* Left — member info */}
      <Grid size={8}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>Michael Thompson</Typography>
          <Chip label="Standard" variant="outlined" size="small"
            sx={{ color: '#92248E', borderColor: '#92248E', fontWeight: 600 }} />
          <IconButton size="small" onClick={() => setEditOpen(true)}
            sx={{ color: '#6b7280', '&:hover': { color: '#92248E' } }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          RSA-2024-00891 · Expires 30 April 2026
        </Typography>
      </Grid>

      {/* Right — price + actions */}
      <Grid size={4}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1.5 }}>
            <Typography variant="h3" fontWeight={700} color="#92248E">$109.00</Typography>
            <Typography variant="body2" color="text.secondary">/year</Typography>
          </Box>

          <Button variant="contained" fullWidth sx={{
            py: 1.25, mb: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600,
            background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
          }}>
            Renew for $109.00
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5 }}>
            Renewing keeps your coverage active from 1 May 2026.
          </Typography>

          <Divider sx={{ width: '100%', mb: 1.5 }} />

          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Upgrade to Premium
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            For only $40 more per year, get extended towing and lockout cover.
          </Typography>
          <Button variant="outlined" fullWidth size="small"
            sx={{ borderRadius: 2, textTransform: 'none', color: '#92248E',
              borderColor: '#92248E', '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' } }}>
            See Premium plan
          </Button>
        </Box>
      </Grid>

    </Grid>
  </CardContent>
</Card>
```

---

## What gets removed

- The old `<Grid container>` with size=8 (plan details) and size=4 (renew card)
- The inclusions list (INCLUSIONS heading + CheckCircle list) — removed entirely from this section
- The "$109.00 / year" price line from the left side (it's now in the right column of the merged card)
- The separate renew card

---

## What stays unchanged

- Edit details Dialog — unchanged, still triggered by the edit IconButton
- Plan comparison cards (the 3-column section below) — unchanged
- "Help me choose" card — unchanged
- Footer nav — unchanged
- Quiz Dialog — unchanged

---

## Do not touch any other file.
