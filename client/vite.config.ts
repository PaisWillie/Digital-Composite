/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import IstanbulPlugin from 'vite-plugin-istanbul'

export default defineConfig({
  build: {
    sourcemap: true // Required for proper coverage
  },
  plugins: [
    react(),
    tsconfigPaths(),
    ...(process.env.USE_BABEL_PLUGIN_ISTANBUL
      ? [
          IstanbulPlugin({
            include: [
              'src/components/pages/**/*.tsx',
              'src/components/pages/**/*.ts'
            ],
            exclude: [
              'node_modules',
              'test/',
              'src/utils',
              'src/components/Layout/SearchModal',
              ''
            ],
            extension: ['.ts', '.tsx']
          })
        ]
      : [])
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/*.spec.ts', '**/*.spec.tsx']
  }
})
