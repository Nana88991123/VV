import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/VV/',
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.100.31:8000',
        changeOrigin: true
      }
    }
  }
})