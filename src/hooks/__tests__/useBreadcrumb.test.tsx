import { expect, it } from 'vitest';
import { RouteObject } from 'react-router-dom';
import { renderBreadCrumbHook } from '~/test/utilities';

const testRoutes: RouteObject[] = [
  {
    path: '',
    element: <></>,
    children: [
      {
        path: '/',
        id: 'Home',
        element: <></>,
        children: [
          { path: '/child1', id: 'Child1', element: <>LOL</> },
          {
            path: '/child2',
            id: 'Child2',
            element: <>LOL</>,
            children: [{ path: 'inner-child', id: 'InnerChild', element: <></> }],
          },
        ],
      },
      {
        path: '/sibling',
        id: 'Sibling',
        element: <></>,
        children: [{ path: 'sibling-child', id: 'SiblingChild', element: <></> }],
      },
    ],
  },
];

it('should display the correct paths on start', () => {
  const currentRoute = '/';
  const { result } = renderBreadCrumbHook({ routes: testRoutes, currentRoute });
  expect(result.current).toEqual([expect.objectContaining({ path: '/', active: true })]);
});

it('should display the correct paths when on nested route', () => {
  const currentRoute = '/child2/inner-child';
  const { result } = renderBreadCrumbHook({ routes: testRoutes, currentRoute });

  expect(result.current).toHaveLength(3);
  expect(result.current).toEqual([
    expect.objectContaining({ path: '/', active: false }),
    expect.objectContaining({ path: '/child2', active: false }),
    expect.objectContaining({ path: '/child2/inner-child', active: true }),
  ]);
});
