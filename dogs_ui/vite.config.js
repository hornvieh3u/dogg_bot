
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    // basicSsl(),
    react()
  ],
  build: {
    outDir: 'dist', // This should be the default
  },
})
