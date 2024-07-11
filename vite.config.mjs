// https://github.com/vitejs/vite/discussions/3448
// import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: '/dham',
  define: {
    global: 'window'
  },
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      }
    }
  }
});
