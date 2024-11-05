import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/upload': {
        target: 'http://localhost:3002', // 后端服务器的地址
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
