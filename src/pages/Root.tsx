import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { Layout } from '../components/Layout';
import { BreadCrumbs } from '../components/Breadcrumbs';
import { routes } from '../App';

import { useBreadCrumb } from '../hooks/useBreadcrumb';

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
