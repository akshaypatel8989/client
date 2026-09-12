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
