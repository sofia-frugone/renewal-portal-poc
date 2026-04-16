# Session Prompt — Fix greeting always sits in grey area

> Read CLAUDE.md before writing any code.

---

## Root cause

The `mt: '-96px'` (or similar) negative margin on the content wrapper in `PageLayout.tsx` pulls ALL content — including the greeting — up into the purple gradient zone. This is why the greeting appears on purple even though it's in the content area.

## Fix in `src/components/PageLayout.tsx`

Remove the negative margin entirely. Instead, reduce the hero's bottom padding so the gradient ends cleanly, and let content sit naturally below it.

```tsx
// PageLayout.tsx — updated structure:

<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ebebeb' }}>

  {/* Gradient top section: Navbar + Stepper + Title */}
  <Box sx={{ background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)' }}>
    <Navbar transparent />
    <PageHero activeStep={activeStep} title={title} />
  </Box>

  {/* Grey content area — NO negative margin, sits cleanly below gradient */}
  <Box sx={{ flex: 1, backgroundColor: '#ebebeb', pb: 6 }}>
    <Box sx={{
      maxWidth: 1100,
      width: '100%',
      mx: 'auto',
      px: 3,
      pt: 3,
      // NO mt: '-96px' here
    }}>
      {children}
    </Box>
  </Box>

</Box>
```

## Fix in `src/components/PageHero.tsx`

Reduce the bottom padding — no need for the large pb that was there to accommodate the card overlap:

```tsx
<Box sx={{
  background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
  pb: 5,
}}>
  {/* Stepper */}
  <Box sx={{ px: 3, pt: 3, pb: 4 }}>
    <RenewalStepper activeStep={activeStep} />
  </Box>

  {/* Title only — no subtitle */}
  <Box sx={{ textAlign: 'center', px: 3, pt: 0, pb: 2 }}>
    <Typography variant="h4" fontWeight={800} sx={{ color: '#fff' }}>
      {title}
    </Typography>
  </Box>
</Box>
```

---

## Result

The greeting ("Hi Michael...") will now always appear on the grey background, as the first element below the gradient, regardless of which page it's on. The cards sit below the greeting in the normal flow.

---

## No other changes.
