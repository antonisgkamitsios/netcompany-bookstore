import { ReactNode } from 'react';
import { MemoryRouter, RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { useBreadCrumb } from '~/hooks/useBreadcrumb';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function QueryClientWrapper({ children }: { children: ReactNode }) {
  const testQueryClient = createTestQueryClient();
  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}

function renderBreadCrumbHook({ routes, currentRoute }: { routes: RouteObject[]; currentRoute: string }) {
  return renderHook(() => useBreadCrumb(routes), {
    wrapper: ({ children }) => <MemoryRouter initialEntries={[currentRoute]}>{children}</MemoryRouter>,
  });
}

function renderQueryHook<Result, Props>(render: (initialProps: Props) => Result) {
  return renderHook(render, { wrapper: QueryClientWrapper });
}

export { renderBreadCrumbHook, QueryClientWrapper, renderQueryHook };
