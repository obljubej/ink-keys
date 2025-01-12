/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          //50 light, 100 darker
          50: '#444054',
          100: '#2f243a',
          150: '#1F1826',
          200: '#1a0d20',
        },
        'pale':{
          50: '#FAC9B8',
          100: '#DB8A74',
          150: '#B24B2E',
          200: '#8F2C0C',
        },
        grey: '#BEBBBB', 
        black: '#000000',
      },
    },
  },
  plugins: [],
}

