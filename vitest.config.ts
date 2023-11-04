import { defineConfig, defaultExclude } from 'vitest/config';
import configuration from './vite.config';

export default defineConfig({
  ...configuration,
  test: {
    coverage: {
      thresholdAutoUpdate: true,
      include: ['src/**/*'],
      exclude: [
        'src/lib/index.ts',
        '**/theme.ts',
        '**/types.ts',
        '**/test/**',
        'vite.*.ts',
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.config.*',
        '**/snapshot-tests/**',
        '**/*.solution.tsx',
        '**/coverage/**',
      ],
      all: true,
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    exclude: [...defaultExclude],
  },
});
