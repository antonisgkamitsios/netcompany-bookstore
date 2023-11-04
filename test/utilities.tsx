import { renderHook } from '@testing-library/react';
import { MemoryRouter, RouteObject } from 'react-router-dom';

import { useBreadCrumb } from '../src/hooks/useBreadcrumb';

function renderBreadCrumbHook({ routes, currentRoute }: { routes: RouteObject[]; currentRoute: string }) {
  return renderHook(() => useBreadCrumb(routes), {
    wrapper: ({ children }) => <MemoryRouter initialEntries={[currentRoute]}>{children}</MemoryRouter>,
  });
}

export { renderBreadCrumbHook };
