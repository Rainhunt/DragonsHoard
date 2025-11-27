import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/DragonsHoard/",
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: "index.html",
        table: "table/index.html"
      }
    }
  }
})
