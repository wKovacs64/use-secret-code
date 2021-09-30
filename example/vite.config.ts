import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // required when targeting legacy browsers
    minify: 'terser',
  },
  plugins: [reactRefresh(), legacy({ targets: ['defaults'] })],
});
