# CLAUDE.md — Orbit Component Library Guidelines

> This file is read automatically by Claude Code at the start of every session.
> All code MUST adhere to these guidelines. No exceptions.
> Full component docs: `docs/component-library/` (submodule from https://github.com/sofia-frugone/orbit-component-library)
> Before building any component, check: `docs/component-library/components/<category>/<ComponentName>.md`

---

## Setup (first run only)

```bash
git submodule add https://github.com/sofia-frugone/orbit-component-library docs/component-library
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom
# Add to index.html:
# <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React + TypeScript | |
| UI Library | Material-UI (MUI) v5 | Primary — use for all components |
| Icons | `@mui/icons-material` | Exclusively — no lucide-react |
| Styling | MUI `sx` prop + theme tokens | No Tailwind, no hardcoded colours |
| Auth | Auth0 (Passwordless / Magic Link) | Aligns with Orbit365 |
| Routing | react-router-dom | |
| Font | Inter | Via Google Fonts |

---

## Design Tokens

### Brand Colours
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
borderRadius: 12   // base (cards, dialogs, containers)
button:       borderRadius 8 (use sx={{ borderRadius: 2 }})
spacing:      8px scale — p:1=8px, p:2=16px, p:3=24px, p:4=32px
```

---

## ThemeContext (copy exactly — `src/contexts/ThemeContext.tsx`)

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
      MuiCard: { styleOverrides: { root: { boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, transition: 'all 0.2s ease-in-out' } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none', fontWeight: 500 } } },
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

- All client values come from `ClientThemeContext` — never hardcode
- Default/fallback: Orbit brand (`#92248E`)
- Applies to: navbar, footer, EDM templates, plan names, support links

---

## Renewal Portal Architecture

### Steps
```ts
const RENEWAL_STEPS = ['Verify', 'Your Plan', 'Choose Plan', 'Payment', 'Confirmation'];
```

### Routes
```
/renew              → Stage 1 (Entry / verification)
/renew/plan         → Stage 2 (Membership review)
/renew/choose       → Stage 3 (Plan selection)
/renew/payment      → Stage 4 (Payment)
/renew/confirm      → Stage 5 (Confirmation)
/renew/variant-b/*  → A/B variant routes
```

### Page Layout (use on every stage)
```tsx
<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  {/* Navbar */}
  <AppBar position="static" sx={{ backgroundColor: clientTheme.primaryColor }}>
    <Toolbar>
      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>{clientTheme.logoText}</Typography>
      <Button color="inherit" size="small">Help</Button>
    </Toolbar>
  </AppBar>

  {/* Progress / Stepper */}
  <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        <strong>Step {activeStep + 1} of {RENEWAL_STEPS.length}:</strong> {RENEWAL_STEPS[activeStep]}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>{Math.round(((activeStep + 1) / RENEWAL_STEPS.length) * 100)}%</strong> Complete
      </Typography>
    </Box>
    <LinearProgress variant="determinate" value={((activeStep + 1) / RENEWAL_STEPS.length) * 100}
      sx={{ height: 8, borderRadius: 4, backgroundColor: '#e5e7eb', mb: 3,
        '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #92248E 0%, #B855C7 100%)' } }} />
    <Stepper activeStep={activeStep}>
      {RENEWAL_STEPS.map((label) => (
        <Step key={label}>
          <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#92248E' }, '&.Mui-completed': { color: '#92248E' } } }}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>

  {/* Content */}
  <Box sx={{ flex: 1, overflowY: 'auto', p: 3, backgroundColor: 'background.default' }}>
    {/* Stage content */}
  </Box>

  {/* Footer nav */}
  <Box sx={{ backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', px: 3, py: 2,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="body2" color="text.secondary">Step {activeStep + 1} of {RENEWAL_STEPS.length}</Typography>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="outlined" startIcon={<ArrowBack />} onClick={handleBack} disabled={activeStep === 0} sx={{ borderRadius: 2 }}>Previous</Button>
      <Button variant="contained" endIcon={activeStep < RENEWAL_STEPS.length - 1 ? <ArrowForward /> : undefined}
        onClick={handleNext}
        sx={{ backgroundColor: '#92248E', '&:hover': { backgroundColor: '#8B1586' }, borderRadius: 2 }}>
        {activeStep === RENEWAL_STEPS.length - 1 ? 'Confirm & Pay' : 'Continue'}
      </Button>
    </Box>
  </Box>
</Box>
```

---

## Component Rules

### ✅ Always
- Theme tokens in `sx`: `color: 'text.primary'`, `backgroundColor: 'background.paper'`, `borderColor: 'divider'`
- MUI spacing: `sx={{ p: 3, mb: 2, gap: 2 }}`
- Primary CTA: `variant="contained" color="primary"` with `sx={{ py: 1.5, borderRadius: 2 }}`
- Cards: `sx={{ borderRadius: 3, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}`
- Interactive cards: `transition: 'all 0.2s ease-in-out'` + `'&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }`
- Section labels: `<Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>`
- Buttons with loading: `disabled={isLoading}` + inline `<CircularProgress size={16} color="inherit" />`
- Always clean loading state in `finally` block
- TypeScript for all components and props
- Mobile-responsive using MUI `Grid` and `useMediaQuery`

### ❌ Never
- Hardcode colours: `color: '#1f2937'` ❌ → `color: 'text.primary'` ✅
- Use Tailwind CSS classes
- Use `styled-components` or direct `emotion`
- Use `lucide-react` icons
- Override theme outside `ThemeContext.tsx`
- Hardcode client-specific values in components

---

## Key Component Patterns

### Loading Button
```tsx
<Button variant="contained" onClick={handleSubmit} disabled={isLoading}
  sx={{ backgroundColor: '#92248E', '&:hover': { backgroundColor: '#8B1586' }, borderRadius: 2, minWidth: 140 }}>
  {isLoading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CircularProgress size={16} color="inherit" /> Processing...
    </Box>
  ) : 'Renew for $109.00'}
</Button>
```

### Toast Notifications (use ToastProvider)
```tsx
// Wrap app in ToastProvider, then in any component:
const { showSuccess, showError } = useToast();
showSuccess('Membership renewed successfully!');
showError('Payment failed. Please try again.');
```

### Alert Banner (inline)
```tsx
<Alert severity="success" variant="filled" sx={{ borderRadius: 2, mb: 2 }}>
  Your membership has been renewed until 30 April 2027.
</Alert>
```

### Membership Card (Stage 2)
```tsx
<Card sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
  <Box sx={{ backgroundColor: 'primary.main', p: 3 }}>
    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Your Current Membership</Typography>
  </Box>
  <CardContent sx={{ p: 3 }}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>PLAN</Typography>
    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>{planName}</Typography>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>WHAT'S COVERED</Typography>
    {inclusions.map(item => (
      <Typography key={item} sx={{ color: 'text.primary', fontSize: '0.875rem' }}>✓  {item}</Typography>
    ))}
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
    <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontSize: '1rem', mb: 1.5, borderRadius: 2 }}>
      Renew for ${price}
    </Button>
    <Button variant="text" color="primary" fullWidth>See other plans</Button>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
      🔒  Secure payment
    </Typography>
  </CardContent>
</Card>
```

### Plan Comparison Cards (Stage 3)
```tsx
// Current plan — highlighted
<Card sx={{ borderRadius: 3, border: '2px solid #92248E', position: 'relative' }}>
  <Chip label="Current Plan" size="small" sx={{ position: 'absolute', top: 12, right: 12, backgroundColor: '#92248E', color: 'white' }} />
  ...
</Card>
// Upgrade option
<Card sx={{ borderRadius: 3, border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s ease-in-out',
  '&:hover': { border: '2px solid #92248E', transform: 'translateY(-4px)', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' } }}>
  ...
</Card>
```

### Payment Form (Stage 4)
```tsx
<Card sx={{ borderRadius: 3, border: '1px solid #e5e7eb' }}>
  <CardContent sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Payment Details</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#92248E' } } }} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Expiry" placeholder="MM/YY" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="CVV" placeholder="123" />
      </Grid>
    </Grid>
  </CardContent>
</Card>
```

---

## App Entry Point (`src/App.tsx`)
```tsx
import { ThemeProvider } from './contexts/ThemeContext';
import { ClientThemeProvider } from './contexts/ClientThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ClientThemeProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </ClientThemeProvider>
    </ThemeProvider>
  );
}
```

---

## Placeholder Data (use consistently)
```ts
member:     { name: 'Michael', surname: 'Thompson', email: 'michael.t@email.com' }
plan:       { name: 'Toyota Standard', price: 109, currency: 'AUD' }
expiry:     '30 April 2026'
renewalYear: 3  // "This is your 3rd renewal"
inclusions: ['Towing up to 50km', 'Emergency fuel delivery', 'Jump start & battery assistance', 'Tyre assistance', 'Accident coordination']
client:     { name: 'Roadside Assistance', primaryColor: '#92248E', logoText: 'Roadside Assistance' }
// ⚠️  Never use real client branding (e.g. Toyota) — prototype uses Orbit colours only
```

---

## Component Library Reference

When building a component, read the relevant doc from `docs/component-library/`:

| Component needed | Read this doc |
|-----------------|---------------|
| Button, loading button | `components/inputs/Button.md` |
| Card, metric card | `components/layout/Card.md` |
| Header / navbar | `components/layout/Header.md` |
| Sidebar | `components/layout/Sidebar.md` |
| Stepper, progress bar | `components/navigation/Stepper.md` |
| Modal / dialog | `components/feedback/Modal.md` |
| Toast / snackbar | `components/feedback/Toast.md` |
| Alert banner | `components/feedback/Alert.md` |
| Loading spinner | `components/feedback/LoadingStates.md` |
| Table / data grid | `components/data/Table.md` |
| Dropdown / menu | `components/inputs/Dropdown.md` |
| Icon usage | `components/display/Icon.md` |
| Logo | `components/display/Logo.md` |
| Theme / dark mode | `contexts/ThemeContext.md` |

---

## Prototype Notes
- Placeholder data is fine — use values above consistently
- All 5 stages must be navigable end-to-end via the stepper
- Auth0 flow is mocked — skip real auth
- Payment is mocked — realistic form, no real processing
- A/B variants live at `/renew/variant-b/*` — same structure, different copy/hierarchy
