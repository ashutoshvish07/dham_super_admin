// https://github.com/vitejs/vite/discussions/3448
// import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  define: {
    global: 'window'
  },
  server: {
    proxy: {
      '/backend': {
        target: 'http://13.232.173.109:4000/backend/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      }
    }
  }
});
