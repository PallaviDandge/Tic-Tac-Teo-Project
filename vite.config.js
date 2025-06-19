import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Tic-Tac-Teo-Project/', // 👈 VERY IMPORTANT!
  plugins: [react()],
})
