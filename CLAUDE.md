# CLAUDE.md — Orbit Component Library Guidelines

> This file is read automatically by Claude Code at the start of every session.
> All code generated in this repository MUST adhere to these guidelines without exception.
> Component library source: https://github.com/sofia-frugone/orbit-component-library

---

## Stack

- **Framework:** React + TypeScript
- **Component library:** Material-UI (MUI) v5 — `@mui/material`, `@mui/icons-material`
- **Styling:** MUI `sx` prop with theme tokens. Tailwind utility classes permitted for layout only.
- **Theme:** Orbit ThemeContext (see below) — always wrap the app in `<ThemeProvider>`
- **Font:** Inter (load via Google Fonts)
- **Component docs:** See `docs/component-library/` (git submodule from orbit-component-library)

---

## Setup (first run only)

```bash
# Add Orbit component library as submodule
git submodule add https://github.com/sofia-frugone/orbit-component-library docs/component-library

# Install dependencies
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom

# Google Fonts (add to index.html)
# <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Brand & Design Tokens

```ts
primary:   { main: '#92248E', light: '#A04E9C', dark: '#8B1586' }  // Orbit purple
secondary: { main: '#FE4A00', light: '#FF6446', dark: '#E53700' }  // Orbit orange
gradient:  'linear-gradient(135deg, #92248E 0%, #FE4A00 100%)'
progressGradient: 'linear-gradient(90deg, #92248E 0%, #B855C7 100%)'
```

### Light Mode
```ts
background: { default: '#f9fafb', paper: '#ffffff' }
text:       { primary: '#1f2937', secondary: '#6b7280' }
border:     '#e5e7eb'
```

### Dark Mode
```ts
background: { default: '#1a1a1a', paper: '#2d2d2d' }
text:       { primary: '#f9fafb', secondary: '#9ca3af' }
border:     '#374151'
```

### Typography
```ts
fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
headings:   fontWeight 600 (h1–h6)
```

### Shape & Spacing
```ts
borderRadius: 12   // base (cards, dialogs)
button borderRadius: 8 (borderRadius: 2 in sx)
spacing: 8px scale — spacing(1)=8px, spacing(2)=16px, spacing(3)=24px
```

---

## ThemeContext (use exactly)

`src/contexts/ThemeContext.tsx`:

```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType { darkMode: boolean; toggleDarkMode: () => void; }
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('orbit_darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => { localStorage.setItem('orbit_darkMode', JSON.stringify(darkMode)); }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary:   { main: '#92248E', light: '#A04E9C', dark: '#8B1586' },
      secondary: { main: '#FE4A00', light: '#FF6446', dark: '#E53700' },
      background: { default: darkMode ? '#1a1a1a' : '#f9fafb', paper: darkMode ? '#2d2d2d' : '#ffffff' },
      text: { primary: darkMode ? '#f9fafb' : '#1f2937', secondary: darkMode ? '#9ca3af' : '#6b7280' },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 600 }, h2: { fontWeight: 600 }, h3: { fontWeight: 600 },
      h4: { fontWeight: 600 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, transition: 'all 0.2s ease-in-out' },
        },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: 8, textTransform: 'none', fontWeight: 500 } },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode: () => setDarkMode(!darkMode) }}>
      <MuiThemeProvider theme={theme}><CssBaseline />{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
```

---

## White-Label System

This portal serves multiple clients under their own brand. Client config is injected via context:

```ts
interface ClientTheme {
  clientName: string        // e.g. "Toyota Roadside Assistance"
  primaryColor: string      // e.g. "#CC0000"
  logoText: string
  supportPhone?: string
  supportEmail?: string
  footerText?: string
}
```

- All client-specific values come from `ClientThemeContext` — never hardcode
- Default/fallback is the Orbit brand (`#92248E`)
- White-label applies to: navbar, footer, email templates, plan names, support links

---

## Renewal Portal Architecture

This is a multi-step self-service renewal portal. Use the **Orbit Stepper** component for the top-level flow.

### Steps
```ts
const RENEWAL_STEPS = [
  'Verify',        // Stage 1 — Entry & identity verification
  'Your Plan',     // Stage 2 — Membership review
  'Choose Plan',   // Stage 3 — Same tier / upgrade / downgrade
  'Payment',       // Stage 4 — Payment
  'Confirmation',  // Stage 5 — Success
];
```

### Routes
```ts
/                   → redirect to /renew
/renew              → Stage 1 (Entry / verification)
/renew/plan         → Stage 2 (Membership review)
/renew/choose       → Stage 3 (Plan selection)
/renew/payment      → Stage 4 (Payment)
/renew/confirm      → Stage 5 (Confirmation)
/renew/variant-b/*  → A/B variant routes (mirror above)
```

### Stepper usage (from Orbit Stepper docs)
```tsx
<Stepper activeStep={activeStep}>
  {RENEWAL_STEPS.map((label) => (
    <Step key={label}>
      <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#92248E' }, '&.Mui-completed': { color: '#92248E' } } }}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
      </StepLabel>
    </Step>
  ))}
</Stepper>
```

### Progress bar (from Orbit Stepper docs)
```tsx
<LinearProgress
  variant="determinate"
  value={((activeStep + 1) / RENEWAL_STEPS.length) * 100}
  sx={{
    height: 8, borderRadius: 4, backgroundColor: '#e5e7eb', mb: 3,
    '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #92248E 0%, #B855C7 100%)' },
  }}
/>
```

---

## Component Rules

### ✅ Always
- Use MUI components: `Box`, `Card`, `CardContent`, `Button`, `Typography`, `AppBar`, `Toolbar`, `Stepper`, `Step`, `StepLabel`, `LinearProgress`, `Divider`, `Chip`, `Stack`, `Grid`, `TextField`, `CircularProgress`
- Use theme tokens in `sx`: `color: 'text.primary'`, `backgroundColor: 'background.paper'`, `borderColor: 'divider'`
- Use spacing tokens: `sx={{ p: 3, mb: 2, gap: 2 }}`
- Primary CTA: `variant="contained" color="primary"` with `sx={{ py: 1.5 }}`
- Secondary action: `variant="outlined"` or `variant="text"`
- Cards: `sx={{ borderRadius: 3, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}`
- Interactive cards: add `transition: 'all 0.2s ease-in-out'` and hover `transform: 'translateY(-4px)'`
- Section labels: `<Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>`
- Support dark mode — use theme tokens not hardcoded colours
- TypeScript for all components

### ❌ Never
- Hardcode colours: `color: '#1f2937'` ❌ → use `color: 'text.primary'` ✅
- Use `styled-components` or direct `emotion` (use MUI `sx` instead)
- Override theme outside `ThemeContext.tsx`
- Hardcode client-specific values (names, colours, support numbers) in components

---

## Key Component Patterns

### Membership Card (Stage 2)
```tsx
<Card sx={{ borderRadius: 3, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
  {/* Coloured header */}
  <Box sx={{ backgroundColor: 'primary.main', p: 3 }}>
    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Your Current Membership</Typography>
  </Box>
  <CardContent sx={{ p: 3 }}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>PLAN</Typography>
    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
      {clientTheme.planName}
    </Typography>
    {/* Inclusions list */}
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>WHAT'S COVERED</Typography>
    {inclusions.map(item => (
      <Typography key={item} sx={{ color: 'text.primary', fontSize: '0.875rem' }}>✓  {item}</Typography>
    ))}
    {/* Expiry */}
    <Chip label={`Expires ${expiryDate}`} color="error" size="small" sx={{ mt: 2 }} />
  </CardContent>
</Card>
```

### Renewal Panel (Stage 2)
```tsx
<Card sx={{ borderRadius: 3, border: '1px solid #e5e7eb' }}>
  <CardContent sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Renew your membership</Typography>
    <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', my: 2 }}>${price}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>per year (incl. GST)</Typography>
    <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontSize: '1rem', mb: 1.5 }}>
      Renew for ${price}
    </Button>
    <Button variant="text" color="primary" fullWidth>See other plans</Button>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
      🔒  Secure payment
    </Typography>
  </CardContent>
</Card>
```

### Page Layout (all stages)
```tsx
<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  {/* Navbar */}
  <AppBar position="static" sx={{ backgroundColor: clientTheme.primaryColor }}>
    <Toolbar>
      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>{clientTheme.logoText}</Typography>
      <Button color="inherit" size="small">Help</Button>
    </Toolbar>
  </AppBar>

  {/* Stepper header */}
  <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2 }}>
    <LinearProgress ... />
    <Stepper activeStep={activeStep}>...</Stepper>
  </Box>

  {/* Content */}
  <Box sx={{ flex: 1, overflowY: 'auto', p: 3, backgroundColor: 'background.default' }}>
    {/* Stage content */}
  </Box>

  {/* Footer nav */}
  <Box sx={{ backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', px: 3, py: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>Back</Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        {isLastStep ? 'Confirm & Pay' : 'Continue'}
      </Button>
    </Box>
  </Box>
</Box>
```

---

## Placeholder Data

Use these consistently across all screens:

```ts
member:    { name: 'Michael', surname: 'Thompson', email: 'michael.t@email.com' }
plan:      { name: 'Toyota Standard', price: 109, currency: 'AUD' }
expiry:    '30 April 2026'
renewal:   3   // 3rd year renewal
inclusions: ['Towing up to 50km', 'Emergency fuel delivery', 'Jump start & battery assistance', 'Tyre assistance', 'Accident coordination']
client:    { name: 'Toyota Roadside Assistance', primaryColor: '#CC0000', logoText: 'Toyota Roadside Assistance' }
```

---

## A/B Variants

Build A/B variants as separate route paths:
- `/renew/plan` → Version A (standard)
- `/renew/variant-b/plan` → Version B (e.g. TCPO education-led version)

Variants should differ in copy and visual hierarchy, not component structure.

---

## This is a Prototype

- Placeholder data is fine — use the values above
- Make screens clickable and navigable end-to-end
- Every stage must be reachable via the stepper
- Auth0 passwordless flow is mocked (skip real auth in prototype)
- Payment is mocked — show a realistic form but don't process real payments
