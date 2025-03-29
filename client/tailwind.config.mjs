/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        arial: ['Arial', 'sans-serif']
      },
      fontSize: {
        h1: ['50px', '55px'], // Font size 50, line height 55
        h2: ['28px', '34px'], // Font size 28, line height 34
        h3: ['24px', '28px'], // Font size 24, line height 28
        h4: ['20px', '24px'], // Font size 20, line height 24
        h5: ['16px', '20px'], // Font size 16, line height 20
        body: ['16px', '20px'], // Font size 16, line height 20
        introduction: ['18px', '26px'], // Font size 18, line height 26
        boiler: ['12px', '18px'] // Font size 12, line height 18
      },
      colors: {
        bodyText: '#495965', // Light mode text color
        linkText: '#7A003C' // Light mode link color
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr));'
      },
      screens: {
        // Add custom breakpoints
        // xs: '480px', // Extra small devices
        // sm: '640px', // Small devices
        // md: '768px', // Medium devices
        // lg: '1025px', // Large devices
        ipad: '1200px', // iPad devices
        // xl: '1367px', // Extra large devices
        // '2xl': '1536px', // 2x Extra large devices
        '3xl': '1920px' // Custom breakpoint for very large screens
      }
    }
  },
  plugins: []
}
