import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules',
      'tests',
      'e2e',
      'playwright',
      '**/*.spec.ts',
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
