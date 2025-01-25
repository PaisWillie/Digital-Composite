/** @type {import('tailwindcss').Config} */

import { heroui } from '@heroui/react'

export default {
  content: [
    './src/**/*.{mjs,js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [heroui()]
}
