# Session Prompt — Fix grey box around card + increase hero spacing

> Read CLAUDE.md before writing any code.

---

## Fix 1 — Remove the grey box around the card

In `src/components/PageLayout.tsx`, the content wrapper has `backgroundColor: '#ebebeb'` AND `maxWidth`/`mx: 'auto'`, which creates a floating grey box instead of a full-width background.

Fix: split it into two Boxes — the outer one handles the full-width grey background, the inner one handles the max-width constraint:

```tsx
{/* Full-width grey background */}
<Box sx={{ flex: 1, backgroundColor: '#ebebeb', pb: 6 }}>
  {/* Constrained content — no background here */}
  <Box sx={{
    maxWidth: 1100,
    width: '100%',
    mx: 'auto',
    px: 3,
    mt: '-80px', // overlap
  }}>
    {children}
  </Box>
</Box>
```

Remove `backgroundColor: '#ebebeb'` from the inner Box entirely. The grey comes from the outer Box only.

---

## Fix 2 — More space between stepper, heading, and card

In `src/components/PageHero.tsx` (or wherever the hero section is defined), increase the padding:

```tsx
<Box sx={{
  background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
  pb: 16, // increased from 10 — gives more space for the card overlap
}}>
  {/* Stepper */}
  <Box sx={{ px: 3, pt: 3, pb: 2 }}>
    <RenewalStepper activeStep={activeStep} />
  </Box>

  {/* Heading */}
  <Box sx={{ textAlign: 'center', px: 3, pt: 2, pb: 4 }}>
    <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mb: subtitle ? 1.5 : 0 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 520, mx: 'auto' }}>
        {subtitle}
      </Typography>
    )}
  </Box>
</Box>
```

And increase the card overlap to match the larger pb:
```tsx
mt: '-96px', // increased to match the larger pb on the hero
```

---

## No other changes.
