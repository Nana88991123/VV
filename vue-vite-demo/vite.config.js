import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.100.31:8000',
        changeOrigin: true
        //changeOrigin:true是Vite Proxy在轉送API請求時,把HTTP Request裡面的Host標題改成後端伺服器位址。
      }
    }
  }
})


