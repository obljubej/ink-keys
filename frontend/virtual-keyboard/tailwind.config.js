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
        },
        'pale':{
          50: '#FAC9B8',
          100: '#DB8A74',
        },
        grey: '#BEBBBB', 
        black: '#000000',
      },
    },
  },
  plugins: [],
}

