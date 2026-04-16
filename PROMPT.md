# Session Prompt — Move page heading onto grey background

> Read CLAUDE.md before writing any code.

---

## Overview

Move the page title and subtitle out of the gradient hero and onto the grey content area with dark text. The gradient section should only contain the Navbar and Stepper.

---

## Change 1 — `src/components/PageHero.tsx`

Remove the title and subtitle from the PageHero component entirely. PageHero should only render the stepper on the gradient:

```tsx
export default function PageHero({ activeStep }: { activeStep: number }) {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
      pb: 5,
    }}>
      <Box sx={{ px: 3, pt: 3, pb: 3 }}>
        <RenewalStepper activeStep={activeStep} />
      </Box>
    </Box>
  );
}
```

Remove the `title` and `subtitle` props entirely.

---

## Change 2 — `src/components/PageLayout.tsx`

Remove `title` and `subtitle` from the PageLayout props. Pass only `activeStep` and `children` to PageHero.

In the grey content area, render the page heading as the first item before `{children}`:

```tsx
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

      <Box sx={{ background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)' }}>
        <Navbar transparent />
        <PageHero activeStep={activeStep} />
      </Box>

      <Box sx={{ flex: 1, backgroundColor: '#ebebeb', pb: 6 }}>
        <Box sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: 3, pt: 4 }}>

          {/* Page heading — on grey background, dark text */}
          <Typography variant="h4" fontWeight={800} sx={{ color: '#111827', mb: subtitle ? 0.75 : 3 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
              {subtitle}
            </Typography>
          )}

          {children}

        </Box>
      </Box>

    </Box>
  );
}
```

Keep the `title` and `subtitle` props on `PageLayout` — they're now rendered in the grey area instead of inside the gradient.

---

## No other changes. Do not touch individual page files or any other component.
