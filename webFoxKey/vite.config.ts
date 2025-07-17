import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    optimizeDeps: {
    include: ['jquery', 'datatables.net']
  },
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "node_modules/datatables.net-dt/css/jquery.dataTables.min.css";`
      }
    }
  },
  
})
