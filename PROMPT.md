# Session Prompt — Move vehicle verification to auto-opening modal

> Read CLAUDE.md before writing any code.

---

## Overview

Remove the inline "Confirm your vehicle" card from the Plan page and replace it with a modal that auto-opens when the user first lands on `/renew/plan`. This simulates the modal appearing immediately after authentication (magic link or MFA).

---

## Changes in `src/pages/YourPlan.tsx`

### 1. Remove the inline card
Remove the entire "Confirm your vehicle" `<Card>` block that sits between the membership card and the plan comparison section. Remove it completely.

### 2. Change vehicleState initial value to open the modal on mount
```tsx
const [vehicleModalOpen, setVehicleModalOpen] = useState(true); // opens on page load
const [vehicleState, setVehicleState] = useState<VehicleVerifyState>('idle');
const [newRego, setNewRego] = useState('');
const [regoState, setRegoState] = useState('VIC');
const [foundVehicle, setFoundVehicle] = useState<{ rego: string; description: string } | null>(null);
const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
```

### 3. Vehicle verification modal

The modal is not dismissible — the user must confirm or update before they can access the page. Remove the `onClose` prop (or set it to a no-op) so clicking the backdrop doesn't close it.

```tsx
<Dialog
  open={vehicleModalOpen}
  maxWidth="sm"
  fullWidth
  disableEscapeKeyDown
>
  <DialogTitle sx={{ fontWeight: 700, pb: 0.5 }}>
    Confirm your vehicle
  </DialogTitle>
  <DialogContent>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Please confirm the vehicle registered to this membership before renewing.
    </Typography>

    {/* idle — show current vehicle */}
    {vehicleState === 'idle' && (
      <Box>
        <Box sx={{ backgroundColor: '#f9fafb', borderRadius: 2, px: 2.5, py: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
            Registered vehicle
          </Typography>
          <Typography variant="body1" fontWeight={600}>ABC 123 · VIC</Typography>
          <Typography variant="body2" color="text.secondary">
            2019 Toyota Corolla Ascent Sport · White
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button variant="contained" fullWidth
            onClick={() => { setVehicleConfirmed(true); setVehicleModalOpen(false); }}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.25,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            This is still my vehicle
          </Button>
          <Button variant="outlined" fullWidth
            onClick={() => setVehicleState('editing')}
            sx={{ borderRadius: 2, textTransform: 'none',
              borderColor: '#d1d5db', color: '#374151',
              '&:hover': { borderColor: '#92248E', color: '#92248E', backgroundColor: '#fdf4ff' } }}>
            Registration has changed
          </Button>
        </Box>
      </Box>
    )}

    {/* editing */}
    {(vehicleState === 'editing' || vehicleState === 'not_found') && (
      <Box>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
          <TextField
            label="New registration"
            size="small"
            value={newRego}
            onChange={e => setNewRego(e.target.value.toUpperCase())}
            placeholder="e.g. XYZ789"
            sx={{ flex: 1, minWidth: 140, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            select label="State" size="small" value={regoState}
            onChange={e => setRegoState(e.target.value)}
            sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            {['NSW','VIC','QLD','SA','WA','TAS','ACT','NT'].map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" size="small"
            disabled={newRego.length < 3}
            onClick={handleRegoLookup}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 2,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            Look up
          </Button>
        </Box>
        {vehicleState === 'not_found' && (
          <Alert severity="warning" sx={{ borderRadius: 2, mb: 1.5 }}>
            We couldn't find a vehicle for that registration. Please check the plate and state, or call us on 1800 123 456.
          </Alert>
        )}
        <Button size="small" variant="text"
          onClick={() => { setVehicleState('idle'); setNewRego(''); }}
          sx={{ color: '#6b7280', textTransform: 'none' }}>
          ← Back
        </Button>
      </Box>
    )}

    {/* looking up */}
    {vehicleState === 'looking_up' && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
        <CircularProgress size={20} sx={{ color: '#92248E' }} />
        <Typography variant="body2" color="text.secondary">
          Verifying with Redbook…
        </Typography>
      </Box>
    )}

    {/* found */}
    {vehicleState === 'found' && foundVehicle && (
      <Box>
        <Box sx={{ backgroundColor: '#f0fdf4', borderRadius: 2, px: 2.5, py: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>Vehicle found</Typography>
          <Typography variant="body1" fontWeight={600}>{foundVehicle.rego} · {regoState}</Typography>
          <Typography variant="body2" color="text.secondary">{foundVehicle.description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button variant="contained" fullWidth
            onClick={() => { setVehicleConfirmed(true); setVehicleModalOpen(false); }}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.25,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            Confirm this vehicle
          </Button>
          <Button variant="outlined" fullWidth
            onClick={() => { setVehicleState('editing'); setNewRego(''); }}
            sx={{ borderRadius: 2, textTransform: 'none',
              borderColor: '#d1d5db', color: '#374151' }}>
            That's not right
          </Button>
        </Box>
      </Box>
    )}

  </DialogContent>
</Dialog>
```

### 4. Keep handleRegoLookup function unchanged (same mock logic as before)

### 5. Remove the Renew button disabled state
Remove `disabled={vehicleState !== 'confirmed'}` from the Renew button — the modal forces confirmation before the user can interact with the page. Restore the button label to `Renew for $${selectedPlanData.price}.00`.

---

## Do not touch any other page or component.
