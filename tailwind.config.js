/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},

    screens: {
      'xs': '300px',

      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },

    colors: {
      'black': '#151730',
      'white': '#ffffff',
      'navyBlue': '#1e2344',
      'blue': '#2e3866',
      'liteBlue': '#618db8',
      'deepBlue': '#2e3866',
      'themeColor': '#fa2a55',
      'liteRed': '#fae4f0',
    },
  },
  plugins: [],
}