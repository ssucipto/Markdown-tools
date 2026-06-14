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
      include: ['src/index.ts', 'src/components/MarkdownViewer.tsx', 'src/types/viewer.ts'],
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
