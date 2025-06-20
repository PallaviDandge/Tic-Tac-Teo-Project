import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Tic-Tac-Teo-Project/', // 👈 GitHub Pages path
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, // 👈 increase limit to avoid the warning (default was 500)
  },
})
