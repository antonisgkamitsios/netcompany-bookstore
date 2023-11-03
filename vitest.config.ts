import { defineConfig, defaultExclude } from 'vitest/config';
import configuration from './vite.config';

export default defineConfig({
  ...configuration,
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './test/setup.ts',
    exclude: [...defaultExclude],
  },
});
