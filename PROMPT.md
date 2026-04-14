# Session Prompt — Vehicle registration verification step

> Read CLAUDE.md before writing any code.

---

## Overview

Add a "Confirm your vehicle" section to the Your Plan page, between the membership card and the plan comparison cards. The member must confirm (or update) their vehicle registration before proceeding to payment. If the registration is changed, a mock Redbook API lookup verifies the vehicle details.

---

## New state in `src/pages/YourPlan.tsx`

```tsx
type VehicleVerifyState = 'idle' | 'confirmed' | 'editing' | 'looking_up' | 'found' | 'not_found';

const [vehicleState, setVehicleState] = useState<VehicleVerifyState>('idle');
const [newRego, setNewRego] = useState('');
const [regoState, setRegoState] = useState('VIC'); // default state
const [foundVehicle, setFoundVehicle] = useState<{ rego: string; description: string } | null>(null);

// Mock Redbook lookup
const handleRegoLookup = () => {
  setVehicleState('looking_up');
  setTimeout(() => {
    // Mock: ABC123 returns a valid result; anything else fails
    if (newRego.toUpperCase().replace(/\s/g, '') === 'ABC123') {
      setFoundVehicle({ rego: newRego.toUpperCase(), description: '2019 Toyota Corolla Ascent Sport · White' });
      setVehicleState('found');
    } else if (newRego.length >= 3) {
      // Simulate a successful lookup for any valid-looking plate
      setFoundVehicle({ rego: newRego.toUpperCase(), description: '2021 Mazda CX-5 Maxx Sport · Grey' });
      setVehicleState('found');
    } else {
      setVehicleState('not_found');
    }
  }, 1500);
};
```

---

## New "Confirm your vehicle" card

Insert this between the membership card and the `<Typography variant="h6">Compare plans</Typography>` heading:

```tsx
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', mb: 3 }}>
  <CardContent sx={{ p: 3 }}>

    <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
      Confirm your vehicle
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
      Please confirm the vehicle registered to this membership before renewing.
    </Typography>

    {/* Idle — show current vehicle with confirm/change options */}
    {vehicleState === 'idle' && (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#f9fafb', borderRadius: 2, px: 2.5, py: 2, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
            Current registration
          </Typography>
          <Typography variant="body1" fontWeight={600}>ABC 123 · VIC</Typography>
          <Typography variant="body2" color="text.secondary">
            2019 Toyota Corolla Ascent Sport · White
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" size="small"
            onClick={() => setVehicleState('editing')}
            sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#d1d5db',
              color: '#374151', '&:hover': { borderColor: '#92248E', color: '#92248E', backgroundColor: '#fdf4ff' } }}>
            Registration has changed
          </Button>
          <Button variant="contained" size="small"
            onClick={() => setVehicleState('confirmed')}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            This is still my vehicle
          </Button>
        </Box>
      </Box>
    )}

    {/* Confirmed */}
    {vehicleState === 'confirmed' && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5,
        backgroundColor: '#f0fdf4', borderRadius: 2, px: 2.5, py: 2 }}>
        <CheckCircle sx={{ color: '#10b981' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600}>Vehicle confirmed</Typography>
          <Typography variant="body2" color="text.secondary">
            ABC 123 · VIC — 2019 Toyota Corolla Ascent Sport · White
          </Typography>
        </Box>
        <Button size="small" variant="text"
          onClick={() => setVehicleState('idle')}
          sx={{ color: '#6b7280', textTransform: 'none', fontSize: '0.8rem' }}>
          Change
        </Button>
      </Box>
    )}

    {/* Editing — new rego entry */}
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
            select
            label="State"
            size="small"
            value={regoState}
            onChange={e => setRegoState(e.target.value)}
            sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].map(s => (
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
          <Alert severity="warning" sx={{ borderRadius: 2, mb: 1 }}>
            We couldn't find a vehicle for that registration. Please check the plate and state, or contact us on 1800 123 456.
          </Alert>
        )}
        <Button size="small" variant="text"
          onClick={() => { setVehicleState('idle'); setNewRego(''); }}
          sx={{ color: '#6b7280', textTransform: 'none', fontSize: '0.8rem' }}>
          Cancel
        </Button>
      </Box>
    )}

    {/* Looking up */}
    {vehicleState === 'looking_up' && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
        <CircularProgress size={20} sx={{ color: '#92248E' }} />
        <Typography variant="body2" color="text.secondary">
          Verifying registration with Redbook…
        </Typography>
      </Box>
    )}

    {/* Found — confirm new vehicle */}
    {vehicleState === 'found' && foundVehicle && (
      <Box>
        <Box sx={{ backgroundColor: '#f0fdf4', borderRadius: 2, px: 2.5, py: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
            Vehicle found
          </Typography>
          <Typography variant="body1" fontWeight={600}>{foundVehicle.rego} · {regoState}</Typography>
          <Typography variant="body2" color="text.secondary">{foundVehicle.description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" size="small"
            onClick={() => { setVehicleState('editing'); }}
            sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#d1d5db', color: '#374151' }}>
            That's not right
          </Button>
          <Button variant="contained" size="small"
            onClick={() => setVehicleState('confirmed')}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            Confirm this vehicle
          </Button>
        </Box>
      </Box>
    )}

  </CardContent>
</Card>
```

Add import: `import { CircularProgress, MenuItem } from '@mui/material';`
Add import: `import { Alert } from '@mui/material';` (if not already imported)

---

## Update the Renew button

The Renew button in the top membership card should be disabled until the vehicle is confirmed:

```tsx
<Button
  variant="contained"
  size="large"
  disabled={vehicleState !== 'confirmed'}
  onClick={() => { ... }}
  ...
>
  {vehicleState === 'confirmed' ? `Renew for $${selectedPlanData.price}.00` : 'Confirm vehicle to continue'}
</Button>
```

---

## Do not touch any other page or component.
