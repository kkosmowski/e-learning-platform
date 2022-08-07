import Home from 'containers/Home';
import Subjects from 'containers/Subjects';
import Settings from 'containers/Settings';
import Subject, { SubjectLayout } from 'containers/Subject';
import NoticeBoard from 'containers/NoticeBoard';
import Notice from 'containers/Notice';
import TaskList from 'containers/TaskList';
import Task from 'containers/Task';
import SubjectGrades from 'containers/SubjectGrades';
import CreateNewNotice from 'containers/teacher/CreateNewNotice';
import AssignNewGrade from 'containers/teacher/AssignNewGrade';
import CreateNewTask from 'containers/teacher/CreateNewTask';
import TeacherGuard from 'shared/guards/TeacherGuard';
import { RouteObjectWithId } from 'shared/types/routing';
import { TaskType } from 'shared/types/task';
import { Role } from 'shared/types/user';
import SettingsLayout from 'containers/Settings/Settings.layout';
import Users from 'containers/Settings/features/Users';
import CreateUser from 'containers/Settings/features/CreateUser';

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
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="..">
                    <CreateNewNotice />
                  </TeacherGuard>
                ),
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
                element: <TaskList type={TaskType.Task} />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="..">
                    <CreateNewTask type={TaskType.Task} />
                  </TeacherGuard>
                ),
              },
              {
                path: ':taskId',
                element: <Task type={TaskType.Task} />,
              },
            ],
          },
          {
            path: 'homework',
            children: [
              {
                path: '',
                element: <TaskList type={TaskType.Homework} />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="..">
                    <CreateNewTask type={TaskType.Homework} />
                  </TeacherGuard>
                ),
              },
              {
                path: ':taskId',
                element: <Task type={TaskType.Homework} />,
              },
            ],
          },
          {
            path: 'grades',
            children: [
              {
                path: '',
                element: <SubjectGrades />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="..">
                    <AssignNewGrade />
                  </TeacherGuard>
                ),
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
  // },
  {
    path: 'settings',
    element: <SettingsLayout limitedTo={Role.Admin} />,
    id: 'settings',
    limitedTo: Role.Admin,
    children: [
      {
        path: '',
        element: <Settings />,
        children: [
          {
            path: 'users/create',
            element: <CreateUser />,
          },
          {
            path: 'users/:type',
            element: <Users />,
          },
        ],
      },
    ],
  },
];
