import { Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useBreadCrumb } from '../hooks/useBreadcrumb';
import { routes } from '../App';
import { BreadCrumbs } from '../components/Breadcrumbs';

function Root() {
  const flattRoutes = useBreadCrumb(routes);
  return (
    <Layout>
      <BreadCrumbs routes={flattRoutes} />
      <Outlet />
    </Layout>
  );
}

export { Root };
