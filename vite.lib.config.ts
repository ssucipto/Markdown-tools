import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.lib.json'),
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'e2e/**', 'test/**'],
      entryRoot: path.resolve(__dirname, 'src'),
      outDir: 'dist-lib',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MarkdownToolsReact',
      formats: ['es'],
      fileName: 'markdown-tools-react',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        '@tauri-apps/api/event',
      ],
      output: {
        assetFileNames: 'styles.css',
      },
    },
    outDir: 'dist-lib',
    emptyOutDir: true,
  },
})
