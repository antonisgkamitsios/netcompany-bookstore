import { Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadCrumbs, Link as MuiLink, Typography } from '@mui/material';

import { BreadCrumbRoute } from '../hooks/useBreadcrumb';

function BreadCrumbs({ routes }: { routes: BreadCrumbRoute[] }) {
  return (
    <MuiBreadCrumbs separator=">" aria-label="breadcrumb">
      {routes.map((route) =>
        route.active ? (
          <Typography key={route.id} color="text.primary">
            {route.id}
          </Typography>
        ) : (
          <MuiLink key={route.id} underline="hover" component={Link} to={route.path}>
            {route.id}
          </MuiLink>
        )
      )}
    </MuiBreadCrumbs>
  );
}

export { BreadCrumbs };
