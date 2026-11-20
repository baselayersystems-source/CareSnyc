import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // When your Django backend runs on :8000, uncomment to avoid CORS during development:
  // server: { proxy: { '/api': 'http://localhost:8000' } },
});
