import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

import { afterEach, beforeEach } from 'vitest';
import { makeServer } from '~/server';

let server: ReturnType<typeof makeServer>;

beforeEach(() => {
  server = makeServer();
  server.logging = false;
});

afterEach(() => {
  server.shutdown();
});

export { server };
