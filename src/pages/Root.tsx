import { Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useBreadCrumb } from '../hooks/useBreadcrumb';
import { routes } from '../App';
import { BreadCrumbs } from '../components/Breadcrumbs';
import { Box } from '@mui/material';

function Root() {
  const flattRoutes = useBreadCrumb(routes);
  return (
    <Layout>
      <Box sx={{ mt: 2 }}>
        <BreadCrumbs routes={flattRoutes} />
      </Box>
      <Outlet />
    </Layout>
  );
}

export { Root };
