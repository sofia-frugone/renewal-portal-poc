export default function Hero({ firstName, renewalCount }) {
  const ordinal =
    renewalCount === 1
      ? '1st'
      : renewalCount === 2
        ? '2nd'
        : renewalCount === 3
          ? '3rd'
          : `${renewalCount}th`

  return (
    <section className="bg-brand-navy-light text-white py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Hi {firstName}, welcome back.
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          This is your {ordinal} renewal — thank you for being a member.
        </p>
      </div>
    </section>
  )
}
