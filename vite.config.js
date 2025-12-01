import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Legend-Player/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    // Performance optimizations
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  },
  // Optimize for 60fps rendering
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'jszip']
  }
})
