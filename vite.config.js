import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase', // Optional: Ensures camelCase naming for CSS classes
    },
  },
  build: {
    target: 'esnext', // Supports dynamic imports
  },
});
