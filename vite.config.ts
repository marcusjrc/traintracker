import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    root: './src/tests',
    setupFiles: ['./setup.ts'],
    globals: true,
  },
});
