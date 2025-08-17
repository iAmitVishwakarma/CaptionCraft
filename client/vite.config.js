import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
server: {
    proxy: {
      '/api': {
        target: 'https://captioncraft-cx47.onrender.com/', // Replace with your deployed backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
