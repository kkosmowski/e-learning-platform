import { RouteObject } from 'react-router';

import ApplicationLayout from 'layouts/Application';
import NotFound from './containers/NotFound';
import { features } from 'shared/consts/routing';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      // <AuthGuard>
      <ApplicationLayout />
      // </AuthGuard>
    ),
    children: [
      ...features,
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // @todo add Auth page
  // {
  //   path: "auth",
  //   element: <AuthHome />,
  //   children: [
  //     {
  //       path: "login",
  //       element: <AuthLogin />
  //     },
  //     {
  //
  //     }
  //   ]
  // }
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '*/*',
    element: <NotFound />,
  },
];

export default routes;
