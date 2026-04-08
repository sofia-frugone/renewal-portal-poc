export default function MembershipReview({ plan, renewal }) {
  const formattedPrice = `$${renewal.price.toFixed(2)}`

  return (
    <main className="flex-1 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-brand-navy mb-6">
          Your Membership
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Membership Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-brand-navy">{plan.name}</h3>
              <span className="text-xs font-medium uppercase tracking-wider text-brand-grey-dark bg-brand-grey px-3 py-1 rounded-full">
                Current Plan
              </span>
            </div>

            <p className="text-sm font-medium text-brand-grey-dark uppercase tracking-wider mb-3">
              Key Inclusions
            </p>
            <ul className="space-y-3 mb-8">
              {plan.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-4 flex items-center gap-2">
              <span className="text-sm text-brand-grey-dark">Expires:</span>
              <span className="text-sm font-semibold text-brand-red">
                {plan.expiryDate}
              </span>
            </div>
          </div>

          {/* Renewal Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col items-center text-center">
            <p className="text-sm text-brand-grey-dark mb-1">Renewal price</p>
            <p className="text-4xl font-bold text-brand-navy mb-1">
              {formattedPrice}
            </p>
            <p className="text-sm text-brand-grey-dark mb-8">
              per {renewal.period}
            </p>

            <button className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg">
              Renew for {formattedPrice}
            </button>

            <a
              href="#plans"
              className="mt-4 text-sm text-brand-navy hover:text-brand-red transition-colors underline underline-offset-2"
            >
              See other plans
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
