//

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
