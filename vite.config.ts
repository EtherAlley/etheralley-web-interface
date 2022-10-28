/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [nodePolyfills()], // polyfills for walletconnect
    },
  },
  define: {
    global: 'window', // replacement for walletconnect
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    deps: {
      fallbackCJS: true, // https://github.com/chakra-ui/chakra-ui/issues/6783
    },
  },
});
