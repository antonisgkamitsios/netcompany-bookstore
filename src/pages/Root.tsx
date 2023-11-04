import { Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useBreadCrumb } from '../hooks/useBreadcrumb';
import { routes } from '../App';

function Root() {
  const flattRoutes = useBreadCrumb(routes);
  console.log(flattRoutes);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export { Root };
