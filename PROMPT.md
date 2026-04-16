# Session Prompt — Apply gradient hero to all pages

> Read CLAUDE.md before writing any code.

---

## Step 1 — Create a shared PageHero component

Create `src/components/PageHero.tsx`:

```tsx
import { Box, Typography } from '@mui/material';
import RenewalStepper from './RenewalStepper';

interface PageHeroProps {
  activeStep: number;
  title: string;
  subtitle?: string;
}

export default function PageHero({ activeStep, title, subtitle }: PageHeroProps) {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
      pb: 10,
    }}>
      {/* Stepper */}
      <Box sx={{ px: 3, pt: 2, pb: 1 }}>
        <RenewalStepper activeStep={activeStep} />
      </Box>

      {/* Heading */}
      <Box sx={{ textAlign: 'center', px: 3, pt: 1, pb: 2 }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mb: subtitle ? 1 : 0 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 520, mx: 'auto' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
```

---

## Step 2 — Create a shared PageLayout wrapper

Create `src/components/PageLayout.tsx` — wraps the content area (grey background) and handles the card overlap:

```tsx
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import PageHero from './PageHero';

interface PageLayoutProps {
  activeStep: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: number;
}

export default function PageLayout({ activeStep, title, subtitle, children, maxWidth = 1100 }: PageLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ebebeb' }}>

      {/* Navbar — transparent, on top of gradient */}
      <Box sx={{
        background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
      }}>
        <Navbar transparent />
        <PageHero activeStep={activeStep} title={title} subtitle={subtitle} />
      </Box>

      {/* Content — grey background, overlaps gradient via negative margin */}
      <Box sx={{
        flex: 1,
        backgroundColor: '#ebebeb',
        px: 3,
        pb: 6,
        mt: '-64px',
        maxWidth,
        width: '100%',
        mx: 'auto',
      }}>
        {children}
      </Box>

    </Box>
  );
}
```

If `Navbar` doesn't support a `transparent` prop, update `Navbar.tsx` to accept `transparent?: boolean` and when `transparent={true}`, set `backgroundColor: 'transparent'` and `boxShadow: 'none'` on the AppBar.

---

## Step 3 — Apply PageLayout to all four pages

### Verify.tsx (activeStep=0)
Wrap existing content with:
```tsx
<PageLayout activeStep={0} title="Renew your membership" subtitle="Keep your roadside coverage active. Enter your details below to get started.">
  {/* existing card + trust badges */}
</PageLayout>
```

### YourPlan.tsx (activeStep=1)
```tsx
<PageLayout activeStep={1} title="Your plan options" subtitle="Review and select the cover that's right for you.">
  {/* welcome greeting + vehicle verify card + two-column layout */}
</PageLayout>
```

### Payment.tsx (activeStep=2)
```tsx
<PageLayout activeStep={2} title="Secure checkout" subtitle="Your payment is protected and encrypted.">
  {/* existing payment card content */}
</PageLayout>
```

### Confirm.tsx (activeStep=3)
```tsx
<PageLayout activeStep={3} title="You're all set! 🎉" subtitle="Your membership has been renewed successfully.">
  {/* existing confirmation card content */}
</PageLayout>
```

---

## Important notes

- Remove any existing `PageShell` or layout wrappers from the individual pages — `PageLayout` replaces them
- The Stepper's white-on-gradient styling (from the previous prompt) should be preserved in `RenewalStepper.tsx`
- Do not change any of the actual page content (forms, cards, dialogs etc.)
- The `mt: '-64px'` on the content area creates the card overlap effect — the first Card rendered inside each page will naturally sit across the gradient/grey boundary

---

## After making changes, verify all 4 routes still load correctly:
- `/renew`, `/renew/plan`, `/renew/payment`, `/renew/confirm`
