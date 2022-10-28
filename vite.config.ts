/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfillsDev from 'vite-plugin-node-stdlib-browser';
import nodePolyfillsBuild from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [react(), nodePolyfillsDev()], // polyfills for WalletConnect
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [nodePolyfillsBuild()], // polyfills for WalletConnect
    },
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
