/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D1B2A',
          'navy-light': '#1B2D45',
          red: '#D42B2B',
          'red-dark': '#B91C1C',
          grey: '#F4F5F7',
          'grey-dark': '#6B7280',
        },
      },
    },
  },
  plugins: [],
}
