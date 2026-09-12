// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: { proxy: { '/api': 'http://localhost:5000' } },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || '/api'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://server-ju1f.onrender.com/', // Replace with your actual live URL
        changeOrigin: true,
        secure: false, // Required for HTTPS live targets
      },
    },
  },
});
