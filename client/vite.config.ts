/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import IstanbulPlugin from 'vite-plugin-istanbul'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    IstanbulPlugin({
      include: [
        'src/components/pages/**/*.tsx',
        'src/components/pages/**/*.ts'
      ],
      exclude: ['node_modules', 'tests/**', '**/*.spec.ts', '**/*.spec.tsx'],
      extension: ['.ts', '.tsx'],
      requireEnv: false, // 🔥 Ensures it always runs
      forceBuildInstrument: true // 🔥 Forces Vite to instrument files even in development
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/*.spec.ts', '**/*.spec.tsx']
  }
})
