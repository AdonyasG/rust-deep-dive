import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GH Pages serves at https://<user>.github.io/<repo>/
// For user/org sites (<user>.github.io repo) or custom domains, use base: '/'
export default defineConfig({
  base: '/rust-deep-dive/',      // ← change to your repo name
  plugins: [react(), tailwindcss()],
})