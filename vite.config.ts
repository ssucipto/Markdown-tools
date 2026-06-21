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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          katex: ['katex'],
          mermaid: ['mermaid'],
        },
      },
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
        statements: 55,
        branches: 40,
        functions: 50,
        lines: 55,
        'src/markdown/**': {
          statements: 60,
          branches: 45,
          functions: 55,
          lines: 60,
        },
      },
    },
  },
})
