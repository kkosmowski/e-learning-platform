import Home from 'containers/Home';
import Subjects from 'containers/Subjects';
import Subject from 'containers/Subject';
import NoticeBoard from 'containers/NoticeBoard';
import Notice from 'containers/Notice';
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
        children: [
          {
            path: '',
            element: <Subject />,
          },
          {
            path: 'notices',
            children: [
              {
                path: '',
                element: <NoticeBoard />,
              },
              {
                path: ':noticeId',
                element: <Notice />,
              },
            ],
          },
        ],
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
