import { RouteObject } from 'react-router';

import ApplicationLayout from 'layouts/Application';
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
        // element: <NotFound />
        element: <>Not found</>,
      },
      {
        path: '*',
        // element: <NotFound />
        element: <>Not found</>,
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
    // element: <NotFound />
    element: <>Not found</>,
  },
  {
    path: '*/*',
    // element: <NotFound />
    element: <>Not found</>,
  },
];

export default routes;
