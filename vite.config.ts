/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      include: ['src/markdown/**', 'src/lib/**', 'src/components/**'],
      thresholds: {
        statements: 40,
        branches: 30,
        functions: 35,
        lines: 40,
      },
    },
  },
})
