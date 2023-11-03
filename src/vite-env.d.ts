/// <reference types="vite/client" />
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';


declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {}
}

import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
expect.extend(matchers);