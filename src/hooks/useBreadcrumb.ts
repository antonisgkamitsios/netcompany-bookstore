import { RouteObject, matchPath, useLocation } from 'react-router-dom';

// todo add more types that will help with breadcrumb
type FlattRoute = {
  path: string;
  id?: string;
};

export type BreadCrumbRoute = { active: boolean } & FlattRoute;

// basic function that manages to flatten the array of children and also append the the parent's path to the child
function flattenRoutes(routes: RouteObject[], flattRoutes: FlattRoute[], prefix = '') {
  routes.forEach((route) => {
    // adjust prefixes and populate array
    let pathToAdd = route.path || '';

    // if we are about to add a route and the prefix doesn't end with "/" and the pathTo add does't start with "/" then we add it

    // remove the starting "/" if it exists and if we are not in the root ("/")
    if (pathToAdd !== '/' && pathToAdd.startsWith('/')) {
      pathToAdd = pathToAdd.slice(1);
    }

    if (prefix.length > 0 && !prefix.endsWith('/')) {
      pathToAdd = `/${pathToAdd}`;
    }

    // we don't want to add in the array routes with no path
    if (pathToAdd.length > 0) {
      flattRoutes.push({ id: route.id, path: prefix + pathToAdd });
    }

    // base case: the route doesn't have any children left; we return
    if (route.children == null) {
      return;
    }
    // recursion part
    return flattenRoutes(route.children, flattRoutes, prefix + pathToAdd);
  });
}

function useBreadCrumb(routes: RouteObject[]) {
  const location = useLocation();

  // this will be mutated in the addPrefixes
  const flattRoutes: FlattRoute[] = [];
  flattenRoutes(routes, flattRoutes);

  const breadCrumbRoutes = flattRoutes
    .map((route) => {
      const match = matchPath({ path: route.path || '', end: false }, location.pathname);

      // simply return null if we don't have a match in the urls and at the end the nulls will be filtered out
      if (match === null) {
        return null;
      }
      const active = match?.pathname === location.pathname;

      return { ...route, active: active };
      // here we filter out all the nulls
    })
    .filter((route): route is BreadCrumbRoute => Boolean(route));

  return breadCrumbRoutes;
}

export { useBreadCrumb };
