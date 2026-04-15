# Session Prompt — Fix blank white page on /renew route

> Read CLAUDE.md before writing any code.

---

## Task

The `/renew` route is rendering a blank white page. Diagnose and fix.

### Step 1 — Check the route config in App.tsx (or App.jsx)

Open the router config and confirm these routes exist and are correct:

```tsx
<Routes>
  <Route path="/renew" element={<Verify />} />
  <Route path="/renew/plan" element={<YourPlan />} />
  <Route path="/renew/payment" element={<Payment />} />
  <Route path="/renew/confirm" element={<Confirm />} />
  <Route path="*" element={<Navigate to="/renew" replace />} />
</Routes>
```

If `BrowserRouter` (or `HashRouter`) is missing as a wrapper, add it.

### Step 2 — Check Verify.tsx for import errors

Open `src/pages/Verify.tsx` and confirm:
- All imported components and icons actually exist
- No missing MUI icon imports (e.g. `CheckCircleIcon`, `VisibilityIcon` etc.) — check each import resolves
- No syntax errors

### Step 3 — Add a simple error boundary wrapper in App.tsx

If there's no error boundary, crashes render a blank page silently. Add one:

```tsx
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
          <h2>Something went wrong</h2>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
```

Wrap the router with `<ErrorBoundary>`:
```tsx
<ErrorBoundary>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</ErrorBoundary>
```

### Step 4 — Verify the dev server is serving from the right base

If using Vite, confirm `vite.config.ts` does NOT have a `base` setting that would break `/renew`. It should be:
```ts
export default defineConfig({
  plugins: [react()],
  // no base setting, or base: '/'
})
```

---

## Fix whatever is causing the blank page, then confirm all 4 routes load:
- `/renew`
- `/renew/plan`
- `/renew/payment`
- `/renew/confirm`
