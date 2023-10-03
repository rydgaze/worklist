/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
  ],  theme: {
    extend: {
      colors: {
        primary: '#4f515a',
        secondary: '#EBEBEB',
        warning: '#da0f41' 
      },
      fontFamily: {
        content: ['Nunito']
      }
    },
  },
  plugins: [],
}

