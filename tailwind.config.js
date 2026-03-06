/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jazz: {
          gold: '#C9A227',
          'gold-light': '#E8C547',
          'gold-dark': '#A07E1A',
          dark: '#1A1A2E',
          'dark-2': '#16213E',
          burgundy: '#722F37',
          cream: '#FFFDF5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
