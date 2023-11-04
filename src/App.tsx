import { Navigate, Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Root } from './pages/Root';
import { NotFound } from './pages/NotFound';
import { Search } from './pages/Search';
import { BookDetails } from './pages/BookDetails';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '/',
        id: 'Home',
        element: <Home />,
      },
      {
        path: 'search',
        id: 'Search',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Search />,
          },
          { id: 'Details', path: ':id', element: <BookDetails /> },
        ],
      },
      { path: 'page-not-found', element: <NotFound />, id: 'Not Found' },
      { path: '*', element: <Navigate to="page-not-found" replace={true} /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
