/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    istanbul({
      include: ['src/**/*.ts', 'src/**/*.tsx'], // Include all TS/TSX files
      exclude: ['node_modules', 'tests', 'public'], // Exclude non-source files
      extension: ['.ts', '.tsx'], // Recognize TypeScript & TSX
      requireEnv: true // Only enable coverage if VITE_COVERAGE=true
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
})
