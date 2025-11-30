// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // 1. svgr을 import 합니다.
import path from 'path';

export default defineConfig({
  // 2. plugins 배열에 svgr()을 추가합니다.
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  build: {
    // Production 빌드 시 console.log 제거
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 모든 console.* 제거
      },
    },
    // 캐시 무효화
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
