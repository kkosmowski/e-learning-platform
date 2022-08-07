import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import Root from 'containers/Root';
import ApplicationLayout from 'layouts/Application';
import NotFound from 'containers/NotFound';
import AuthHome from 'containers/Auth';
import SignIn from 'containers/Auth/SignIn';
import AuthGuard from 'shared/guards/AuthGuard';
import { features } from 'shared/consts/routing';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: (
          <AuthGuard>
            <ApplicationLayout />
          </AuthGuard>
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
      {
        path: 'auth',
        element: <AuthHome />,
        children: [
          {
            path: '',
            element: <Navigate to="login" />,
          },
          {
            path: 'login',
            element: <SignIn />,
          },
          {},
        ],
      },
    ],
  },
  // @todo add Auth page
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
