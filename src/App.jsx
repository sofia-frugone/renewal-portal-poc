import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MembershipReview from './components/MembershipReview'
import Footer from './components/Footer'

const theme = {
  name: 'Toyota Roadside Assistance',
  colors: {
    primary: '#0D1B2A',
    primaryLight: '#1B2D45',
    accent: '#D42B2B',
    accentDark: '#B91C1C',
  },
}

const member = {
  firstName: 'Michael',
  renewalCount: 3,
  plan: {
    name: 'Toyota Standard',
    inclusions: [
      'Towing up to 50km',
      'Emergency fuel delivery',
      'Jump start assistance',
      'Tyre assistance',
      'Accident coordination',
    ],
    expiryDate: '30 April 2026',
  },
  renewal: {
    price: 109.0,
    period: 'year',
  },
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-grey">
      <Navbar brandName={theme.name} />
      <Hero firstName={member.firstName} renewalCount={member.renewalCount} />
      <MembershipReview plan={member.plan} renewal={member.renewal} />
      <Footer brandName={theme.name} />
    </div>
  )
}

export default App
