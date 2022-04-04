import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const fs = require("fs");

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://127.0.0.1:5000/',
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(`${__dirname}/src/assets/privateKey.key`),
      cert: fs.readFileSync(`${__dirname}/src/assets/certificate.crt`),
    },
  },
})
