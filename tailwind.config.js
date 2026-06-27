/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Schibsted Grotesk"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
      },
      colors: {
        meridian: {
          ink: '#10151B',
          dark: '#0C1118',
          navy: '#14377D',
          navyDark: '#0F2A63',
          red: '#E0223A',
          bg: '#E7EAEF',
          border: '#E4E7EC',
          muted: '#69727D',
          faint: '#9AA2AC',
          body: '#2B333C',
          chip: '#F4F6F9',
        },
      },
    },
  },
  plugins: [],
}

