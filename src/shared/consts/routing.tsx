import Home from 'containers/Home';
import Subjects from 'containers/Subjects';
import Subject, { SubjectLayout } from 'containers/Subject';
import NoticeBoard from 'containers/NoticeBoard';
import Notice from 'containers/Notice';
import TaskList from 'containers/TaskList';
import Task from 'containers/Task';
import { RouteObjectWithId } from 'shared/types/routing';

export const features: RouteObjectWithId[] = [
  {
    path: '/',
    id: 'home',
    element: <Home />,
  },
  {
    path: 'subjects',
    id: 'subjects',
    children: [
      {
        path: '',
        element: <Subjects />,
      },
      {
        path: ':subjectId',
        element: <SubjectLayout />,
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
          {
            path: 'tasks',
            children: [
              {
                path: '',
                element: <TaskList />,
              },
              {
                path: ':taskId',
                element: <Task />,
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
