import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
  server: {
    open: true,
    port: 4000,
    cors: true,
    // proxy: {}
  }
})
