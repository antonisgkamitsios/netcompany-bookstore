import { defineConfig, defaultExclude } from 'vitest/config';
import configuration from './vite.config';

export default defineConfig({
  ...configuration,
  test: {
    globals: true,
    setupFiles: './test/setup.ts',
    exclude: [...defaultExclude],
  },
});
