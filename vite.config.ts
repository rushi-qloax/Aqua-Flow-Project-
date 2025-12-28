
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Stringify the API key to ensure it's treated as a constant string in the client bundle
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true // Automatically opens browser on start
  }
});
