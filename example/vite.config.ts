import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // required when targeting legacy browsers
    minify: 'terser',
  },
  plugins: [react(), legacy({ targets: ['defaults'] })],
});
