// vitest-setup.ts
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

declare module 'vitest' {
  interface Assertion<T> extends TestingLibraryMatchers<T, void> {}
}
expect.extend(matchers);
