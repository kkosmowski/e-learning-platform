import { Navigate } from 'react-router-dom';

import Home from 'containers/Home';
import Subjects from 'containers/Subjects';
import Settings, {
  CreateClassroom,
  ClassroomsManagement,
  SettingsLayout,
  SubjectCategoriesManagement,
  UsersManagement,
  CreateUser,
  Users,
} from 'containers/Settings';
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
import ClassroomDetails from 'containers/Settings/features/ClassroomDetails';
import UserDetails from 'containers/Settings/features/UserDetails';

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
        children: [
          {
            path: '',
            element: <Settings />,
          },
          {
            path: 'subject-categories',
            element: <SubjectCategoriesManagement />,
          },
          {
            path: 'classrooms',
            children: [
              {
                path: '',
                element: <ClassroomsManagement />,
              },
              {
                path: 'create',
                element: <CreateClassroom />,
              },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    element: <ClassroomDetails mode="view" />,
                  },
                  {
                    path: 'edit',
                    element: <ClassroomDetails mode="edit" />,
                  },
                ],
              },
            ],
          },
          {
            path: 'users',
            element: <UsersManagement />,
            children: [
              {
                path: 'create',
                element: <CreateUser />,
              },
              {
                path: ':type',
                element: <Users />,
              },
            ],
          },
          {
            path: 'user',
            children: [
              {
                path: '',
                element: <Navigate to="/settings/users" />,
              },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    element: <UserDetails mode="view" />,
                  },
                  {
                    path: 'edit',
                    element: <UserDetails mode="edit" />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
