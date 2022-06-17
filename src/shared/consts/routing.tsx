import Home from 'containers/Home';
import Subjects from 'containers/Subjects';
import Subject from 'containers/Subject';
import { RouteObjectWithLabel } from 'shared/types/routing';

export const features: RouteObjectWithLabel[] = [
  {
    path: '/',
    element: <Home />,
    label: 'Home',
  },
  {
    path: 'subjects',
    label: 'Subjects',
    children: [
      {
        path: '',
        element: <Subjects />,
      },
      {
        path: ':subjectId',
        element: <Subject />,
      },
    ],
  },
  // {
  //   path: 'profile',
  //   element: <Profile />,
  //   label: "Profile"
  // },
  // {
  //   path: 'settings',
  //   element: <Settings />,
  //   label: "Settings"
  // }
];
