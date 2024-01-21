import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'lcov', 'clover'],
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        'example',
        '**/*.config.js',
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
});
